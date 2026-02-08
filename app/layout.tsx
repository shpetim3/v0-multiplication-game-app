import React from "react"
import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'

import './globals.css'

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' })

export const metadata: Metadata = {
  title: 'Meso Duke Luajtur - Matematike dhe Gjuhe Shqipe',
  description: 'Loje edukative per femije 6-10 vjec: mbledhje, zbritje, shumezim, pjesetim dhe rrokje te gjuhes shqipe.',
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
