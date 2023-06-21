"use client";
import styles from "./header.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VscAccount } from "react-icons/vsc";
import handleLogOut from "@/app/Functions/handleLogOut";
export default function accountBar() {
  const Router = useRouter();
  if (localStorage.getItem("User") !== null) {
    let User: { email: string; name: string; id: number } = JSON.parse(
      localStorage.getItem("User")
    );
    return (
      <div>
        <h2>
          {User.id}
          <VscAccount />
        </h2>
        <hr></hr>
        <div>
          <Link href="/account">My Account</Link>
          <button onClick={() => handleLogOut(Router)}>Sign Out</button>
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
