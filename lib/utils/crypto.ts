import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = "!VeRy@StRoNg#EnCrYpTiOn$keY!";

// Helper function to encrypt data
export const encryptData = (data: object) => {
  const bytes = CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY);
  return bytes.toString();
};

// Helper function to decrypt data
export const decryptData = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, ENCRYPTION_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
