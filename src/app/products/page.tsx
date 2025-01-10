'use client'

import { useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import ProductHeader from '../../components/Products/ProductHeader'
import ProductBanner from '@/components/Products/ProductBanner'
import ProductGrid from '@/components/Products/ProductGrid'
import BestSeller from '@/components/Products/BestSeller'
import AllProducts from '@/components/Products/AllProducts'
import Footer from '@/components/Footer'
import './products.css'

export default function ProductsPage() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="products-page">
      <ProductHeader />
      <main>
        <ProductBanner />
        <ProductGrid />
        <section className="reasons-section">
          <div className="section-content">
            <div className="section-header">
              <span className="section-title">The reasons</span>
              <h2 className="section-heading">Why Choose Us?</h2>
            </div>
            
            <div className="video-container">
              {!isPlaying ? (
                <div 
                  className="video-placeholder"
                  onClick={() => setIsPlaying(true)}
                >
                  <button className="play-button">
                    <FaPlay className="play-icon" />
                  </button>
                </div>
              ) : (
                <div className="video-wrapper">
                  <video
                    controls
                    autoPlay
                    className="video-player"
                    onEnded={() => setIsPlaying(false)}
                  >
                    <source src="/bloomhomevideo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          </div>
        </section>
        <BestSeller />
        <AllProducts />
      </main>
      <Footer />
    </div>
  )
} 