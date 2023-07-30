"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
// function getCart(cartId: Number) {
//   return getCartData;
// }

export default function CART() {
  const { data: Session, status } = useSession();
  const [cartData, setCart] = useState([]);
  useLayoutEffect(() => {
    if (status == "authenticated") {
      const getCartData = fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Session.user.cartId }), //Sending CartId to the server
      })
        .then((data) => data.json())
        .then((data) => setCart(data)); //I HATE PROMISES :)
    } else {
      if (status == "unauthenticated") {
        redirect("/auth");
      }
    }
  }, [status]);
  if (cartData.length) {
    let cartInfo = cartData.map((item, index) => {
      return <h1 key={index}>{item}</h1>;
    });
    let s = cartInfo[0];
    console.log(s, "yeh");
    return (
      <div>
        <div>{s}</div>
        <div></div>
      </div>
    );
  } else {
    <div>Cart Empty</div>;
  }
}
