import "../globals.css";
import Link from "next/link";
export default function Navigation() {
  return (
    <nav>
      <Link href="/" className="navigation">
        {" "}
        {/*Styles In globals css */}
        <li>Home</li>
      </Link>
      <li>Shop</li>
      <li>About</li>
      <li>Contact</li>
    </nav>
  );
}
