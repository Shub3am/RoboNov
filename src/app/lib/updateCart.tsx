"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
interface Router {
  refresh: Function;
  push: Function;
  replace: Function;
}
async function updateCart(
  productId: number,
  productName: string,
  productPrice: number,
  cartId: number,
  accessToken: string,
  status: string,
  Router: Router,
  setError: Function,
  redirectUrl: boolean,
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
      (redirectUrl) ? Router.push("/cart"):window.location.reload() //Ternary Operator for Optional Redirect for "Buy Now Button"
    } else {
      setError(result.message);
    }
  }
}

export default function updateCartButton({
  buttonName,
  productId,
  productName,
  productPrice,
  redirectToCart,
  styles,
}: {buttonName: string,productId:number,
  productName: string,
  productPrice : number,
  redirectToCart: boolean, styles: string}): React.ReactComponentElement<any> {
  const Router = useRouter();
  const { data: Session, status } = useSession();
  const [error, setError] = useState("");
  let btnClass= `rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105 ${styles}`
  if (status == "authenticated") {
    const { cartId, accessToken } = Session.user;
    return (
      <>
        {error}
        <button className={btnClass}
          onClick={() =>
            updateCart(
              productId,
              productName,
              productPrice,
              cartId,
              accessToken,
              status,
              Router,
              setError,
              redirectToCart
            )
          }
        >
          {buttonName}
        </button>
      </>
    );
  } else {
    return (
      <Link href="/auth">
        <button className={btnClass}>{buttonName}</button>
      </Link>
    );
  }
}
