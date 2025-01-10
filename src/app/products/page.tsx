'use client'

import ProductHeader from '../../components/Products/ProductHeader'
import ProductBanner from '@/components/Products/ProductBanner'
import ProductGrid from '@/components/Products/ProductGrid'
import BestSeller from '@/components/Products/BestSeller'
import AllProducts from '@/components/Products/AllProducts'
import Footer from '@/components/Footer'
import './products.css'

export default function ProductsPage() {
  return (
    <div className="products-page">
      <ProductHeader />
      <main>
        <ProductBanner />
        <ProductGrid />
        <BestSeller />
        <AllProducts />
      </main>
      <Footer />
    </div>
  )
} 