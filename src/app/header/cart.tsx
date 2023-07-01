"use client";
import styles from "./header.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
async function clearCart(
  cartId: number,
  accessToken: string,
  Router: { refresh: Function; push: Function }
) {
  const Result = await fetch("/api/cart/clearCart", {
    method: "POST",
    headers: { "Content-Type": "application/json", authorization: accessToken },
    body: JSON.stringify({ id: cartId }),
  }).then((res) => res.json());
  if (Result.success) {
    Router.refresh();
  } else {
    Router.push("/error?error=cartFailed");
  }
}
export default function cart(): React.ReactNode {
  const { data: Session, status } = useSession();
  const [cartLength, setCartLength] = useState(0);
  const Router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false); //checking if user has logged in, if not, displaying empty cart logo
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
            <li
              onClick={() =>
                clearCart(Session.user.cartId, Session.user.accessToken, Router)
              }
            >
              Clear Cart
            </li>
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
