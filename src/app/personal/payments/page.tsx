'use client'

import React, { useState } from 'react'
import { FaUser, FaKey, FaCreditCard, FaTag, FaGem, FaBox, FaPlus, FaTrash, FaHistory } from 'react-icons/fa'
import Link from 'next/link'
import '../styles.css'
import './styles.css'

interface PaymentMethod {
  id: string
  type: string
  last4: string
  expiry: string
}

interface Transaction {
  id: string
  date: string
  amount: number
  description: string
  status: 'completed' | 'pending' | 'failed'
}

const PaymentsPage = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'Visa',
      last4: '4242',
      expiry: '12/24'
    },
    {
      id: '2',
      type: 'Mastercard',
      last4: '8888',
      expiry: '06/25'
    }
  ])

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-02-20',
      amount: 129.99,
      description: 'Garden Tools Set',
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-02-15',
      amount: 49.99,
      description: 'Premium Plant Food',
      status: 'completed'
    },
    {
      id: '3',
      date: '2024-02-10',
      amount: 89.99,
      description: 'Decorative Planter',
      status: 'pending'
    }
  ])

  const handleDeleteCard = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id))
  }

  const handleAddCard = () => {
    // In a real application, this would open a secure payment form
    alert('This would open a secure payment form to add a new card')
  }

  return (
    <div className="personal-page">
      <div className="personal-container">
        {/* Left Column - Navigation Menu */}
        <div className="nav-menu-container">
          <div className="nav-header">
            <FaCreditCard className="nav-icon" />
            <h2>Settings</h2>
          </div>
          <nav className="settings-nav">
            <Link href="/personal" className="nav-item">
              <FaUser className="nav-icon" />
              <span>Personal info</span>
            </Link>
            <Link href="/personal/login-security" className="nav-item">
              <FaKey className="nav-icon" />
              <span>Login and security</span>
            </Link>
            <Link href="/personal/payments" className="nav-item active">
              <FaCreditCard className="nav-icon" />
              <span>My payments</span>
            </Link>
            <Link href="#" className="nav-item">
              <FaTag className="nav-icon" />
              <span>My voucher</span>
            </Link>
            <Link href="#" className="nav-item">
              <FaGem className="nav-icon" />
              <span>My points</span>
            </Link>
            <Link href="#" className="nav-item">
              <FaBox className="nav-icon" />
              <span>My orders</span>
            </Link>
          </nav>
        </div>

        {/* Right Column - Payment Methods and History */}
        <div className="form-container">
          <div className="form-header">
            <h2>My payments</h2>
          </div>

          <div className="payments-sections">
            {/* Payment Methods Section */}
            <div className="form-section">
              <div className="section-header">
                <h3>Payment methods</h3>
                <button className="add-card-btn" onClick={handleAddCard}>
                  <FaPlus className="btn-icon" />
                  Add new card
                </button>
              </div>
              
              <div className="payment-methods">
                {paymentMethods.map(method => (
                  <div key={method.id} className="payment-card">
                    <div className="card-info">
                      <FaCreditCard className="card-icon" />
                      <div className="card-details">
                        <span className="card-type">{method.type}</span>
                        <span className="card-number">•••• {method.last4}</span>
                        <span className="card-expiry">Expires {method.expiry}</span>
                      </div>
                    </div>
                    <button
                      className="delete-card-btn"
                      onClick={() => handleDeleteCard(method.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction History Section */}
            <div className="form-section">
              <div className="section-header">
                <h3>Transaction history</h3>
                <FaHistory className="history-icon" />
              </div>
              
              <div className="transactions">
                {transactions.map(transaction => (
                  <div key={transaction.id} className="transaction-item">
                    <div className="transaction-info">
                      <div className="transaction-main">
                        <span className="transaction-description">
                          {transaction.description}
                        </span>
                        <span className="transaction-amount">
                          ${transaction.amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="transaction-details">
                        <span className="transaction-date">
                          {new Date(transaction.date).toLocaleDateString()}
                        </span>
                        <span className={`transaction-status ${transaction.status}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentsPage 