'use client'

import React from 'react'
import Image from 'next/image'
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Footer from '@/components/Footer'
import './styles.css'

const reviews = {
  average: 4.7,
  total: 2458,
  breakdown: [
    { stars: 5, count: 1850 },
    { stars: 4, count: 420 },
    { stars: 3, count: 125 },
    { stars: 2, count: 45 },
    { stars: 1, count: 18 }
  ]
}

const testimonials = [
  {
    id: 1,
    name: "Maria Gonzalez",
    title: "Home Garden Enthusiast",
    rating: 5,
    quote: "Bloom Valley Nursery has transformed my garden into a paradise. Their expert advice and quality plants have helped me create a beautiful space that brings joy to my whole family."
  },
  {
    id: 2,
    name: "James Wilson",
    title: "Urban Farming Specialist",
    rating: 5,
    quote: "As a professional gardener, I rely on quality plants and expert knowledge. Bloom Valley consistently delivers excellence in both products and customer service."
  },
  {
    id: 3,
    name: "Aisha Patel",
    title: "Community Garden Organizer",
    rating: 5,
    quote: "The team's passion for sustainable gardening is inspiring! They've helped our community garden thrive with their knowledge and support."
  },
  {
    id: 4,
    name: "Marcus Thompson",
    title: "Balcony Garden Designer",
    rating: 5,
    quote: "Their selection of plants perfect for small spaces has helped me transform countless urban balconies into green sanctuaries. Outstanding quality and service!"
  }
]

export default function AboutPage() {
  const testimonialRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (testimonialRef.current) {
      const scrollAmount = 400
      const newScrollPosition = testimonialRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount)
      
      testimonialRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      })
    }
  }

  const getMaxCount = () => Math.max(...reviews.breakdown.map(r => r.count))

  return (
    <div className="about-page">
      <section className="hero-section">
        <h1>About Us</h1>
      </section>

      <section className="our-story">
        <div className="content-wrapper">
          <div className="text-content">
            <h2>Our Story</h2>
            <p>
              Founded in 2020, Bloom Valley Nursery grew from a passion for bringing nature&apos;s beauty 
              into people&apos;s lives. What started as a small family-owned garden center has blossomed 
              into a thriving community hub for plant enthusiasts, gardeners, and nature lovers.
            </p>
            <p>
              Our journey began with a simple belief: everyone deserves to experience the joy of 
              watching something grow. Whether you&apos;re an experienced gardener or just starting your 
              plant journey, we&apos;re here to support, educate, and inspire.
            </p>
          </div>
          <div className="image-container">
            <Image
              src="/about/BloomValleyNurseryStory.png"
              alt="Bloom Valley Nursery Story - A family in their nursery surrounded by beautiful plants"
              width={600}
              height={500}
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>
      </section>

      <section className="our-mission">
        <div className="content-wrapper reverse">
          <div className="text-content">
            <h2>Our Mission</h2>
            <p>
              At Bloom Valley Nursery, our mission is to cultivate not just plants, but a deeper 
              connection between people and nature. We strive to provide the highest quality plants, 
              expert guidance, and a welcoming environment where your gardening dreams can flourish.
            </p>
            <p>
              We&apos;re committed to sustainable practices, community engagement, and sharing our 
              knowledge to help create greener, healthier spaces for generations to come.
            </p>
          </div>
          <div className="image-container">
            <Image
              src="/about/BloomValleyNurserymission.png"
              alt="Bloom Valley Nursery Mission - A vibrant greenhouse filled with diverse plants and happy customers"
              width={600}
              height={500}
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>
      </section>

      <section className="reviews">
        <h2>Customer Reviews</h2>
        <div className="reviews-overview">
          <div className="rating-summary">
            <div className="average-rating">
              <span className="rating-number">{reviews.average}</span>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < Math.floor(reviews.average) ? 'filled' : ''}
                  />
                ))}
              </div>
              <span className="total-reviews">Based on {reviews.total} reviews</span>
            </div>
            <p className="rating-comment">
              Our customers love the quality of our plants and the expertise of our staff
            </p>
          </div>

          <div className="rating-breakdown">
            {reviews.breakdown.map((item) => (
              <div key={item.stars} className="breakdown-row">
                <span className="stars-label">{item.stars} stars</span>
                <div className="bar-container">
                  <div 
                    className="bar" 
                    style={{ 
                      width: `${(item.count / getMaxCount()) * 100}%`
                    }}
                  />
                </div>
                <span className="count">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>Testimonials</h2>
        <div className="testimonials-container">
          <button 
            className="scroll-button left"
            onClick={() => scroll('left')}
          >
            <FaChevronLeft />
          </button>

          <div className="testimonials-grid" ref={testimonialRef}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="avatar">
                  <Image
                    src={`/testimonials/avatar-${testimonial.id}.jpg`}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="filled" />
                  ))}
                </div>
                <p className="quote">{testimonial.quote}</p>
                <div className="author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.title}</span>
                </div>
              </div>
            ))}
          </div>

          <button 
            className="scroll-button right"
            onClick={() => scroll('right')}
          >
            <FaChevronRight />
          </button>
        </div>
      </section>
      
      <Footer />
    </div>
  )
} 