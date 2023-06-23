import CryptoJS from "crypto-js";

export class Password {
  constructor() {}

  generateHashKey(): string {
    const hashKey = CryptoJS.SHA256(process.env.SECRET_HASH_KEY ?? "");
    return CryptoJS.enc.Base64.stringify(hashKey);
  }

  encryptPassword(plainText: string, hashKey: string): string {
    const encrypted = CryptoJS.AES.encrypt(plainText, hashKey, {
      keySize: 32,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted + "";
  }

  decryptPassword(cipher: string, hashKey: string): string {
    const plainText = CryptoJS.AES.decrypt(cipher, hashKey, {
      keySize: 32,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return plainText.toString(CryptoJS.enc.Utf8);
  }
}
