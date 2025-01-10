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
    name: "David Wilson",
    rating: 5,
    text: "Beautiful blue birdhouse! The birds in my garden love it, and it adds such a charming touch to our backyard.",
    time: "3 days ago",
    likes: 15
  },
  {
    id: 2,
    name: "Lisa Thompson",
    rating: 4,
    text: "Great quality and easy to install. The blue color is vibrant and weather-resistant.",
    time: "1 week ago",
    likes: 10
  },
  {
    id: 3,
    name: "Mark Anderson",
    rating: 5,
    text: "Perfect size for small birds. Already have a family of chickadees making it their home!",
    time: "2 weeks ago",
    likes: 13
  }
]

const productImages = [
  {
    id: 1,
    url: "/BirdHouse.png",
    alt: "Blue Birdhouse - Front View"
  },
  {
    id: 2,
    url: "/BirdHouse.png",
    alt: "Blue Birdhouse - Side View"
  },
  {
    id: 3,
    url: "/BirdHouse.png",
    alt: "Blue Birdhouse - Back View"
  },
  {
    id: 4,
    url: "/BirdHouse.png",
    alt: "Blue Birdhouse - Detail View"
  }
]

const hotDeals = [
  {
    id: 1,
    title: "Birdhouse Garden Bundle",
    description: "Get a Blue Birdhouse + Mounting Pole + Bird Feed Starter Kit",
    originalPrice: 59.99,
    salePrice: 39.99,
    savings: "33%",
    validUntil: "2024-05-01",
    includes: [
      "1 Blue Birdhouse",
      "1 Steel Mounting Pole",
      "Premium Bird Feed Mix",
      "Installation Guide"
    ]
  },
  {
    id: 2,
    title: "Buy 2 Get 1 Free",
    description: "Create a charming bird sanctuary",
    originalPrice: 89.97,
    salePrice: 59.98,
    savings: "33%",
    validUntil: "2024-04-15",
    includes: [
      "3 Blue Birdhouses",
      "Free Delivery",
      "Weather Protection Coating",
      "Extended Warranty"
    ]
  }
]

const BlueBirdhouseDetail = () => {
  const router = useRouter()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('reviews')
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
      id: 5,
      name: "Blue Birdhouse",
      price: 29.99,
      quantity: quantity,
      imageUrl: "/BirdHouse.png"
    })
  }

  const handleOrderNow = () => {
    addToCart({
      id: 5,
      name: "Blue Birdhouse",
      price: 29.99,
      quantity: quantity,
      imageUrl: "/BirdHouse.png"
    })
    router.push('/checkout')
  }

  return (
    <div className="product-detail-page">
      <main className="product-detail-content">
        <div className="product-main">
          <div className="product-image">
            <Image 
              src="/BirdHouse.png"
              alt="Blue Birdhouse"
              width={600}
              height={600}
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="product-info">
            <h1>Blue Birdhouse</h1>
            <div className="price">$29.99</div>
            
            <div className="meta-info">
              <div className="rating">
                <span className="stars">★★★★★</span>
                <span className="rating-count">4.8 (89)</span>
              </div>
              <button className="favorite-button">
                <FaHeart />
              </button>
              <span className="plant-type">Garden Decor</span>
            </div>

            <p className="description">
              Add a touch of whimsy to your garden with our charming blue birdhouse. 
              Crafted from weather-resistant materials with a vibrant blue finish, this 
              birdhouse provides a cozy haven for small birds while enhancing your outdoor space.
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
              <button className={size === "S" ? 'active' : ''}>S</button>
              <button className={size === "M" ? 'active' : ''}>M</button>
              <button className={size === "L" ? 'active' : ''}>L</button>
              <button className={size === "XL" ? 'active' : ''}>XL</button>
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
            <h2>About Blue Birdhouse</h2>
            <p>
              Our blue birdhouse is designed to attract and shelter small songbirds while adding 
              decorative charm to your outdoor space. Each birdhouse is carefully crafted with 
              attention to both aesthetics and functionality.
            </p>
            
            <h3>Features</h3>
            <ul>
              <li>Weather-resistant construction</li>
              <li>Proper ventilation and drainage</li>
              <li>Easy-clean removable back panel</li>
              <li>Perfect size for small birds</li>
            </ul>

            <h3>Specifications</h3>
            <ul>
              <li>Dimensions: 8&quot;H x 6&quot;W x 6&quot;D</li>
              <li>1.25&quot; entrance hole</li>
              <li>Mounting hardware included</li>
              <li>UV-resistant blue paint finish</li>
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

export default BlueBirdhouseDetail 