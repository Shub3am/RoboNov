"use client";
import styles from "../auth.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import createAccountAPI from "./handleRegister";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

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

export default function Register(): React.ReactNode {
  const { data, status } = useSession();
  const Router = useRouter();
  const [EmailExists, setEmailExist] = useState(false);
  const [PhoneExists, setPhoneExist] = useState(false);
  async function createAccount(formData: form) {
    await createAccountAPI(formData, setEmailExist, setPhoneExist, Router); //Calling handleRegister Function which wil validate and perform Router actions
  }
  if (status == "authenticated") {
    redirect("/dashboard");
  } else {
    return (
      <>
        <div className={styles.container}>
          <h1>Register</h1>
          <form className={styles.authForm} onSubmit={createAccount}>
            <label htmlFor="Name">Name:</label>
            <input type="text" name="Name" id="Name" required />
            <label htmlFor="Age">Age</label>
            <input
              type="number"
              min="12"
              max="75"
              name="Age"
              id="Age"
              required
            />
            <label htmlFor="email">Email:</label>
            {EmailExists ? "Email Already Exists" : ""}
            <input type="email" name="email" id="email" required />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength="8"
            />
            {PhoneExists ? "Phone Number Already Exists" : ""}
            <label htmlFor="Phone">Phone:</label>
            <input
              type="number"
              id="Phone"
              name="Phone"
              minLength="10"
              maxLength="10"
              required
            />
            <button type="submit">Register</button>
          </form>

          <Link href="/auth">Login</Link>
        </div>
      </>
    );
  }
}
