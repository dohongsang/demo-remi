import CryptoJS from "crypto-js";

export class Password {
  private key: string;

  constructor() {
    this.key = process.env.SECRET_HASH_KEY ?? "ZGVtby1yZW1pLXNvdXJjZS1jb2Rl";
  }

  encryptPasswordFromClient(password: string): string {
    return this.encryptPassword(password, this.key);
  }

  decryptPasswordFromClient(password: string): string {
    return this.decryptPassword(password, this.key);
  }

  generateHashKey(): string {
    const hashKey = CryptoJS.SHA256(this.key);
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
