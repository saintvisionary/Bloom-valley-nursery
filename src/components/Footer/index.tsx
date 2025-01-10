'use client'

import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import './styles.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-sections">
          <div className="footer-section">
            <h3>Shop</h3>
            <ul>
              <li><Link href="/products/trees">Trees</Link></li>
              <li><Link href="/products/plants">Plants</Link></li>
              <li><Link href="/products/accessories">Garden Accessories</Link></li>
              <li><Link href="/products/soil">Soil & Fertilizers</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><Link href="/help">Help Center</Link></li>
              <li><Link href="/shipping">Shipping Information</Link></li>
              <li><Link href="/returns">Returns & Exchanges</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/sustainability">Sustainability</Link></li>
              <li><Link href="/wholesale">Wholesale</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Stay Connected</h3>
            <div className="newsletter">
              <p>Subscribe for gardening tips and exclusive offers</p>
              <form onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Your email address"
                  aria-label="Email for newsletter"
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Bloom Valley Nursery. All rights reserved.</p>
          <div className="footer-links">
            <Link href="/privacy">Privacy Policy</Link>
            <span className="divider">•</span>
            <Link href="/terms">Terms of Service</Link>
            <span className="divider">•</span>
            <Link href="/accessibility">Accessibility</Link>
          </div>
          <p className="built-by">Built By Tyler J. Bynum</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 