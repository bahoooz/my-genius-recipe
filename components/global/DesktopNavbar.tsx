import Link from "next/link";
import React from "react";
import { BadgeEuro, CircleUserRound, Pizza } from "lucide-react";

export default function DesktopNavbar({ className }: { className?: string }) {
  return (
    <nav
      className={`${className} fixed z-50 left-0 top-0 h-full w-20 bg-[var(--color-navbar-bg)]`}
    >
      <ul className="flex flex-col justify-center gap-12 items-center h-full">
        <li>
          <Link href="/">
            <Pizza
              size={40}
              strokeWidth={1.5}
              className="text-[var(--color-red)]"
            />
          </Link>
        </li>
        <li>
          <Link href="/pricing">
            <BadgeEuro
              size={40}
              strokeWidth={1.5}
              className="text-[var(--color-red)]"
            />
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <CircleUserRound
              size={40}
              strokeWidth={1.5}
              className="text-[var(--color-red)]"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
