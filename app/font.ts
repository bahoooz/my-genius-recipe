import { Fredoka, Quicksand } from 'next/font/google'

export const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // choisis les poids que tu veux
  variable: '--font-fredoka',
  display: 'swap',
})

export const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-quicksand',
  display: 'swap',
})