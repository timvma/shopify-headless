import { CircleUserRound, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="">
      <div className="flex justify-between ">
        <Link href="/">Coffee</Link>
        <div className="flex gap-1">
          <nav></nav>

          <Link href="/account">
            <CircleUserRound />
          </Link>
          <Link href="/cart">
            <ShoppingCart />
          </Link>

          <button className="md:hidden">
            <Menu />
          </button>
        </div>
      </div>

      <div></div>
    </header>
  );
}
