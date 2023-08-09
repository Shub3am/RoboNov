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
  productName: string,
  productPrice: number,
  cartId: number,
  accessToken: string,
  status: string,
  Router: Router,
  setError: Function
) {
  if (status == "authenticated") {
    let result = await fetch("/api/cart/updateCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
      body: JSON.stringify({
        productId: productId,
        productName: productName,
        productPrice: productPrice,
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
  productName,
  productPrice,
}): React.ReactComponentElement<any> {
  const Router = useRouter();
  const { data: Session, status } = useSession();
  const [error, setError] = useState("");
  if (status == "authenticated") {
    const { cartId, accessToken } = Session.user;
    return (
      <>
        {error}
        <button
          onClick={() =>
            updateCart(
              productId,
              productName,
              productPrice,
              cartId,
              accessToken,
              status,
              Router,
              setError
            )
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
