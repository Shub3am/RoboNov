"use client";
import bcrypt from "bcryptjs";
import styles from "../auth.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { stringify } from "querystring";
export default function auth(): React.ReactNode {
  const Router = useRouter();
  const [EmailExists, setEmailExist] = useState(false);
  const [PhoneExists, setPhoneExist] = useState(false);
  async function createAccount(formData: {
    target: {
      Name: { value: string };
      Age: { value: number };
      email: { value: string };
      Phone: { value: Number };
      password: { value: String };
    };
  }) {
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
      Router.push("/account");
    } else {
      if (createAccountAPI.targets.includes("email")) {
        setEmailExist(true);
      } else if (createAccountAPI.targets.includes("phone")) {
        setPhoneExist(true);
      }
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h1>Register</h1>
        <form className={styles.authForm} onSubmit={createAccount}>
          <label htmlFor="Name">Name:</label>
          <input type="text" name="Name" id="Name" required />
          <label htmlFor="Age">Age</label>
          <input type="number" min="12" max="75" name="Age" id="Age" required />
          <label htmlFor="email">Email:</label>
          {EmailExists ? "Email Already Exists" : ""}
          <input type="email" name="email" id="email" required />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            min="8"
          />
          {PhoneExists ? "Phone Number Already Exists" : ""}
          <label htmlFor="Phone">Phone:</label>
          <input
            type="number"
            id="Phone"
            name="Phone"
            min="10"
            max="10"
            required
          />
          <button type="submit">Register</button>
        </form>

        <Link href="/auth">Login</Link>
      </div>
    </>
  );
}
