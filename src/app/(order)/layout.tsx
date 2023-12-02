"use client"
import cartContext from "./cartContext"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";


export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const { data: Session, status } = useSession();
    const [cart, setCart] = useState([])

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

      console.log(cart)
    return (<cartContext.Provider value={{cart, setCart}}>{children}</cartContext.Provider>)

}



