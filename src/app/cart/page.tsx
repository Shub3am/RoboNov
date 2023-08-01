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
  useEffect(() => {
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
  if (status == "authenticated" && cartData.length) {
    let cartInfo = cartData.map((item, index) => {
      return (
        <h1 key={index}>
          {item.productid}, {item.productname}, {item.qty}
        </h1>
      );
    });
    console.log(cartData[0]);
    return (
      <div>
        <div>{cartInfo}</div>
        <div></div>
      </div>
    );
  } else {
    <div>Cart Empty</div>;
  }
}
