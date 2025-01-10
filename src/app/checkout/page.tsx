'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import './styles.css'
import Image from 'next/image'

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items: cart, clearCart } = useCart()
  const [loading, setLoading] = useState(false)

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Store order details in session storage
      const orderDetails = {
        items: cart,
        timestamp: new Date().toISOString(),
      }
      sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails))

      // Clear the cart
      clearCart()

      // Redirect to confirmation page
      router.push('/confirmation')
    } catch (error) {
      console.error('Payment failed:', error)
      setLoading(false)
    }
  }

  const subtotal = cart.reduce((sum: number, item: CartItem) => 
    sum + item.price * item.quantity, 0
  )
  const shipping = 9.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  return (
    <div className="checkout-page">
      <div className="checkout-content">
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="cart-items">
            {cart.map((item: CartItem) => (
              <div key={item.id} className="cart-item">
                <Image 
                  src={item.imageUrl} 
                  alt={item.name}
                  width={80}
                  height={80}
                  className="cart-item-image"
                />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="quantity">Quantity: {item.quantity}</p>
                  <p className="price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="price-breakdown">
            <div className="price-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="price-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="payment-section">
          <h2>Payment Details</h2>
          <form onSubmit={handlePayment}>
            <div className="form-group">
              <label htmlFor="cardName">Name on Card</label>
              <input
                type="text"
                id="cardName"
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                required
                pattern="[0-9\s]{13,19}"
                maxLength={19}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiry">Expiry Date</label>
                <input
                  type="text"
                  id="expiry"
                  placeholder="MM/YY"
                  required
                  pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                  maxLength={5}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  placeholder="123"
                  required
                  pattern="[0-9]{3,4}"
                  maxLength={4}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={`confirm-button ${loading ? 'loading' : ''}`}
              disabled={loading || cart.length === 0}
            >
              {loading ? 'Processing...' : 'Confirm and Pay'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 