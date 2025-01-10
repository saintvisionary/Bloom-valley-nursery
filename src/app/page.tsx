'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa'
import ProductCard from '@/components/ProductCard/ProductCard'
import TestimonialCard from '@/components/TestimonialCard/TestimonialCard'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer'
import './home.css'
import { useState, useRef } from 'react'

const popularTrees = [
  {
    name: "Red Maple Tree",
    price: 149.99,
    description: "Vibrant red foliage with stunning fall colors",
    imageUrl: "/trees/MapleTree.png",
    href: "/products/maple-tree"
  },
  {
    name: "Apple Tree",
    price: 89.99,
    description: "Fresh, homegrown apples right in your backyard",
    imageUrl: "/trees/AppleTree.png",
    href: "/products/apple-tree"
  },
  {
    name: "Birch Tree",
    price: 129.99,
    description: "Elegant white bark with delicate leaves",
    imageUrl: "/trees/BirchTree.png",
    href: "/products/birch-tree"
  }
]

const plants = [
  {
    name: "Aloe Vera",
    imageUrl: "/plants/AloePlant.png",
    href: "/products/aloe-plant"
  },
  {
    name: "Spider Plant",
    imageUrl: "/plants/SpiderPlant.png",
    href: "/products/spider-plant"
  },
  {
    name: "String of Pearls",
    imageUrl: "/plants/StringofPearls.png",
    href: "/products/string-of-pearls"
  },
  {
    name: "Aloe Vera",
    imageUrl: "/plants/AloePlant.png",
    href: "/products/aloe-plant"
  },
  {
    name: "Spider Plant",
    imageUrl: "/plants/SpiderPlant.png",
    href: "/products/spider-plant"
  },
  {
    name: "String of Pearls",
    imageUrl: "/plants/StringofPearls.png",
    href: "/products/string-of-pearls"
  }
]

const testimonials = [
  {
    quote: "The quality of plants and service exceeded my expectations. My garden has never looked better!",
    name: "Lily Chen",
    affiliation: "Urban Gardener",
    rating: 5
  },
  {
    quote: "Their expertise and attention to detail made all the difference in my landscaping project.",
    name: "Jasper Woods",
    affiliation: "Landscape Architect",
    rating: 5
  },
  {
    quote: "The team's knowledge and passion for plants is truly remarkable. Highly recommended!",
    name: "Flora Martinez",
    affiliation: "Garden Enthusiast",
    rating: 5
  },
  {
    quote: "Found rare plants I couldn't get anywhere else. Their collection is outstanding!",
    name: "Sage Anderson",
    affiliation: "Plant Collector",
    rating: 5
  },
  {
    quote: "The gardening workshops they offer have transformed my plant care skills completely.",
    name: "Ivy Thompson",
    affiliation: "Home Horticulturist",
    rating: 5
  },
  {
    quote: "Best nursery in the area! Their plant health guarantee gives me confidence in every purchase.",
    name: "Hazel Brooks",
    affiliation: "Garden Club President",
    rating: 5
  }
]

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const testimonialCarouselRef = useRef<HTMLDivElement>(null)

  const scrollToSlide = (direction: 'prev' | 'next') => {
    if (testimonialCarouselRef.current) {
      const carousel = testimonialCarouselRef.current
      const cardWidth = carousel.querySelector('.testimonial-card')?.clientWidth || 0
      const scrollAmount = cardWidth + 20 // card width + gap

      if (direction === 'prev') {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        setActiveSlide(prev => Math.max(0, prev - 1))
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        setActiveSlide(prev => Math.min(testimonials.length - 1, prev + 1))
      }
    }
  }

  const scrollToIndex = (index: number) => {
    if (testimonialCarouselRef.current) {
      const carousel = testimonialCarouselRef.current
      const cardWidth = carousel.querySelector('.testimonial-card')?.clientWidth || 0
      const scrollAmount = (cardWidth + 20) * index // card width + gap
      
      carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' })
      setActiveSlide(index)
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Nurture Your Garden&apos;s Foundation</h1>
              <p>Our premium potting soil blend provides the perfect balance of nutrients, drainage, and organic matter for thriving plants. Crafted with care for both indoor and outdoor gardening.</p>
              <div className="hero-features">
                <div className="feature">
                  <span className="feature-highlight">✦</span> Professional Grade Mix
                </div>
                <div className="feature">
                  <span className="feature-highlight">✦</span> Rich in Organic Matter
                </div>
                <div className="feature">
                  <span className="feature-highlight">✦</span> Perfect Moisture Balance
                </div>
              </div>
              <div className="hero-cta">
                <Link href="/products" className="cta-button">
                  Shop Premium Soil
                </Link>
                <Link href="/about" className="learn-more">
                  View Ingredients →
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <Image
                src="/PottingSoil.png"
                alt="Premium Potting Soil with Garden Tool"
                width={600}
                height={400}
                priority
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                className="soil-image"
              />
            </div>
          </div>
        </section>

        <section className="popular-section">
          <div className="section-content">
            <div className="section-header">
              <span className="section-title">Most Popular</span>
              <h2 className="section-heading">Our Exclusive Trees</h2>
            </div>
            
            <div className="carousel-container">
              <button className="carousel-button prev">
                <FaChevronLeft />
              </button>
              
              <div className="products-carousel">
                {popularTrees.map((tree, index) => (
                  <Link 
                    key={index}
                    href={tree.href}
                    className="product-card-link"
                  >
                    <ProductCard
                      name={tree.name}
                      price={tree.price}
                      description={tree.description}
                      imageUrl={tree.imageUrl}
                    />
                  </Link>
                ))}
              </div>

              <button className="carousel-button next">
                <FaChevronRight />
              </button>
            </div>
          </div>
        </section>

        <section className="flower-service">
          <div className="section-content">
            <div className="section-header">
              <span className="section-title">Flower Service</span>
              <h2 className="section-heading">Choose your favorite flower</h2>
            </div>
            
            <div className="plant-icons">
              {plants.map((plant, index) => (
                <Link 
                  key={index} 
                  href={plant.href}
                  className="plant-icon-wrapper"
                >
                  <div className="plant-icon">
                    <Image
                      src={plant.imageUrl}
                      alt={plant.name}
                      width={80}
                      height={80}
                      className="plant-image"
                    />
                  </div>
                  <span className="plant-name">{plant.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="reasons-section">
          <div className="section-content">
            <div className="section-header">
              <span className="section-title">The reasons</span>
              <h2 className="section-heading">Why Choose Us?</h2>
            </div>
            
            <div className="video-container">
              {!isPlaying ? (
                <div 
                  className="video-placeholder"
                  onClick={() => setIsPlaying(true)}
                >
                  <button className="play-button">
                    <FaPlay className="play-icon" />
                  </button>
                </div>
              ) : (
                <div className="video-wrapper">
                  <video
                    controls
                    autoPlay
                    className="video-player"
                    onEnded={() => setIsPlaying(false)}
                  >
                    <source src="/bloomhomevideo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <div className="section-content">
            <div className="section-header">
              <span className="section-title">Testimonials</span>
              <h2 className="section-heading">What&apos;s our customer says?</h2>
            </div>
            
            <div className="testimonials-container">
              <button 
                className="carousel-button prev"
                onClick={() => scrollToSlide('prev')}
                disabled={activeSlide === 0}
              >
                <FaChevronLeft />
              </button>
              
              <div 
                className="testimonials-carousel"
                ref={testimonialCarouselRef}
              >
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={index}
                    {...testimonial}
                  />
                ))}
              </div>

              <button 
                className="carousel-button next"
                onClick={() => scrollToSlide('next')}
                disabled={activeSlide === testimonials.length - 1}
              >
                <FaChevronRight />
              </button>
            </div>

            <div className="carousel-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === activeSlide ? 'active' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => scrollToIndex(index)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="newsletter-section">
          <div className="section-content">
            <div className="section-header">
              <span className="section-title">Get In Touch</span>
              <h2 className="section-heading">Join Our Newsletter</h2>
              <p className="section-description">
                Subscribe to receive gardening tips, exclusive offers, and updates on new plants.
              </p>
            </div>
            
            <form className="newsletter-form" onSubmit={(e) => {
              e.preventDefault()
              // Add your newsletter subscription logic here
            }}>
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Your email"
                  aria-label="Email address"
                  className="email-input"
                  required
                />
              </div>
              <button type="submit" className="subscribe-button">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
