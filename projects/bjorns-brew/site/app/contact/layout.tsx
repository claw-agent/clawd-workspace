import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Get in touch with Bjorn's Brew. We'd love to hear from you! Questions, feedback, catering inquiries, and more.",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
