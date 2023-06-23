"use client";
import styles from "./header.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VscAccount } from "react-icons/vsc";
import { signIn, signOut, useSession } from "next-auth/react";
import handleLogOut from "@/app/Functions/handleLogOut";
export default function accountBar() {
  const { data, status } = useSession();
  console.log(status, data);
  const Router = useRouter();
  if (status == "authenticated") {
    const { name, email } = data.user;
    return (
      <div>
        <h2>
          {name}
          <VscAccount />
        </h2>
        <div>
          <Link href="/account">My Account</Link>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.accountBarButtonContainer}>
        <Link href="/auth" className={styles.accountBarButton}>
          Sign In
        </Link>
      </div>
    );
  }
}
