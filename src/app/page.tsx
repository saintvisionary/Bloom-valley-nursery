'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa'
import ProductCard from '@/components/ProductCard/ProductCard'
import TestimonialCard from '@/components/TestimonialCard/TestimonialCard'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer'
import './home.css'
import { useState, useRef, useEffect } from 'react'

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
  }
]

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const testimonialCarouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Nurture Your Garden&apos;s Foundation</h1>
              <p>Our premium potting soil blend provides the perfect balance of nutrients, drainage, and organic matter for thriving plants.</p>
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
              <img
                src="/PottingSoil.png"
                alt="Premium Potting Soil with Garden Tool"
                className="soil-image"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
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
                    <img
                      src={plant.imageUrl}
                      alt={plant.name}
                      className="plant-image"
                      width={80}
                      height={80}
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
                  style={{
                    background: 'linear-gradient(45deg, #2c5530, #1a2e22)',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '500px'
                  }}
                >
                  <button className="play-button">
                    <FaPlay className="play-icon" />
                  </button>
                </div>
              ) : (
                <div className="video-wrapper" style={{ minHeight: '500px' }}>
                  <video
                    controls
                    autoPlay
                    playsInline
                    width="100%"
                    height="100%"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '20px',
                      backgroundColor: '#000'
                    }}
                  >
                    <source src="/bloomhomevideo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
