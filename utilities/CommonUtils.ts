import CryptoJS from "crypto-js";

export default class Commonutils {
  private secretKey: string;

  /**
   * Initilizing secretKey
   */
  constructor() {
    this.secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "";
    if (!this.secretKey) {
      throw new Error("SECRET_KEY is missing in .env file");
    }
  }
  /**
   * This methods encrypt sensitive data from string
   * @param data
   * @returns
   */
  public encryptData(data: string): string {
    const encrypted_data = CryptoJS.AES.encrypt(
      data,
      this.secretKey,
    ).toString();
    // console.log("secretKey", this.secretKey);
    return encrypted_data;
  }
  /**
   * This methods provides decrypted data in string format
   * @param enc_data
   * @returns
   */
  public decryptData(enc_data: string) {
    //console.log("this is from common utils", enc_data, this.secretKey);
    const decryptData = CryptoJS.AES.decrypt(enc_data, this.secretKey).toString(
      CryptoJS.enc.Utf8,
    );

    return decryptData;
  }
}
