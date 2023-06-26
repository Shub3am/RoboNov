"use client";
import { useSession } from "next-auth/react";
async function updateCart() {}

export default function updateCartButton(): React.ReactComponentElement<any> {
  const { data: Session, status } = useSession();
  const cartId = Session.user;
  return (
    <>
      <button onclick={updateCart(Session.user)}>Add to Cart</button>
    </>
  );
}
