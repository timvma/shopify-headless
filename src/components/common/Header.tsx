"use client";
import { useCartStore } from "@/store/cartStore";
import clsx from "clsx";
import { CircleUserRound, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gray-900 py-3 ">
      <div className="flex justify-between w-[95vw] max-w-[1080px] mx-auto  ">
        <div className="flex gap-20">
          <Link href="/">Coffee</Link>

          {/* <nav
            className={clsx(
              "grid gap-2 bg-gray-900 absolute w-full left-0 top-0 translate-y-[-100%] md:flex md:relative ",
              open && "translate-y-[35%]"
            )}
          >
            <Link href="" className="p-2 md:p-0">
              Collection
            </Link>
            <Link href="" className="p-2 md:p-0">
              About
            </Link>
            <Link href="/contact" className="p-2 md:p-0">
              Contact
            </Link>
          </nav> */}
        </div>
        <div className="flex gap-1">
          <Link href="/account">
            <CircleUserRound />
          </Link>
          <Link href="/cart">
            <ShoppingCart />
          </Link>

          <button
            className="md:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            <Menu />
          </button>
        </div>
      </div>
    </header>
  );
}
