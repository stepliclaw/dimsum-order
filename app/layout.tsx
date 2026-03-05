import type { Metadata } from 'next'
import { Noto_Sans, Noto_Sans_TC } from 'next/font/google'
import './globals.css'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
})

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  variable: '--font-noto-sans-tc',
})

export const metadata: Metadata = {
  title: 'Dim Sum Order - Mobile Ordering System',
  description: 'Easy mobile ordering for dim sum restaurant',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${notoSans.variable} ${notoSansTC.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
