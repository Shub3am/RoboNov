"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
async function updateCart(productId, cartId, status, Router) {
  if (status == "authenticated") {
    let result = await fetch("/api/cart/updatecart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: productId,
        cartId: cartId,
      }),
    }).then((res) => res.json());

    if (result.success) {
      Router.refresh();
    } else {
      Router.push("/error");
    }
  }
}

export default function updateCartButton({
  productId,
}): React.ReactComponentElement<any> {
  const Router = useRouter();

  const { data: Session, status } = useSession();
  if (status == "authenticated") {
    const { cartId } = Session.user;
    return (
      <>
        <button
          onClick={() =>
            updateCart(productId, Session.user.cartId, status, Router)
          }
        >
          Add to Cart
        </button>
      </>
    );
  } else {
    return (
      <Link href="/auth">
        <button>Add to Cart</button>
      </Link>
    );
  }
}
