"use client";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { CgCloseR } from "react-icons/cg";
import styles from "./header.module.css";
import Navigation from "./navigation";
export default function mobileNav() {
  const [isOpen, setOpen] = useState(false);
  const changeMenuState = (): void => {
    setOpen(!isOpen);
  };
  return (
    <>
      <HiMenuAlt3
        className={`${styles.MenuButton} ${isOpen ? styles.mobile_menu : ""}`}
        onClick={changeMenuState}
        size={30}
      />
      <div
        className={`${styles.mobileNav} ${
          isOpen ? styles.mobile_menu_open : styles.moblie_menu_closed
        }`}
      >
        <div className={styles.CloseButton}>
          <CgCloseR onClick={changeMenuState} size={20} />
        </div>
        <div className={styles.mobilemenu}>
          <Navigation />
        </div>
      </div>
    </>
  );
}
