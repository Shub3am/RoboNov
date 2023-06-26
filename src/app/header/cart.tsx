"use client";
import styles from "./header.module.css";
import { useSession } from "next-auth/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
async function getCart() {
  const cart = await fetch("/api/account/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: Session.user.cartId }),
  }).then((res) => res.json());
  return cart.length;
}
export default function cart() {
  const { data: Session, status } = useSession();
  let cartLength = 0;
  if (status == "authenticated") {
    const cartLength = getCart();
  }
  return (
    <div className={styles.cart}>
      <AiOutlineShoppingCart size={25} />
      <div className={styles.cartItem}>
        <p>{cartLength ? cartLength : "0"}</p>
      </div>
    </div>
  );
}
