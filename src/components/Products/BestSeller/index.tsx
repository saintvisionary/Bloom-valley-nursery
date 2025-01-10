'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { FaChevronLeft, FaChevronRight, FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'
import './styles.css'
import Image from 'next/image'

const bestSellers = [
  {
    id: 1,
    name: "Apple Tree",
    price: 89.99,
    rating: 4.5,
    reviews: 128,
    imageUrl: "/trees/AppleTree.png",
    soldCount: 1500
  },
  {
    id: 2,
    name: "Maple Tree",
    price: 149.99,
    rating: 4.8,
    reviews: 89,
    imageUrl: "/trees/MapleTree.png",
    soldCount: 1200
  },
  {
    id: 3,
    name: "Birch Tree",
    price: 129.99,
    rating: 4.6,
    reviews: 67,
    imageUrl: "/trees/BirchTree.png",
    soldCount: 950
  },
  {
    id: 4,
    name: "Aloe Plant",
    price: 24.99,
    rating: 4.7,
    reviews: 156,
    imageUrl: "/plants/AloePlant.png",
    soldCount: 2100
  },
  {
    id: 5,
    name: "Blue Birdhouse",
    price: 34.99,
    rating: 4.9,
    reviews: 92,
    imageUrl: "/BirdHouse.png",
    soldCount: 780
  },
  {
    id: 6,
    name: "Blue Watering Can",
    price: 19.99,
    rating: 4.7,
    reviews: 143,
    imageUrl: "/WateringCan.png",
    soldCount: 1800
  }
]

const BestSeller = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null)

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

  useEffect(() => {
    const handleResize = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = 0
        checkScroll()
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
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
  }, [isHovered, scroll])

  return (
    <section className="best-seller-section">
      <div className="section-content">
        <h2 className="section-heading">Best Seller</h2>
        
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
            {bestSellers.map((product) => (
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
                  <div className="sold-count">
                    {product.soldCount}+ sold
                  </div>
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

export default BestSeller 