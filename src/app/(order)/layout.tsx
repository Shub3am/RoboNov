"use client"
import cartContext from "./cartContext"
import { useState, useEffect } from "react";
import { Suspense } from "react";
import { useSession } from "next-auth/react";


const Loading = ()=> {
  return <button type="button" className="bg-indigo-500 ..." disabled>
  <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
  </svg>
  Processing...
</button>

}

export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const { data: Session, status } = useSession();
    const [cart, setCart] = useState([])
    const [isLoaded, setLoad] = useState(false)
    useEffect(() => {
        if (status == "authenticated") {
          setLoad(true)
            if (!cart.length) {
          const getCartData = fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: Session.user.cartId }), //Sending CartId to the server
          })
            .then((data) => data.json())
            .then((data) => setCart(data)); //I HATE PROMISES :)
        } } else if (status == "loading") {setLoad(true)}
        else {
          if (status == "unauthenticated") {
            redirect("/auth");
          }
        }
      }, [status]);

    if (isLoaded) {
      return (<cartContext.Provider value={{cart, setCart, email: Session?.user?.email, name: Session?.user?.name}}>{children}</cartContext.Provider>)
    }
else {
  return <Loading/>
}

}



