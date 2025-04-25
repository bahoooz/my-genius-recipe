import Link from 'next/link'
import React from 'react'
import { BadgeEuro, HomeIcon, CircleUserRound } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className='fixed z-50 bottom-0 left-0 right-0 bg-[var(--color-navbar-bg)] h-14'>
        <ul className='flex justify-center gap-12 items-center h-full'>
            <li>
                <Link href="/"><HomeIcon size={40} strokeWidth={1.5} className='text-[var(--color-red)]' /></Link>
            </li>
            <li>
                <Link href="/pricing"><BadgeEuro size={40} strokeWidth={1.5} className='text-[var(--color-red)]' /></Link>
            </li>
            <li>
                <Link href="/profile"><CircleUserRound size={40} strokeWidth={1.5} className='text-[var(--color-red)]' /></Link>
            </li>
        </ul>
    </nav>
  )
}
