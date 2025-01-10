import { Comfortaa } from 'next/font/google'
import './globals.css'
import ClientLayout from './ClientLayout'

const comfortaa = Comfortaa({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Bloom Valley Nursery',
  description: 'Your one-stop shop for all your gardening needs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Bloom Valley Nursery</title>
        <meta name="description" content="Your trusted source for beautiful, healthy plants" />
      </head>
      <body className={comfortaa.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
