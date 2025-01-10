'use client'

import { useState } from 'react'
import { FaHeart, FaShoppingCart, FaChevronRight, FaStar, FaRegStar } from 'react-icons/fa'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import Footer from '@/components/Footer'
import RelatedProducts from '@/components/Products/RelatedProducts'
import './styles.css'
import Image from 'next/image'

const reviews = [
  {
    id: 1,
    name: "Sarah Miller",
    rating: 5,
    text: "This watering can is not only beautiful but perfectly balanced! Makes watering my plants a joy.",
    time: "2 days ago",
    likes: 12
  },
  {
    id: 2,
    name: "James Parker",
    rating: 4,
    text: "Love the design and color. Great capacity and the rose attachment creates a gentle shower for delicate plants.",
    time: "1 week ago",
    likes: 8
  },
  {
    id: 3,
    name: "Emily Chen",
    rating: 5,
    text: "Sturdy construction and the blue color is gorgeous. Perfect for both indoor and outdoor use!",
    time: "2 weeks ago",
    likes: 15
  }
]

const productImages = [
  {
    id: 1,
    url: "/WateringCan.png",
    alt: "Blue Watering Can - Front View"
  },
  {
    id: 2,
    url: "/WateringCan.png",
    alt: "Blue Watering Can - Side View"
  },
  {
    id: 3,
    url: "/WateringCan.png",
    alt: "Blue Watering Can - Detail View"
  },
  {
    id: 4,
    url: "/WateringCan.png",
    alt: "Blue Watering Can - In Use"
  }
]

const hotDeals = [
  {
    id: 1,
    title: "Garden Care Bundle",
    description: "Get a Blue Watering Can + Plant Mister + Care Tools",
    originalPrice: 49.99,
    salePrice: 34.99,
    savings: "30%",
    validUntil: "2024-05-01",
    includes: [
      "1 Blue Watering Can",
      "1 Plant Mister",
      "Garden Tool Set",
      "Care Guide"
    ]
  },
  {
    id: 2,
    title: "Buy 2 Get 1 Free",
    description: "Perfect for gifting to fellow plant lovers",
    originalPrice: 74.97,
    salePrice: 49.98,
    savings: "33%",
    validUntil: "2024-04-15",
    includes: [
      "3 Blue Watering Cans",
      "Free Delivery",
      "Extended Warranty",
      "Gift Packaging"
    ]
  }
]

const BlueWateringCanDetail = () => {
  const router = useRouter()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedImage, setSelectedImage] = useState(productImages[0])
  const [size] = useState('M')

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change)
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    addToCart({
      id: 6,
      name: "Blue Watering Can",
      price: 24.99,
      quantity: quantity,
      imageUrl: "/WateringCan.png"
    })
  }

  const handleOrderNow = () => {
    addToCart({
      id: 6,
      name: "Blue Watering Can",
      price: 24.99,
      quantity: quantity,
      imageUrl: "/WateringCan.png"
    })
    router.push('/checkout')
  }

  return (
    <div className="product-detail-page">
      <main className="product-detail-content">
        <div className="product-main">
          <div className="product-image">
            <Image 
              src="/WateringCan.png"
              alt="Blue Watering Can"
              width={600}
              height={600}
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="product-info">
            <h1>Blue Watering Can</h1>
            <div className="price">$24.99</div>
            
            <div className="meta-info">
              <div className="rating">
                <span className="stars">★★★★★</span>
                <span className="rating-count">4.7 (124)</span>
              </div>
              <button className="favorite-button">
                <FaHeart />
              </button>
              <span className="plant-type">Garden Tools</span>
            </div>

            <p className="description">
              Elevate your plant care routine with our elegant blue watering can. 
              Crafted from durable materials with a beautiful matte finish, this 
              watering can combines style with functionality. Perfect for indoor and 
              outdoor use, featuring a balanced design and gentle shower rose.
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

            <div className="size-options">
              <button className={size === 'S' ? 'active' : ''}>S</button>
              <button className={size === 'M' ? 'active' : ''}>M</button>
              <button className={size === 'L' ? 'active' : ''}>L</button>
            </div>

            <div className="action-buttons">
              <button className="order-now" onClick={handleOrderNow}>Order Now</button>
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

        {activeTab === 'description' && (
          <div className="description-section">
            <h2>About Blue Watering Can</h2>
            <p>
              Our blue watering can is designed to make plant care both efficient and 
              enjoyable. The ergonomic design ensures comfortable handling, while the 
              removable rose creates the perfect water flow for different plant needs.
            </p>
            
            <h3>Features</h3>
            <ul>
              <li>2-liter capacity</li>
              <li>Removable rose attachment</li>
              <li>Ergonomic handle design</li>
              <li>Rust-resistant construction</li>
            </ul>

            <h3>Specifications</h3>
            <ul>
              <li>Dimensions: 15&quot;L x 6&quot;W x 10&quot;H</li>
              <li>Material: High-grade plastic</li>
              <li>Matte blue finish</li>
              <li>Balanced pour design</li>
            </ul>
          </div>
        )}

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
                <h3>Customer Reviews ({reviews.length})</h3>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>

              {reviews.map((review) => (
                <div key={review.id} className="review">
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
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div className="review-meta">
                      <h4>{review.name}</h4>
                      <div className="stars">
                        {'★'.repeat(review.rating)}
                        {'☆'.repeat(5 - review.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="review-text">{review.text}</p>
                  <div className="review-footer">
                    <span className="time">{review.time}</span>
                    <div className="actions">
                      <button>Like ({review.likes})</button>
                      <button>Reply</button>
                    </div>
                  </div>
                </div>
              ))}

              <button className="load-more">Load More Comments</button>
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="images-section">
            <div className="main-image">
              <Image 
                src={selectedImage.url} 
                alt={selectedImage.alt}
                width={600}
                height={600}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="image-thumbnails">
              {productImages.map((image) => (
                <button
                  key={image.id}
                  className={`thumbnail ${selectedImage.id === image.id ? 'active' : ''}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image 
                    src={image.url}
                    alt={image.alt}
                    width={100}
                    height={100}
                    style={{ objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'deals' && (
          <div className="deals-section">
            {hotDeals.map((deal) => (
              <div key={deal.id} className="deal-card">
                <div className="deal-header">
                  <div className="deal-info">
                    <h3>{deal.title}</h3>
                    <p>{deal.description}</p>
                  </div>
                  <div className="deal-pricing">
                    <span className="original-price">${deal.originalPrice}</span>
                    <span className="sale-price">${deal.salePrice}</span>
                    <span className="savings">Save {deal.savings}</span>
                  </div>
                </div>
                
                <div className="deal-content">
                  <div className="deal-includes">
                    <h4>Package Includes:</h4>
                    <ul>
                      {deal.includes.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="deal-actions">
                    <p className="deal-validity">
                      Valid until {new Date(deal.validUntil).toLocaleDateString()}
                    </p>
                    <button className="claim-deal">
                      Claim This Deal <FaChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <RelatedProducts />
      <Footer />
    </div>
  )
}

export default BlueWateringCanDetail 