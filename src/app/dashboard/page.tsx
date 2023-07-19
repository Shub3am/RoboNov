"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";
export default function Account({ currentState }: { currentState: Function }) {
  const { data: Session, status } = useSession();

  if (status == "authenticated") {
    return (
      <div className={styles.sideBarMenu}>
        <li>Dashboard</li>
        <li>Profile</li>
        <li>Orders</li>
      </div>
    );
  } else {
    redirect("/auth");
  }
}
