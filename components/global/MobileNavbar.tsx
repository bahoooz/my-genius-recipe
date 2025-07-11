import Link from 'next/link'
import React from 'react'
import { BadgeEuro, CircleUserRound, Pizza } from 'lucide-react';

export default function MobileNavbar({className}: {className?: string}) {
  return (
    <nav className={`${className} fixed z-50 bottom-0 left-0 right-0 bg-[var(--color-navbar-bg)] h-14`}>
        <ul className='flex justify-center gap-12 items-center h-full'>
            <li>
                <Link href="/"><Pizza size={40} strokeWidth={1.5} className='text-[var(--color-red)]' /></Link>
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
