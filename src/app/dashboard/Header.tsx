import Link from "next/link";
import styles from "./dashboard.module.css";
export default function Account() {
  return (
    <div className={styles.sideBarMenu}>
      <li>
        <Link href="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link href="/dashboard/profile">Profile</Link>
      </li>
      <li>
        <Link href="/dashboard/orders">Orders</Link>
      </li>
    </div>
  );
}
