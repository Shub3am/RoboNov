"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  const { data: Session, status } = useSession();

  if (status == "authenticated") {
    console.log(Session, "status");
    return (
      <div>
        <div>
          <div>
            <h3>Recent Orders</h3>
          </div>
        </div>
      </div>
    );
  } else {
    redirect("/auth");
  }
}
