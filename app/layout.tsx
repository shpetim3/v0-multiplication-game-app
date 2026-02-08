import React from "react"
import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'

import './globals.css'

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' })

export const metadata: Metadata = {
  title: 'Matematika Argëtuese - Mëso Tabelën e Shumëzimit',
  description: 'Lojë edukative për fëmijë 6-10 vjeç për të mësuar tabelën e shumëzimit përmes lojës.',
}

export const viewport: Viewport = {
  themeColor: '#4A90E2',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sq">
      <body className={`${nunito.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
