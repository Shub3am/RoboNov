"use client";
import styles from "./header.module.css";
import { useState } from "react";

import { AiOutlineShoppingCart } from "react-icons/ai";
export default function cart() {
  const [items, setItems] = useState(0);
  return (
    <div className={styles.cart}>
      <AiOutlineShoppingCart size={25} />
      <div className={styles.cartItem}>
        <p>{items}</p>
      </div>
    </div>
  );
}
