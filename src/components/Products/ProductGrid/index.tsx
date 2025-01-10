'use client'

import { useRef } from 'react'
import { FaChevronLeft, FaChevronRight, FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'
import './styles.css'
import Image from 'next/image'
import { useProducts } from '@/contexts/ProductContext'

const ProductGrid = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { products } = useProducts()

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      const newScrollPosition = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount)
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="product-grid-section">
      <div className="section-content">
        <h2 className="section-heading">Recommended</h2>
        
        <div className="product-grid-container">
          <button 
            className="scroll-button left"
            onClick={() => scroll('left')}
          >
            <FaChevronLeft />
          </button>

          <div className="product-grid" ref={scrollContainerRef}>
            {products.slice(0, 6).map((product) => (
              <Link 
                key={product.id} 
                href={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="product-card"
              >
                <div className="product-image">
                  <Image 
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 280px"
                    priority={product.id <= 4}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price}</p>
                  <div className="rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="review-count">({product.reviews})</span>
                  </div>
                </div>
                <button className="cart-button">
                  <FaShoppingCart />
                </button>
              </Link>
            ))}
          </div>

          <button 
            className="scroll-button right"
            onClick={() => scroll('right')}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductGrid 