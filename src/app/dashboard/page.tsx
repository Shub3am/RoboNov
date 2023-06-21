"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Account() {
  const Router = useRouter();

  useEffect(() => {
    Router.refresh();
  }, []); //refreshing so localStorage on header gets updated

  if (localStorage.getItem("User") !== null) {
    return <h1>Welcome {localStorage.getItem("User")}, You Are In!</h1>;
  } else {
    redirect("/auth");
  }
}
