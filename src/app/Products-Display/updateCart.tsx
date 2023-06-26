"use client";
import { useSession } from "next-auth/react";
import { prisma } from "@/app/prisma";
async function updateCart(productId, Session, status) {
  if (status == "authenticated") {
    await prisma.cart.update({ where: { id: Session.user.cartId } });
  }
}

export default function updateCartButton({
  productId,
}): React.ReactComponentElement<any> {
  const { data: Session, status } = useSession();
  console.log(productId);
  if (status == "authenticated") {
    const { cartId } = Session.user;
    console.log(cartId);
  }
  return (
    <>
      <button onClick={updateCart(productId, Session, status)}>
        Add to Cart
      </button>
    </>
  );
}
