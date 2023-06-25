import jwt from "jsonwebtoken";
export async function encryptJWT(data: object) {
  let secret: string = process.env.SECRET;
  let token = await jwt.sign(data, secret, { expiresIn: "24h" });
  return token;
}
export async function decryptJWT(token: string) {
  let secret: string = process.env.SECRET;
  try {
    let decrypted = jwt.verify(token, secret);
    return decrypted;
  } catch (error) {
    return null;
  }
}
