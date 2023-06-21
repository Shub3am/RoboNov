"use client";
import styles from "./auth.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import handleLogin from "@/app/Functions/handleLogin";
import { useState } from "react";

interface form {
  target: { email: { value: string }; password: { value: string } };
  preventDefault: Function;
}
export default function Login(): React.ReactNode {
  const Router = useRouter();
  const [error, setError] = useState(false);
  const ValidateUser = async (formData: form) => {
    const Result = await handleLogin(formData, setError);
    if (Result) {
      Router.push("/dashboard");
    } else {
      Router.refresh();
    }
  };
  return (
    <div className={styles.container}>
      {error ? "Wrong Password or Email" : ""}
      <h1>Login</h1>
      <form className={styles.authForm} onSubmit={ValidateUser} method="POST">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter Your Password"
        />
        <button type="submit">Login</button>
      </form>
      <Link href="/auth/register">Register</Link>
    </div>
  );
}
