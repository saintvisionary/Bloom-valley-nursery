'use client'

import { useState } from 'react'
import { FaHeart, FaShoppingCart, FaChevronRight, FaStar, FaRegStar } from 'react-icons/fa'
import ProductHeader from '@/components/Products/ProductHeader'
import RelatedProducts from '@/components/Products/RelatedProducts'
import Footer from '@/components/Footer'
import './styles.css'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'

const ProductDetail = () => {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('reviews')
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change)
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    addToCart({
      id: 1,
      name: "Birch Tree",
      price: 129.99,
      quantity: quantity,
      imageUrl: "/trees/BirchTree.png"
    })
  }

  return (
    <div className="product-detail-page">
      <ProductHeader />
      
      <main className="product-detail-content">
        <div className="product-main">
          <div className="product-image">
            <Image 
              src="/trees/AppleTree.png"
              alt="Apple Tree"
              width={600}
              height={600}
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="product-info">
            <h1>Birch Tree</h1>
            <div className="price">$129.99</div>
            
            <div className="meta-info">
              <div className="rating">
                <span className="stars">★★★★★</span>
                <span className="rating-count">4.8 (1,873)</span>
              </div>
              <button className="favorite-button">
                <FaHeart />
              </button>
              <span className="plant-type">Tree</span>
            </div>

            <p className="description">
              Beautiful birch tree with elegant white bark and delicate leaves. Perfect for adding natural beauty to any landscape.
            </p>

            <div className="quantity-selector">
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>

            <div className="action-buttons">
              <button className="order-now">Order Now</button>
              <button className="add-to-cart" onClick={handleAddToCart}>
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="product-tabs">
          <button 
            className={activeTab === 'description' ? 'active' : ''}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={activeTab === 'reviews' ? 'active' : ''}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
          <button 
            className={activeTab === 'images' ? 'active' : ''}
            onClick={() => setActiveTab('images')}
          >
            Images
          </button>
          <button 
            className={activeTab === 'deals' ? 'active' : ''}
            onClick={() => setActiveTab('deals')}
          >
            Hot Deal
          </button>
        </div>

        {activeTab === 'reviews' && (
          <div className="reviews-section">
            <div className="add-review">
              <div className="rating-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="star-button"
                  >
                    {star <= rating ? <FaStar /> : <FaRegStar />}
                  </button>
                ))}
              </div>
              
              <div className="review-form">
                <input
                  type="text"
                  placeholder="Share your thoughts"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <button className="post-review">
                  Post It <FaChevronRight />
                </button>
              </div>
            </div>

            <div className="reviews-list">
              <div className="reviews-header">
                <h3>Customer Reviews (3)</h3>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>

              {/* Example review */}
              <div className="review">
                <div className="review-header">
                  <div className="avatar">
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#666'
                    }}>
                      JS
                    </div>
                  </div>
                  <div className="review-meta">
                    <h4>John Smith</h4>
                    <div className="stars">★★★★★</div>
                  </div>
                </div>
                <p className="review-text">
                  Beautiful tree! It&apos;s growing wonderfully in my garden.
                </p>
                <div className="review-footer">
                  <span className="time">2 days ago</span>
                  <div className="actions">
                    <button>Like</button>
                    <button>Reply</button>
                  </div>
                </div>
              </div>

              <button className="load-more">Load More Comments</button>
            </div>
          </div>
        )}

        <RelatedProducts />
      </main>

      <Footer />
    </div>
  )
}

export default ProductDetail 