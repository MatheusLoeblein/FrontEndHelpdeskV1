import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'tailwindcss/tailwind.css';
import {AuthContext} from '../context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Help Desk',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthContext>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </AuthContext>
  )
}
