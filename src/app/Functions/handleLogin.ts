interface form {
  target: { email: { value: string }; password: { value: string } };
  preventDefault: Function;
}
type response = {
  error: boolean;
  UserData: { name: string; id: string; email: string };
};

export default async function handleLogin(
  formData: form,
  setError: Function
): Promise<any> {
  formData.preventDefault();
  let userEmail: string = formData.target.email.value;
  let userPass: string = formData.target.password.value;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: userEmail, password: userPass }),
  };
  const check = await fetch("/api/account", options);
  let response: response = await check.json();

  if (response.error == false) {
    await localStorage.setItem(
      "User",
      JSON.stringify({
        id: response.UserData.id,
        name: response.UserData.name,
        email: response.UserData.email,
      })
    );
    return true; //After returning true, This will redirect to dashboard
    // Router.push("/dashboard");
  } else {
    await setError(true);
    return false;
    // Router.refresh();
  }
}
