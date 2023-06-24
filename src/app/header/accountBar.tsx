"use client";
import styles from "./header.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VscAccount } from "react-icons/vsc";
import { signIn, signOut, useSession } from "next-auth/react";
export default function accountBar() {
  const { data: Session, status } = useSession();
  if (status == "authenticated") {
    const { name, email } = Session.user;
    return (
      <div>
        <h2>
          {name}
          <VscAccount />
        </h2>
        <div>
          <Link href="/dashboard">My Account</Link>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.accountBarButtonContainer}>
        <button onClick={() => signIn()} className={styles.accountBarButton}>
          Sign In
        </button>
      </div>
    );
  }
}
