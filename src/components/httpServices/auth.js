const keyName = "Notify";
import CryptoJS from 'crypto-js';

// Encryption key - store this securely
const encryptionKey = 'q8QQ0HdtRYF5SaL7H1OmWE0XJqLjCYCqPy0Ef8ATpJgkspAjMoXGJxsTwuFujqD9R9ARex5MrTPFR0dSmxdCdmvisVggEBAMsFZqbfg2VgihpJcXWJkiq6V1ACirq6';

function login(obj) {
const jsonString = JSON.stringify(obj);

// Encrypt user data
const encryptedData = CryptoJS.AES.encrypt(jsonString, encryptionKey).toString();

// Store the encrypted data in local storage
localStorage.setItem(keyName, encryptedData);
}



function logout() {
    localStorage.removeItem(keyName);
}



function getUser() {
    // Get the encrypted data from local storage
const encryptedData = localStorage.getItem(keyName);

if (encryptedData) {
  // Decrypt the data using the same encryption key
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);

  if (decryptedBytes) {
    // Convert the decrypted data back to its original format (e.g., JSON)
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

    let obj = decryptedData ? decryptedData : null;
    return obj;
  }
}
  
}

export default {
    login,
    logout,
    getUser,
};
