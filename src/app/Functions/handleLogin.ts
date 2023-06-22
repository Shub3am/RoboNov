"use client";

type response = {
  error: boolean;
  UserData: { name: string; id: string; email: string };
};

export default async function handleLogin(
  Credential: { email: string; password: string },
  setError: Function
): Promise<any> {
  console.log(Credential);
  let userEmail: string = Credential.email;
  let userPass: string = Credential.password;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: userEmail, password: userPass }),
  };
  const check = await fetch("/api/account", options);
  let response: response = await check.json();

  if (response.error == false) {
    return {
      id: response.UserData.id,
      name: response.UserData.name,
      email: response.UserData.email,
    };
  } else {
    // await setError(true);
    return null;
  }
}
