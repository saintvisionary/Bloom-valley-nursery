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
    name: "Jennifer Adams",
    rating: 5,
    text: "Perfect indoor plant! My aloe is thriving and I've already used it for minor burns. So practical and beautiful.",
    time: "4 days ago",
    likes: 18
  },
  {
    id: 2,
    name: "Robert Chen",
    rating: 5,
    text: "Excellent quality plant, arrived in perfect condition. Great for both decoration and medicinal purposes.",
    time: "1 week ago",
    likes: 12
  },
  {
    id: 3,
    name: "Maria Garcia",
    rating: 4,
    text: "Love how easy it is to care for this plant. The gel inside works wonders for sunburns!",
    time: "2 weeks ago",
    likes: 9
  }
]

const productImages = [
  {
    id: 1,
    url: "/plants/AloePlant.png",
    alt: "Aloe Plant - Main View"
  }
]

const hotDeals = [
  {
    id: 1,
    title: "Aloe Plant Bundle",
    description: "Get an Aloe Plant + Premium Succulent Soil + Care Kit",
    originalPrice: 39.99,
    salePrice: 24.99,
    savings: "37%",
    validUntil: "2024-05-01",
    includes: [
      "1 Mature Aloe Plant",
      "1 Bag Premium Succulent Soil",
      "Ceramic Drainage Pot",
      "Plant Care Guide"
    ]
  },
  {
    id: 2,
    title: "Buy 2 Get 1 Free",
    description: "Create your indoor aloe garden",
    originalPrice: 74.97,
    salePrice: 49.98,
    savings: "33%",
    validUntil: "2024-04-15",
    includes: [
      "3 Aloe Plants",
      "Free Delivery",
      "Care Instructions",
      "90-Day Growth Guarantee"
    ]
  }
]

const AloePlantDetail = () => {
  const router = useRouter()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('reviews')
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedImage, setSelectedImage] = useState(productImages[0])

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change)
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    addToCart({
      id: 4,
      name: "Aloe Plant",
      price: 24.99,
      quantity: quantity,
      imageUrl: "/plants/AloePlant.png"
    })
  }

  const handleOrderNow = () => {
    addToCart({
      id: 4,
      name: "Aloe Plant",
      price: 24.99,
      quantity: quantity,
      imageUrl: "/plants/AloePlant.png"
    })
    router.push('/checkout')
  }

  return (
    <div className="product-detail-page">
      <main className="product-detail-content">
        <div className="product-main">
          <div className="product-image">
            <Image 
              src="/plants/AloePlant.png"
              alt="Aloe Plant"
              width={600}
              height={600}
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="product-info">
            <h1>Aloe Plant</h1>
            <div className="price">$24.99</div>
            
            <div className="meta-info">
              <div className="rating">
                <span className="stars">★★★★★</span>
                <span className="rating-count">4.7 (156)</span>
              </div>
              <button className="favorite-button">
                <FaHeart />
              </button>
              <span className="plant-type">Succulent</span>
            </div>

            <p className="description">
              Add natural beauty and wellness to your home with our premium aloe vera plant. 
              Known for its healing properties and easy care requirements, this versatile succulent 
              is perfect for both beginners and experienced plant parents. Mature size: 12-24 inches.
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
            <h2>About Aloe Plant</h2>
            <p>
              Our aloe plants are carefully nurtured to ensure healthy growth and maximum gel content. 
              Each plant comes with detailed care instructions and a 90-day growth guarantee. Perfect 
              for both decorative and practical uses.
            </p>
            
            <h3>Features</h3>
            <ul>
              <li>Natural healing properties</li>
              <li>Air-purifying benefits</li>
              <li>Drought-tolerant succulent</li>
              <li>Perfect for indoor growing</li>
            </ul>

            <h3>Care Instructions</h3>
            <ul>
              <li>Place in bright, indirect sunlight</li>
              <li>Water only when soil is completely dry</li>
              <li>Use well-draining succulent soil</li>
              <li>Keep in temperatures between 55-80°F</li>
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

export default AloePlantDetail 