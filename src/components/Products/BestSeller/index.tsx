'use client'

import { useRef, useState } from 'react'
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
  const [activeSlide, setActiveSlide] = useState(0)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      const newScrollPosition = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount)
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      })

      // Update active slide
      const newSlide = direction === 'left' 
        ? Math.max(0, activeSlide - 1)
        : Math.min(bestSellers.length - 1, activeSlide + 1)
      setActiveSlide(newSlide)
    }
  }

  return (
    <section className="best-seller-section">
      <div className="section-content">
        <h2 className="section-heading">Best Seller</h2>
        
        <div className="product-grid-container">
          <button 
            className="scroll-button left"
            onClick={() => scroll('left')}
            disabled={activeSlide === 0}
          >
            <FaChevronLeft />
          </button>

          <div className="product-grid" ref={scrollContainerRef}>
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
                    width={280}
                    height={280}
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="sold-count">
                    {product.soldCount}+ sold
                  </div>
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
                <button className="cart-button" onClick={(e) => e.preventDefault()}>
                  <FaShoppingCart />
                </button>
              </Link>
            ))}
          </div>

          <button 
            className="scroll-button right"
            onClick={() => scroll('right')}
            disabled={activeSlide === bestSellers.length - 1}
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="carousel-dots">
          {bestSellers.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeSlide ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const cardWidth = scrollContainerRef.current.querySelector('.product-card')?.clientWidth || 0
                  const scrollAmount = (cardWidth + 20) * index
                  scrollContainerRef.current.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                  })
                  setActiveSlide(index)
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestSeller 