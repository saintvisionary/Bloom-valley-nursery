'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaUsers, FaLeaf, FaSeedling, FaStar } from 'react-icons/fa';
import Footer from '@/components/Footer';
import './styles.css';

export default function GardenWorkshopPage() {
  return (
    <div className="event-page">
      <div className="event-header">
        <div className="header-image">
          <Image
            src="/community/Garden Workshop.png"
            alt="Garden Workshop"
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
                  <span className="title-prefix">Monthly</span>
                  <span className="title-main">Garden</span>
                  <span className="title-main">Workshop</span>
                </h1>
              </div>
              <div className="header-description">
                <div>Join us for</div>
                <div>an immersive</div>
                <div>hands-on experience</div>
                <div>in sustainable gardening</div>
              </div>
            </div>
          </div>
          <div className="event-meta">
            <div className="meta-item">
              <div className="meta-label">Date</div>
              <div className="meta-value">June 15, 2024</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Time</div>
              <div className="meta-value">10:00 AM - 12:00 PM</div>
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
          <h2>Join Our Monthly Garden Workshop</h2>
          <p>
            Learn essential gardening skills and techniques from our expert
            horticulturists in this hands-on workshop. Whether you&apos;re a beginner or
            an experienced gardener, you&apos;ll discover new ways to make your garden
            thrive.
          </p>

          <div className="workshop-features">
            <div className="feature">
              <FaUsers className="feature-icon" />
              <div>
                <h4>Expert Guidance</h4>
                <p>Learn from professional horticulturists with years of experience</p>
              </div>
            </div>
            <div className="feature">
              <FaLeaf className="feature-icon" />
              <div>
                <h4>Hands-on Experience</h4>
                <p>Practice techniques in our dedicated workshop garden</p>
              </div>
            </div>
            <div className="feature">
              <FaSeedling className="feature-icon" />
              <div>
                <h4>Take-Home Plants</h4>
                <p>Start your garden with plants from the workshop</p>
              </div>
            </div>
            <div className="feature">
              <FaStar className="feature-icon" />
              <div>
                <h4>Exclusive Resources</h4>
                <p>Receive detailed handouts and ongoing support</p>
              </div>
            </div>
          </div>

          <div className="workshop-highlights">
            <h3>Workshop Highlights</h3>
            <p>
              Each month focuses on different aspects of gardening, from soil
              preparation and planting techniques to pest control and seasonal
              maintenance. You&apos;ll get practical experience and take home valuable
              knowledge to apply in your own garden.
            </p>
          </div>

          <div className="what-to-expect">
            <h3>What to Expect</h3>
            <ul>
              <li>Expert guidance from professional horticulturists</li>
              <li>Hands-on experience with various gardening techniques</li>
              <li>Tips for sustainable and eco-friendly gardening</li>
              <li>Interactive Q&A sessions</li>
              <li>Take-home materials and handouts</li>
              <li>Refreshments provided</li>
            </ul>
          </div>

          <div className="upcoming-schedule">
            <h3>Upcoming Workshop Schedule</h3>
            <div className="schedule-grid">
              <div className="schedule-item">
                <div className="schedule-date">June 15</div>
                <h4>Summer Planting Techniques</h4>
                <p>Learn the best practices for summer planting and heat management</p>
                <ul className="schedule-topics">
                  <li>Heat-resistant plants</li>
                  <li>Watering techniques</li>
                  <li>Soil preparation</li>
                </ul>
              </div>
              <div className="schedule-item">
                <div className="schedule-date">July 20</div>
                <h4>Natural Pest Control</h4>
                <p>Discover organic methods to protect your garden</p>
                <ul className="schedule-topics">
                  <li>Companion planting</li>
                  <li>Natural deterrents</li>
                  <li>Beneficial insects</li>
                </ul>
              </div>
              <div className="schedule-item">
                <div className="schedule-date">August 17</div>
                <h4>Garden Maintenance</h4>
                <p>Master the essentials of garden care and maintenance</p>
                <ul className="schedule-topics">
                  <li>Pruning techniques</li>
                  <li>Fertilization</li>
                  <li>Disease prevention</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="testimonials">
            <h3>What Participants Say</h3>
            <div className="testimonials-grid">
              <div className="testimonial">
                <p>&quot;The hands-on experience was invaluable. I learned so much more than I expected!&quot;</p>
                <div className="testimonial-author">- Sarah M.</div>
              </div>
              <div className="testimonial">
                <p>&quot;Expert instructors and well-organized sessions. Highly recommend for any gardening enthusiast.&quot;</p>
                <div className="testimonial-author">- Michael R.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="event-sidebar">
          <div className="registration-card">
            <h3>Register for Workshop</h3>
            <div className="price">$45</div>
            <p className="includes">
              Includes all materials, plants, and refreshments
            </p>
            <ul className="workshop-perks">
              <li>✓ Expert instruction</li>
              <li>✓ Hands-on practice</li>
              <li>✓ Take-home plants</li>
              <li>✓ Workshop materials</li>
              <li>✓ Refreshments</li>
            </ul>
            <button className="register-button">
              Register Now
            </button>
            <p className="spots-left">Only 5 spots left!</p>
          </div>

          <div className="bring-along">
            <h3>What to Bring</h3>
            <ul>
              <li>Gardening gloves</li>
              <li>Comfortable clothes</li>
              <li>Water bottle</li>
              <li>Notebook and pen</li>
              <li>Camera (optional)</li>
            </ul>
          </div>

          <div className="location-info">
            <h3>Location</h3>
            <p className="location-address">
              Bloom Valley Nursery Garden Center<br />
              123 Garden Street<br />
              Workshop Area B
            </p>
            <p className="location-note">
              Free parking available on-site
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
} 