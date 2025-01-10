'use client'

import { useState } from 'react'
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import Footer from '@/components/Footer'
import './styles.css'
import Image from 'next/image'

const CartPage = () => {
  const router = useRouter()
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(itemId, newQuantity)
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
    router.push('/checkout')
  }

  return (
    <div className="cart-page">
      <main className="cart-content">
        <h1>Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button 
              className="continue-shopping"
              onClick={() => router.push('/products')}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <Image 
                      src={item.imageUrl}
                      alt={item.name}
                      width={100}
                      height={100}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">${item.price}</p>
                  </div>

                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button 
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <button 
                className="checkout-button"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default CartPage 