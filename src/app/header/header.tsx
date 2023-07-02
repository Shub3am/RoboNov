import Image from "next/image";
import styles from "./header.module.css";
import AccountBar from "./accountBar";
import MobileNav from "./mobileNavigation";
import SearchBar from "./SearchBar";
import Cart from "./cart";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Navigation from "./navigation";
export default function Header() {
  return (
    <div className={styles.header_container}>
      <div className={styles.header_logo}>
        <Link href={process.env.URL}>
          <Image src="/logo.svg" alt="logo" width={75} height={100} />
        </Link>
      </div>
      <div className={styles.header_menu}>
        <Navigation />
      </div>
      <div className={styles.header_searchbar}>
        <SearchBar />
        <Cart />
        <AccountBar />
      </div>
      <div className={styles.header_mobilenavigation}>
        <MobileNav />
        <Cart />
      </div>
    </div>
  );
}
