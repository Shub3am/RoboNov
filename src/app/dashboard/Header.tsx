import Link from "next/link";
import styles from "./dashboard.module.css";
export default function Account() {
  return (
    <div className={styles.sideBarMenu}>
      <Link href="/dashboard">
        <li>Dashboard</li>
      </Link>
      <Link href="/dashboard/profile">
        <li>Profile</li>
      </Link>
      <Link href="/dashboard/orders">
        <li>Orders</li>
      </Link>
    </div>
  );
}
