"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import styles from "./cart.module.css";
// function getCart(cartId: Number) {
//   return getCartData;
// }

async function getLocalTax(latitude, longitude) {
  let tax = await fetch(
    `https://api.precisely.com/localtax/v1/tax/General/bylocation?latitude=${latitude}&longitude=${longitude}&purchaseAmount=100`
  ).then((x) => x.json());
  console.log(tax);
}

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
    let total: { amount: Number; items: Number } = { amount: 0, items: 0 };
    let tax = 0;
    navigator.geolocation.getCurrentPosition(async function (location) {
      await getLocalTax(location.coords.latitude, location.coords.longitude);
    });
    let cartTable = cartData.map(
      (
        item,
        index
      ): {
        item: {
          productid: Number;
          productname: String;
          qty: Number;
          productprice: Number;
        };
        index: Number;
      } => {
        total.amount = total.amount + item.qty * item.productprice;
        total.items = total.items + item.qty;
        return (
          <tr key={index}>
            <th>{item.productid}</th>

            <th>{item.productname}</th>

            <th>{item.qty}</th>
            <th>{item.productprice}</th>
          </tr>
        );
      }
    );
    return (
      <div className={styles.container}>
        <div>
          <table className={styles.productTable}>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            {cartTable}
          </table>
        </div>
        <div className={styles.productBill}>
          <div className={styles.productBillContainer}>
            <table>
              <tbody>
                <tr>
                  <th>Order Details</th>
                </tr>
                <tr>
                  <th>Totat Items:</th>
                  <td>{total.items}</td>
                </tr>
                <tr>
                  <th>Total Amount:</th>
                  <th>Taxes</th>
                  <td>{tax}</td>
                  <td>{total.amount}$</td>
                </tr>
              </tbody>
            </table>
            <div className={styles.orderButton}>
              <button>Place Order</button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    <div>Cart Empty</div>;
  }
}
