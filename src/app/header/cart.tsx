"use client";
import styles from "./header.module.css";
import { useEffect, useState, useSyncExternalStore } from "react";

import { AiOutlineShoppingCart } from "react-icons/ai";

export default function cart() {
  // const [cartTotal, setCartTotal] = useState(localStorage.getItem("cart"));
  // useEffect(() => {
  //   if (Boolean(localStorage.getItem("cart"))) {
  //     setCartTotal(localStorage.getItem("cart"));
  //   } else {
  //     localStorage.setItem("cart", 0);
  //   }
  // }, [cartTotal]);

  return (
    <div className={styles.cart}>
      <AiOutlineShoppingCart size={25} />
      <div className={styles.cartItem}>
        <p>0</p>
      </div>
    </div>
  );
}
