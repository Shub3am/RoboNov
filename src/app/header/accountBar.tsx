"use client";
import styles from "./header.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { signIn, signOut, useSession } from "next-auth/react";
export default function accountBar() {
  const { data: Session, status } = useSession();
  const [loggedin, setLoggedin] = useState(false);
  useEffect(() => {
    if (status == "authenticated") {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
  }, [status]);
  if (loggedin) {
    const { name, email } = Session.user;
    return (
      <div className={styles.accountBar}>
        <VscAccount size={25} />
        <div className={styles.accountMenu}>
          <ul>
            <li>
              <Link href="/dashboard">My Account</Link>
            </li>
            <li>
              <button onClick={() => signOut()}>Sign Out</button>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.accountBarButtonContainer}>
        <Link href="/auth">
          <button className={styles.accountBarButton}>Sign In</button>
        </Link>
      </div>
    );
  }
}
