import crypto from "crypto";

const passwordSize = 256;
const saltSize = 64;
const iterationCount = 20000;
const hashMethod = "sha256";
const encodingMethod = "hex";

function generateSalt() {
  return crypto.randomBytes(saltSize).toString(encodingMethod);
}

export async function generatePasswordHash(
  password: string,
  getSalt: () => string = generateSalt
): Promise<{ passwordHash: string; salt: string }> {
  return new Promise((resolve, reject) => {
    const salt = getSalt();

    crypto.pbkdf2(password, salt, iterationCount, passwordSize, hashMethod, (error, result) => {
      if (error !== null) {
        reject(error);
      } else {
        resolve({
          passwordHash: result.toString(encodingMethod),
          salt,
        });
      }
    });
  });
}

export async function verifyPassword(otherPassword: string, passwordHash: string, salt: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(otherPassword, salt, iterationCount, passwordSize, hashMethod, (error, result) => {
      if (error !== null) {
        reject(error);
      } else {
        const otherPasswordHash = result.toString(encodingMethod);
        resolve(passwordHash === otherPasswordHash);
      }
    });
  });
}
