"use client";
export default function LogOut(Router: { refresh: Function }) {
  localStorage.removeItem("User");
  Router.refresh();
}
