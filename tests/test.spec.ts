import Commonutils from "../utilities/CommonUtils";

const common = new Commonutils();

const encrypted = common.encryptData("Admin");
console.log("Encrypted:", encrypted);

const decrypted = common.decryptData(encrypted);
console.log("Decrypted:", decrypted);
