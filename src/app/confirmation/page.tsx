'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaCheckCircle, FaHome, FaBoxOpen } from 'react-icons/fa'
import Link from 'next/link'
import './styles.css'

export default function ConfirmationPage() {
  const router = useRouter()

  // Redirect to home if accessed directly without checkout
  useEffect(() => {
    const hasOrderDetails = sessionStorage.getItem('orderDetails')
    if (!hasOrderDetails) {
      router.push('/')
    }
  }, [router])

  const orderNumber = Math.floor(Math.random() * 900000) + 100000 // 6-digit order number

  return (
    <div className="confirmation-page">
      <div className="confirmation-content">
        <div className="success-icon">
          <FaCheckCircle />
        </div>
        
        <h1>Thank You for Your Order!</h1>
        <p className="order-number">Order #{orderNumber}</p>
        
        <div className="confirmation-message">
          <p>Your order has been successfully placed. You will receive a confirmation email shortly with your order details.</p>
        </div>

        <div className="order-info">
          <h2>Estimated Delivery</h2>
          <p>Your items will be delivered within 3-5 business days.</p>
          
          <div className="shipping-note">
            <p>We&apos;ll send you shipping confirmation and tracking information when your order ships.</p>
          </div>
        </div>

        <div className="action-buttons">
          <Link href="/" className="home-button">
            <FaHome />
            Return to Home
          </Link>
          <Link href="/products" className="shop-button">
            <FaBoxOpen />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
} 