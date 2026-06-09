// import CryptoJS from "crypto-js";

// export default class Commonutils {
//   private secretKey: string;

//   /**
//    * Initilizing secretKey
//    */
//   constructor() {
//     this.secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "";
//     if (!this.secretKey) {
//       throw new Error("SECRET_KEY is missing in .env file");
//     }
//   }
//   /**
//    * This methods encrypt sensitive data from string
//    * @param data
//    * @returns
//    */
//   public encryptData(data: string): string {
//     const encrypted_data = CryptoJS.AES.encrypt(
//       data,
//       this.secretKey,
//     ).toString();
//     // console.log("secretKey", this.secretKey);
//     return encrypted_data;
//   }
//   /**
//    * This methods provides decrypted data in string format
//    * @param enc_data
//    * @returns
//    */
//   public decryptData(enc_data: string) {
//     //console.log("this is from common utils", enc_data, this.secretKey);
//     const decryptData = CryptoJS.AES.decrypt(enc_data, this.secretKey).toString(
//       CryptoJS.enc.Utf8,
//     );

//     return decryptData;
//   }
// }

import CryptoJS from "crypto-js";

export default class Commonutils {
  private secretKey: string;

  /**
   * Initializing secretKey
   */
  constructor() {
    this.secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "";

    console.log("\n" + "=".repeat(100));
    console.log("🔐 COMMON UTILS INITIALIZATION");
    console.log(`🔑 SECRET_KEY exists: ${!!process.env.SECRET_KEY}`);

    // DEMO ONLY
    console.log(`🔑 SECRET_KEY value: ${this.secretKey}`);

    if (!this.secretKey) {
      throw new Error("❌ SECRET_KEY is missing in .env file");
    }

    console.log("✅ CommonUtils initialized successfully");
    console.log("=".repeat(100));
  }

  /**
   * Encrypt sensitive data
   * @param data
   * @returns encrypted string
   */
  public encryptData(data: string): string {
    console.log("\n" + "=".repeat(100));
    console.log("🔒 STARTING ENCRYPTION");

    // DEMO ONLY
    console.log(`📝 Input Data: ${data}`);
    console.log(`🔑 Using Secret Key: ${this.secretKey}`);

    const encrypted_data = CryptoJS.AES.encrypt(
      data,
      this.secretKey,
    ).toString();

    console.log(`🔐 Encrypted Data: ${encrypted_data}`);
    console.log("✅ Encryption completed");
    console.log("=".repeat(100));

    return encrypted_data;
  }

  /**
   * Decrypt encrypted data
   * @param enc_data
   * @returns decrypted string
   */
  public decryptData(enc_data: string): string {
    console.log("\n" + "=".repeat(100));
    console.log("🔓 STARTING DECRYPTION");

    // DEMO ONLY
    console.log(`🔐 Encrypted Input: ${enc_data}`);
    console.log(`🔑 Using Secret Key: ${this.secretKey}`);

    if (!enc_data) {
      console.error("❌ Encrypted data is empty");

      return "";
    }

    try {
      const bytes = CryptoJS.AES.decrypt(enc_data, this.secretKey);

      console.log(`📦 Decrypted Bytes: ${bytes.toString()}`);

      const decryptData = bytes.toString(CryptoJS.enc.Utf8);

      console.log(`📝 Final Decrypted Value: ${decryptData}`);

      if (!decryptData) {
        console.error("❌ Decryption returned empty string.");
        console.error("Possible reasons:");
        console.error("1. Wrong SECRET_KEY");
        console.error("2. Invalid encrypted text");
        console.error("3. Data encrypted using a different key");
      } else {
        console.log("✅ Decryption successful");
      }

      console.log("=".repeat(100));

      return decryptData;
    } catch (error) {
      console.error("❌ Decryption failed");
      console.error(error);

      throw error;
    }
  }
}
