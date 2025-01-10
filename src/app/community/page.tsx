'use client'

import { FaUsers, FaComments, FaLeaf, FaCalendarAlt } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import './styles.css'

export default function CommunityPage() {
  return (
    <div className="community-page">
      <header className="community-header">
        <div className="header-content">
          <h1>Join Our Growing Community</h1>
          <p>Connect with fellow garden enthusiasts, share experiences, and grow together</p>
        </div>
      </header>

      <main className="community-content">
        <section className="features-grid">
          <div className="feature-card">
            <FaUsers className="feature-icon" />
            <h2>Garden Groups</h2>
            <p>Join local gardening groups and connect with fellow enthusiasts in your area</p>
            <button className="feature-button">Browse Groups</button>
          </div>

          <div className="feature-card">
            <FaComments className="feature-icon" />
            <h2>Discussion Forums</h2>
            <p>Share tips, ask questions, and participate in discussions about all things gardening</p>
            <button className="feature-button">Join Discussions</button>
          </div>

          <div className="feature-card">
            <FaLeaf className="feature-icon" />
            <h2>Plant Exchange</h2>
            <p>Trade plants, seeds, and cuttings with other community members</p>
            <button className="feature-button">Start Trading</button>
          </div>

          <div className="feature-card">
            <FaCalendarAlt className="feature-icon" />
            <h2>Events</h2>
            <p>Discover workshops, meetups, and gardening events in your community</p>
            <button className="feature-button">View Events</button>
          </div>
        </section>

        <section className="community-highlights">
          <h2>Community Highlights</h2>
          <div className="highlights-grid">
            <Link href="/community/garden-workshop" className="highlight-card">
              <div className="highlight-image">
                <Image 
                  src="/community/garden-workshop.png"
                  alt="Garden Workshop"
                  width={600}
                  height={400}
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
              <div className="highlight-content">
                <h3>Monthly Garden Workshop</h3>
                <p>Join us for hands-on learning experiences with expert gardeners</p>
              </div>
            </Link>

            <Link href="/community/plant-swap" className="highlight-card">
              <div className="highlight-image">
                <Image 
                  src="/community/plant-swap-event.png"
                  alt="Plant Swap Event"
                  width={600}
                  height={400}
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
              <div className="highlight-content">
                <h3>Seasonal Plant Swap</h3>
                <p>Exchange plants and stories with fellow garden enthusiasts</p>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 