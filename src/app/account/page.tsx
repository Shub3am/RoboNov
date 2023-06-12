"use client";
import { redirect } from "next/navigation";

export default function Account() {
  if (localStorage.getItem("User") !== null) {
    return <h1>Welcome {localStorage.getItem("User")}, You Are In!</h1>;
  } else {
    redirect("/auth");
  }
}
