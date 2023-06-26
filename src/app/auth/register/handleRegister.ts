"use client";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

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
    (raw) => {
      return raw.json();
    }
  );

  if (createAccountAPI.created) {
    await signIn("credentials", {
      email: Input_Email,
      password: formData.target.password.value,
      redirect: false,
      callbackUrl: "/dashboard",
    });
    redirect("/dashboard");
  } else {
    if (createAccountAPI.targets.includes("email")) {
      setEmailExist(true);
    } else if (createAccountAPI.targets.includes("phone")) {
      setPhoneExist(true);
    }
  }
}
