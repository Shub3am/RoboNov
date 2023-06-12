"use client";
import styles from "./auth.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { cache, useState } from "react";
export default function auth(): React.ReactNode {
  const Router = useRouter();
  const [error, setError] = useState(false);
  const ValidateUser = async (formData: {
    target: { email: { value: string }; password: { value: string } };
    preventDefault: Function;
  }): Promise<any> => {
    formData.preventDefault();
    let userEmail: string = formData.target.email.value;
    let userPass: string = formData.target.password.value;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, password: userPass }),
    };
    const check = await fetch("/api/account", options);
    let response: {
      error: boolean;
      UserData: { name: string; id: string; email: string };
    } = await check.json();

    if (!response.error) {
      await localStorage.setItem(
        "User",
        JSON.stringify({
          id: response.UserData.id,
          name: response.UserData.name,
          email: response.UserData.email,
        })
      );
      Router.push("/account");
    } else {
      await setError(true);
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
