"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import styles from "./dashboard.module.css";

export default function Profile() {
  const { data: Session, status } = useSession();

  if (status == "authenticated") {
    console.log(status, "status");
    return <div>Logged In Hun Bhai Profile Mai</div>;
  } else {
    redirect("/auth");
  }
}
