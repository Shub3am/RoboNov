"use client";
import styles from "./header.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VscAccount } from "react-icons/vsc";
export default function accountBar() {
  const Router = useRouter();
  if (localStorage.getItem("User") !== null) {
    function signOut() {
      localStorage.removeItem("User");
      Router.refresh();
    }
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
          <button onClick={signOut}>Sign Out</button>
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
