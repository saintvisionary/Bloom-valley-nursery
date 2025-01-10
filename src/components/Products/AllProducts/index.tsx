'use client'

import { FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { useProducts } from '@/contexts/ProductContext'
import './styles.css'

const AllProducts = () => {
  const { filteredProducts } = useProducts()

  if (filteredProducts.length === 0) {
    return (
      <section className="all-products-section">
        <div className="section-content">
          <h2 className="section-heading">All Products</h2>
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="all-products-section">
      <div className="section-content">
        <h2 className="section-heading">All Products</h2>
        <div className="products-grid">
          {filteredProducts.map((product) => (
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
      </div>
    </section>
  )
}

export default AllProducts 