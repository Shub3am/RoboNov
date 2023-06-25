"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Account() {
  const { data: Session, status } = useSession();
  if (status == "authenticated") {
    // let { name, email } = Session.user;
    console.log(Session.user);
    let name = "she";
    return <h1>Welcome {name}, You Are In!</h1>;
  } else {
    redirect("/auth");
  }
}
