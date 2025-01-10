import Link from 'next/link'
import Image from 'next/image'
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3 className="company-name">Evergreen Nursery</h3>
          <div className="contact-info">
            <h4>Contact Us</h4>
            <p>EvergreenNursery@gmail.com</p>
            <p>+1-2345-6789</p>
            <p>123 Ave, New York, USA</p>
          </div>
          <div className="social-icons">
            <Link href="#" className="social-icon">
              <FaFacebook />
            </Link>
            <Link href="#" className="social-icon">
              <FaLinkedin />
            </Link>
            <Link href="#" className="social-icon">
              <FaTwitter />
            </Link>
            <Link href="#" className="social-icon">
              <FaInstagram />
            </Link>
          </div>
        </div>

        <div className="footer-column">
          <h4>Products</h4>
          <ul className="footer-links">
            <li><Link href="/products/maple-tree">Maple Tree</Link></li>
            <li><Link href="/products/potting-soil">Potting Soil</Link></li>
            <li><Link href="/products/spider-plant">Spider Plant</Link></li>
            <li><Link href="/products/apple-tree">Apple Tree</Link></li>
            <li><Link href="/products/bird-house">Bird House</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>About</h4>
          <ul className="footer-links">
            <li><Link href="/about/team">Meet the Team</Link></li>
            <li><Link href="/community">Community</Link></li>
            <li><Link href="/locations">Locations</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Get the App</h4>
          <div className="app-buttons">
            <Link href="#" className="app-button">
              <Image
                src="/app-store.svg"
                alt="Download on the App Store"
                width={140}
                height={42}
                priority
              />
            </Link>
            <Link href="#" className="app-button">
              <Image
                src="/google-play.svg"
                alt="Get it on Google Play"
                width={140}
                height={42}
                priority
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <select className="language-selector" defaultValue="en">
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
        <p className="copyright">Copyright © 2024. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer 