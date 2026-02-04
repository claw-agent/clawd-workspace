import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: {
    default: "Bjorn's Brew | Love Coffee. Love Animals.",
    template: "%s | Bjorn's Brew",
  },
  description:
    "Family-owned Salt Lake City coffee shop serving quality coffee while supporting animal charities. Visit our 3 locations today!",
  keywords: ['coffee shop', 'Salt Lake City', 'SLC coffee', 'animal charity', 'dog-friendly coffee'],
  authors: [{ name: "Bjorn's Brew" }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bjornsbrew.com',
    siteName: "Bjorn's Brew",
    title: "Bjorn's Brew | Love Coffee. Love Animals.",
    description: "Family-owned Salt Lake City coffee shop serving quality coffee while supporting animal charities.",
    images: [
      {
        url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: "Bjorn's Brew Coffee Shop",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bjorn's Brew | Love Coffee. Love Animals.",
    description: "Family-owned Salt Lake City coffee shop serving quality coffee while supporting animal charities.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
