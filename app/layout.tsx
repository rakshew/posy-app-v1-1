import React from "react"
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Fraunces } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans'
});

const _fraunces = Fraunces({ 
  subsets: ["latin"],
  weight: ['300', '400', '700'],
  variable: '--font-serif'
});

export const metadata: Metadata = {
  title: 'Posy: Your Emotional Garden',
  description: 'A beautiful mood tracking app that grows your emotional garden',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_plusJakartaSans.variable} ${_fraunces.variable} font-sans antialiased`}>
        <div className="blob-1"></div>
        <div className="blob-2"></div>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
