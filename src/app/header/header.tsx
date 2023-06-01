import Image from "next/image";
import styles from "./header.module.css";
import MobileNav from "./mobileNavigation";
import SearchBar from "./SearchBar";
import Navigation from "./navigation";
export default function Header() {
  return (
    <div className={styles.header_container}>
      <div className={styles.header_logo}>
        <Image src="/logo.svg" alt="logo" width={75} height={100} />
      </div>
      <div className={styles.header_menu}>
        <Navigation />
      </div>
      <div className={styles.header_searchbar}>
        <SearchBar />
      </div>
      <div className={styles.header_mobilenavigation}>
        <MobileNav />
      </div>
    </div>
  );
}
