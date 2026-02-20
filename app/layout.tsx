import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'

import './globals.css'

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' })

export const metadata: Metadata = {
  title: 'Mëso Duke Luajtur - Matematikë dhe Gjuhë Shqipe',
  description: 'Lojë edukative për fëmijë 6-10 vjeç: mbledhje, zbritje, shumëzim, pjesëtim dhe rrokje të gjuhës shqipe.',
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
