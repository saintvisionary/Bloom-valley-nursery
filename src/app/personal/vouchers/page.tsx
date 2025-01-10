'use client'

import React, { useState } from 'react'
import { FaUser, FaKey, FaCreditCard, FaTag, FaGem, FaBox, FaCopy, FaCheck, FaGift } from 'react-icons/fa'
import Link from 'next/link'
import '../styles.css'
import './styles.css'

interface Voucher {
  id: string
  code: string
  discount: number
  expiryDate: string
  isUsed: boolean
  minSpend?: number
  description: string
}

const VouchersPage = () => {
  const [vouchers] = useState<Voucher[]>([
    {
      id: '1',
      code: 'SPRING2024',
      discount: 20,
      expiryDate: '2024-03-31',
      isUsed: false,
      minSpend: 100,
      description: '20% off on all garden tools'
    },
    {
      id: '2',
      code: 'PLANTS15',
      discount: 15,
      expiryDate: '2024-02-28',
      isUsed: false,
      description: '15% off on all plants'
    },
    {
      id: '3',
      code: 'WELCOME10',
      discount: 10,
      expiryDate: '2024-12-31',
      isUsed: true,
      description: '10% off your first purchase'
    }
  ])

  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const isExpired = (date: string) => {
    return new Date(date) < new Date()
  }

  return (
    <div className="personal-page">
      <div className="personal-container">
        {/* Left Column - Navigation Menu */}
        <div className="nav-menu-container">
          <div className="nav-header">
            <FaTag className="nav-icon" />
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
            <Link href="/personal/payments" className="nav-item">
              <FaCreditCard className="nav-icon" />
              <span>My payments</span>
            </Link>
            <Link href="/personal/vouchers" className="nav-item active">
              <FaTag className="nav-icon" />
              <span>My voucher</span>
            </Link>
            <Link href="/personal/points" className="nav-item">
              <FaGem className="nav-icon" />
              <span>My points</span>
            </Link>
            <Link href="#" className="nav-item">
              <FaBox className="nav-icon" />
              <span>My orders</span>
            </Link>
          </nav>
        </div>

        {/* Right Column - Vouchers */}
        <div className="form-container">
          <div className="form-header">
            <h2>My vouchers</h2>
          </div>

          <div className="vouchers-sections">
            {/* Active Vouchers */}
            <div className="form-section">
              <div className="section-header">
                <h3>Available vouchers</h3>
                <FaGift className="gift-icon" />
              </div>
              
              <div className="vouchers-list">
                {vouchers
                  .filter(v => !v.isUsed && !isExpired(v.expiryDate))
                  .map(voucher => (
                    <div key={voucher.id} className="voucher-card">
                      <div className="voucher-content">
                        <div className="voucher-header">
                          <span className="discount-badge">
                            {voucher.discount}% OFF
                          </span>
                          <span className="expiry-date">
                            Expires: {new Date(voucher.expiryDate).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="voucher-details">
                          <p className="voucher-description">{voucher.description}</p>
                          {voucher.minSpend && (
                            <p className="min-spend">
                              Min. spend: ${voucher.minSpend}
                            </p>
                          )}
                        </div>

                        <div className="voucher-code">
                          <code>{voucher.code}</code>
                          <button
                            className="copy-btn"
                            onClick={() => handleCopyCode(voucher.code)}
                          >
                            {copiedCode === voucher.code ? (
                              <FaCheck className="copy-icon" />
                            ) : (
                              <FaCopy className="copy-icon" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Used/Expired Vouchers */}
            <div className="form-section">
              <div className="section-header">
                <h3>Used & expired vouchers</h3>
              </div>
              
              <div className="vouchers-list inactive">
                {vouchers
                  .filter(v => v.isUsed || isExpired(v.expiryDate))
                  .map(voucher => (
                    <div key={voucher.id} className="voucher-card inactive">
                      <div className="voucher-content">
                        <div className="voucher-header">
                          <span className="discount-badge">
                            {voucher.discount}% OFF
                          </span>
                          <span className="status-badge">
                            {voucher.isUsed ? 'Used' : 'Expired'}
                          </span>
                        </div>
                        
                        <div className="voucher-details">
                          <p className="voucher-description">{voucher.description}</p>
                          {voucher.minSpend && (
                            <p className="min-spend">
                              Min. spend: ${voucher.minSpend}
                            </p>
                          )}
                        </div>

                        <div className="voucher-code inactive">
                          <code>{voucher.code}</code>
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

export default VouchersPage 