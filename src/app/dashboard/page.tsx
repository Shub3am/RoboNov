"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Account() {
  const { data: Session, status } = useSession();

  if (status == "authenticated") {
    return (
      <div>
        <nav>
          <li>Dashboard</li>
          <li>Profile</li>
          <li>Orders</li>
        </nav>
      </div>
    );
  } else {
    redirect("/auth");
  }
}
