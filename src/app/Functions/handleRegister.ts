"use client";
import bcrypt from "bcryptjs";

interface form {
  target: {
    Name: { value: string };
    Age: { value: number };
    email: { value: string };
    Phone: { value: Number };
    password: { value: String };
  };
  preventDefault: Function;
}

export default async function createAccountAPI(
  formData: form,
  setEmailExist: Function,
  setPhoneExist: Function,
  Router: { push: Function }
) {
  formData.preventDefault();
  let Input_Name = formData.target.Name.value;
  let Input_Age = Number(formData.target.Age.value);
  let Input_Email = formData.target.email.value.toLowerCase();
  let Input_Phone = Number(formData.target.Phone.value);
  const password = await bcrypt.hashSync(formData.target.password.value, 12);
  setEmailExist(false);
  setPhoneExist(false);

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: Input_Name,
      age: Input_Age,
      email: Input_Email,
      phone: Input_Phone,
      password: password,
    }),
  };

  const createAccountAPI = await fetch("/api/account/new", options).then(
    (raw) => raw.json()
  );

  if (createAccountAPI.created) {
    await localStorage.setItem(
      "User",
      JSON.stringify({
        id: createAccountAPI.id,
        name: Input_Name,
        email: Input_Email,
      })
    );
    Router.push("/dashboard");
  } else {
    if (createAccountAPI.targets.includes("email")) {
      setEmailExist(true);
    } else if (createAccountAPI.targets.includes("phone")) {
      setPhoneExist(true);
    }
  }
}
