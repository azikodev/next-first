import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="navbar bg-base-100 container max-w-[1400px] m-auto mb-[60px]">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          daisyUI
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/price">Price</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
