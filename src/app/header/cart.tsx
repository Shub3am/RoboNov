"use client";
import styles from "./header.module.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
async function getCart(cartId: number, setCartLength: Function) {
  const cartAPI = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: cartId }),
  });
  const cart = await cartAPI.json();
  setCartLength(cart.length);
}

export default function cart(): React.ReactNode {
  const { data: Session, status } = useSession();
  const [cartLength, setCartLength] = useState(0);
  useEffect(() => {
    if (status == "authenticated") {
      getCart(Session.user.cartId, setCartLength);
    } else {
      setCartLength(0);
    }
  }, [status]);
  return (
    <div className={styles.cart}>
      <AiOutlineShoppingCart size={25} />
      <div className={styles.cartItem}>
        <p>{cartLength}</p>
      </div>
    </div>
  );
}
