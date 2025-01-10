'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import Footer from '@/components/Footer'
import './styles.css'

export default function PlantSwapPage() {
  return (
    <div className="event-page">
      <div className="event-header">
        <div className="header-image">
          <Image
            src="/community/Plant Swap event.png"
            alt="Plant Swap"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="image-overlay" />
        </div>
        <Link href="/community" className="back-button">
          <FaArrowLeft /> Back to Community
        </Link>
        <div className="header-content">
          <div className="header-main">
            <div className="header-left">
              <div className="title-section">
                <h1>
                  <span className="title-prefix">Seasonal</span>
                  <span className="title-main">Plant</span>
                  <span className="title-main">Swap</span>
                </h1>
              </div>
              <div className="header-description">
                <div>Join our community</div>
                <div>for a day of sharing</div>
                <div>and exchanging plants</div>
              </div>
            </div>
          </div>
          <div className="event-meta">
            <div className="meta-item">
              <div className="meta-label">Date</div>
              <div className="meta-value">July 8, 2024</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Time</div>
              <div className="meta-value">2:00 PM - 5:00 PM</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Location</div>
              <div className="meta-value">Bloom Valley Nursery Garden Center</div>
            </div>
          </div>
        </div>
      </div>

      <div className="event-content">
        <div className="event-description">
          <h2>Join Our Seasonal Plant Swap</h2>
          <p>
            Connect with fellow plant enthusiasts and expand your collection at our
            seasonal plant swap event. Share your beloved plants, discover new
            varieties, and exchange gardening tips with our vibrant community.
          </p>

          <div className="swap-highlights">
            <h3>Event Highlights</h3>
            <p>
              Our plant swap events are more than just exchanging plants - they&apos;re
              a celebration of community, sustainability, and the joy of growing.
              Meet other plant lovers, share stories, and maybe find your next
              favorite plant!
            </p>
          </div>

          <div className="how-it-works">
            <h3>How It Works</h3>
            <ol>
              <li>Bring 1-5 healthy plants for swapping</li>
              <li>Get swap tokens for each plant you bring</li>
              <li>Browse other participants&apos; plants</li>
              <li>Use your tokens to take home new plants</li>
              <li>Connect with other plant enthusiasts</li>
            </ol>
          </div>

          <div className="swap-rules">
            <h3>Swap Rules</h3>
            <ul>
              <li>Plants must be healthy and pest-free</li>
              <li>Label your plants with name and care instructions</li>
              <li>Maximum 5 plants per person</li>
              <li>No invasive species allowed</li>
              <li>Plants should be well-established in their pots</li>
            </ul>
          </div>
        </div>

        <div className="event-sidebar">
          <div className="registration-card">
            <h3>Register for Plant Swap</h3>
            <button className="register-button">
              Register Now
            </button>
            <p className="spots-left">Only 10 spots left!</p>
          </div>

          <div className="preparation-tips">
            <h3>Preparation Tips</h3>
            <ul>
              <li>Clean and inspect your plants thoroughly</li>
              <li>Prepare plant care cards</li>
              <li>Bring a box or tray for transport</li>
              <li>Take photos of your plants for reference</li>
              <li>Consider bringing plant cuttings</li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
} 