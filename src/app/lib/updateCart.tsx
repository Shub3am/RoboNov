"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
interface Router {
  refresh: Function;
  push: Function;
}
async function updateCart(
  productId: number,
  cartId: number,
  status: string,
  Router: Router,
  setError: Function
) {
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
      setError(result.message);
    }
  }
}

export default function updateCartButton({
  productId,
}): React.ReactComponentElement<any> {
  const Router = useRouter();
  const { data: Session, status } = useSession();
  const [error, setError] = useState("");
  if (status == "authenticated") {
    const { cartId } = Session.user;
    return (
      <>
        {error}
        <button
          onClick={() =>
            updateCart(productId, Session.user.cartId, status, Router, setError)
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
