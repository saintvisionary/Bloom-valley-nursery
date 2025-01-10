'use client'

import { useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaShoppingCart } from 'react-icons/fa'
import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import './styles.css'

interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
}

const relatedProducts = [
  {
    id: 1,
    name: "Maple Tree",
    price: 149.99,
    rating: 4.8,
    reviews: 89,
    imageUrl: "/trees/MapleTree.png"
  },
  {
    id: 2,
    name: "Birch Tree",
    price: 129.99,
    rating: 4.6,
    reviews: 67,
    imageUrl: "/trees/BirchTree.png"
  },
  {
    id: 3,
    name: "Aloe Plant",
    price: 24.99,
    rating: 4.7,
    reviews: 156,
    imageUrl: "/plants/AloePlant.png"
  },
  {
    id: 4,
    name: "Potting Soil",
    price: 19.99,
    rating: 4.9,
    reviews: 203,
    imageUrl: "/PottingSoil.png"
  }
]

const RelatedProducts = () => {
  const { addToCart } = useCart()
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
        : Math.min(relatedProducts.length - 1, activeSlide + 1)
      setActiveSlide(newSlide)
    }
  }

  const handleAddToCart = (e: React.MouseEvent, product: RelatedProduct) => {
    e.preventDefault() // Prevent navigation when clicking cart button
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl
    })
  }

  return (
    <section className="related-products">
      <div className="section-content">
        <h2>You may also like</h2>
        
        <div className="product-grid-container">
          <button 
            className="scroll-button left"
            onClick={() => scroll('left')}
            disabled={activeSlide === 0}
          >
            <FaChevronLeft />
          </button>

          <div className="product-grid" ref={scrollContainerRef}>
            {relatedProducts.map((product) => (
              <Link 
                key={product.id} 
                href={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="product-card"
              >
                <div className="product-image">
                  <Image 
                    src={product.imageUrl}
                    alt={product.name}
                    width={240}
                    height={240}
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
                <button 
                  className="cart-button"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  <FaShoppingCart />
                </button>
              </Link>
            ))}
          </div>

          <button 
            className="scroll-button right"
            onClick={() => scroll('right')}
            disabled={activeSlide === relatedProducts.length - 1}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}

export default RelatedProducts 