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
    cache: "no-store",
  });
  const cart = await cartAPI.json();
  setCartLength(cart.length);
}
async function clearCart(cartId: number) {
  console.log(cartId);
}
export default function cart(): React.ReactNode {
  const { data: Session, status } = useSession();
  const [cartLength, setCartLength] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (status == "authenticated") {
      getCart(Session.user.cartId, setCartLength);
      setLoggedIn(true);
    } else {
      setCartLength(0);
      setLoggedIn(false);
    }
  }, [status]);
  const [cartMenuStatus, togglecartMenu] = useState(false);
  if (loggedIn) {
    return (
      <div
        className={styles.cart}
        onMouseOver={() => togglecartMenu(true)}
        onMouseOut={() => togglecartMenu(false)}
      >
        <AiOutlineShoppingCart size={25} />
        <div className={styles.cartItem}>
          <p>{cartLength}</p>
        </div>
        <div
          className={`${styles.cartMenu} ${
            cartMenuStatus ? styles.cartMenuOpen : ""
          }`}
        >
          <ul>
            <li onClick={() => clearCart(Session.user.cartId)}>Clear Cart</li>
            <li>View Cart</li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.cart}>
        <AiOutlineShoppingCart size={25} />
        <div className={styles.cartItem}>
          <p>{cartLength}</p>
        </div>
      </div>
    );
  }
}
