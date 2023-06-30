import { decryptJWT } from "./jwt";
export default async function VerifyRoute(accessToken) {
  const Verify = await decryptJWT(accessToken);
  if (Verify) {
    return true;
  } else {
    return false;
  }
}
