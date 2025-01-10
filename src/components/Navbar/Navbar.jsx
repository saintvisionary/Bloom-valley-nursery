'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { useCart } from '@/contexts/CartContext'
import './Navbar.css'

const Navbar = () => {
  const { items } = useCart()
  const cartCount = items.reduce((total, item) => total + item.quantity, 0)

  console.log('Cart count:', cartCount) // Debug log

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <Image
            src="/Client1_Logo.jpg"
            alt="Bloom Valley Nursery Logo"
            width={50}
            height={50}
            className="navbar-logo-image"
          />
          <span className="navbar-logo-text">Bloom Valley Nursery</span>
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link href="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link href="/products" className="nav-link">Products</Link>
          </li>
          <li className="nav-item">
            <Link href="/community" className="nav-link">Community</Link>
          </li>
          <li className="nav-item">
            <Link href="/about" className="nav-link">About</Link>
          </li>
          <li className="nav-item">
            <Link href="/contact" className="nav-link">Contact</Link>
          </li>
        </ul>

        <div className="nav-icons">
          <div className="icon-container">
            <Link href="/cart" className="icon-link">
              <FaShoppingCart className="nav-icon" />
            </Link>
            {cartCount > 0 && (
              <div className="cart-badge">
                {cartCount}
              </div>
            )}
          </div>
          <div className="icon-container">
            <Link href="/personal" className="icon-link">
              <FaUser className="nav-icon" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 