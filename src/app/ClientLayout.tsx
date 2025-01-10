'use client'

import { CartProvider } from '@/contexts/CartContext'
import { ProductProvider } from '@/contexts/ProductContext'
import Navbar from '@/components/Navbar/Navbar'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProductProvider>
      <CartProvider>
        <Navbar />
        {children}
      </CartProvider>
    </ProductProvider>
  )
} 