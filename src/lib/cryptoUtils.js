import crypto from 'crypto';


const iv = process.env.ENCRYPTION_IV; // Asegúrate de usar un IV seguro

export function encryptJSON(data,key) {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return {
      iv: iv.toString('hex'),
      encryptedData: encrypted,
    };
  }
  
  export function decryptJSON(encryptedData,iv,key) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
  }



  const bcrypt = require('bcrypt');

  export async function hashPassword(password) {
      try {
          const hashedPassword = await bcrypt.hash(password, 10);
          console.log(hashedPassword);
          return hashedPassword;
      } catch (err) {
          throw err;
      }
  }
  
  export async function comparePassword(plainPassword, hashedPassword) {
      try {
          const result = await bcrypt.compare(plainPassword, hashedPassword);
          console.log(result);
          return result;
      } catch (err) {
          throw err;
      }
  }
  
