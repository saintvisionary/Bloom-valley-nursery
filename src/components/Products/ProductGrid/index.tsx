'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { FaChevronLeft, FaChevronRight, FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { useProducts } from '@/contexts/ProductContext'
import { usePathname } from 'next/navigation'
import './styles.css'

const ProductGrid = () => {
  const pathname = usePathname()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const { products } = useProducts()
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const checkScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
  }

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const cardWidth = container.querySelector('.product-card')?.clientWidth || 0
    const gap = 20
    const scrollAmount = cardWidth + gap
    
    const newScrollPosition = container.scrollLeft + 
      (direction === 'left' ? -scrollAmount : scrollAmount)
    
    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    })

    setTimeout(checkScroll, 300)
  }, [])

  // Initialize component
  useEffect(() => {
    setIsInitialized(true)
    return () => setIsInitialized(false)
  }, [])

  // Handle scroll reset and check on route change or initialization
  useEffect(() => {
    if (!isInitialized) return

    const initializeScroll = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = 0
        checkScroll()
      }
    }

    // Initial setup
    initializeScroll()

    // Setup resize handler
    window.addEventListener('resize', initializeScroll)
    
    return () => {
      window.removeEventListener('resize', initializeScroll)
    }
  }, [pathname, isInitialized])

  // Handle auto-scroll
  useEffect(() => {
    if (!isInitialized || !products.length) return

    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current)
      autoScrollInterval.current = null
    }

    if (!isHovered && scrollContainerRef.current) {
      autoScrollInterval.current = setInterval(() => {
        const container = scrollContainerRef.current
        if (container) {
          const { scrollLeft, scrollWidth, clientWidth } = container
          const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1
          
          if (isAtEnd) {
            container.scrollTo({ left: 0, behavior: 'smooth' })
          } else {
            scroll('right')
          }
        }
      }, 5000)
    }

    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current)
        autoScrollInterval.current = null
      }
    }
  }, [isHovered, products, isInitialized, scroll])

  if (!isInitialized || !products.length) {
    return null
  }

  return (
    <section className="product-grid-section">
      <div className="section-content">
        <h2 className="section-heading">Recommended</h2>
        
        <div className="product-grid-container">
          <button 
            className={`scroll-button left ${!canScrollLeft ? 'disabled' : ''}`}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            type="button"
          >
            <FaChevronLeft />
          </button>

          <div 
            className="product-grid" 
            ref={scrollContainerRef}
            onScroll={checkScroll}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
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
                    sizes="(max-width: 768px) 240px, 280px"
                    priority={product.id <= 4}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price.toFixed(2)}</p>
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
                <button 
                  className="cart-button"
                  onClick={(e) => {
                    e.preventDefault()
                    // Add to cart functionality
                  }}
                  aria-label="Add to cart"
                  type="button"
                >
                  <FaShoppingCart />
                </button>
              </Link>
            ))}
          </div>

          <button 
            className={`scroll-button right ${!canScrollRight ? 'disabled' : ''}`}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            type="button"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductGrid 