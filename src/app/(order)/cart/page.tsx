"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import cartContext from "../cartContext"
import Link from "next/link";
import styles from "./cart.module.css";
// function getCart(cartId: Number) {
//   return getCartData;
// }

export default function CART() {
  const { cart, setCart } = useContext(cartContext)
  const router = useRouter()

  if (cart.length) {
    let total: { amount: number; items: number; tax: number } = {
      amount: 0,
      items: 0,
      tax: 0,
    };

    let cartTable = cart.map(
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
        total.amount = total.amount + item.qty * item.productprice; //Incrementing Value of Amount
        total.items = total.items + item.qty; //Incrementing Total Items Here
        total.tax = total.tax + item.productprice * 0.08; //Adding 8% tax of each item

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
        <div className={styles.productTableContainer}>
          <table className={styles.productTable}>
          <tbody>
    
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            
            {cartTable}</tbody>
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
                <td>{total.amount}$</td>
              </tr>
              <tr>
                <th>Taxes:</th>
                <td>{Math.floor(total.tax)}$</td>
              </tr>
              <tr>
                <th>SubTotal:</th>
                <td>{total.amount + total.tax}$</td>
              </tr></tbody>
            </table>
            <div className={styles.orderButton}>

                <button onClick={()=> router.push("/checkout")}>Place Order</button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    <div>Cart Empty</div>;
  }
}
