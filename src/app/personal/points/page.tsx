'use client'

import React, { useState } from 'react'
import { FaUser, FaKey, FaCreditCard, FaTag, FaGem, FaBox, FaGift, FaHistory, FaExchangeAlt } from 'react-icons/fa'
import Link from 'next/link'
import '../styles.css'
import './styles.css'
import Image from 'next/image'

interface Reward {
  id: string
  name: string
  pointsCost: number
  description: string
  imageUrl: string
}

interface PointHistory {
  id: string
  date: string
  points: number
  type: 'earned' | 'redeemed'
  description: string
}

const PointsPage = () => {
  const [totalPoints] = useState(1250)
  const [rewards] = useState<Reward[]>([
    {
      id: '1',
      name: 'Garden Tool Set',
      pointsCost: 1000,
      description: 'Premium 3-piece garden tool set',
      imageUrl: '/rewards/garden-tools.jpg'
    },
    {
      id: '2',
      name: '$20 Store Credit',
      pointsCost: 800,
      description: 'Store credit for your next purchase',
      imageUrl: '/rewards/store-credit.jpg'
    },
    {
      id: '3',
      name: 'Plant Care Kit',
      pointsCost: 500,
      description: 'Essential plant care supplies',
      imageUrl: '/rewards/plant-care.jpg'
    }
  ])

  const [history] = useState<PointHistory[]>([
    {
      id: '1',
      date: '2024-01-15',
      points: 250,
      type: 'earned',
      description: 'Purchase: Garden Tools'
    },
    {
      id: '2',
      date: '2024-01-10',
      points: 500,
      type: 'redeemed',
      description: 'Redeemed: Store Credit'
    },
    {
      id: '3',
      date: '2024-01-05',
      points: 1500,
      type: 'earned',
      description: 'Purchase: Spring Collection'
    }
  ])

  const handleRedeemPoints = (reward: Reward) => {
    if (totalPoints >= reward.pointsCost) {
      alert(`Successfully redeemed ${reward.name}!`)
    } else {
      alert('Not enough points to redeem this reward.')
    }
  }

  return (
    <div className="personal-page">
      <div className="personal-container">
        {/* Left Column - Navigation Menu */}
        <div className="nav-menu-container">
          <div className="nav-header">
            <FaGem className="nav-icon" />
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
            <Link href="/personal/vouchers" className="nav-item">
              <FaTag className="nav-icon" />
              <span>My voucher</span>
            </Link>
            <Link href="/personal/points" className="nav-item active">
              <FaGem className="nav-icon" />
              <span>My points</span>
            </Link>
            <Link href="#" className="nav-item">
              <FaBox className="nav-icon" />
              <span>My orders</span>
            </Link>
          </nav>
        </div>

        {/* Right Column - Points */}
        <div className="form-container">
          <div className="form-header">
            <h2>My points</h2>
          </div>

          <div className="points-sections">
            {/* Points Overview */}
            <div className="form-section points-overview">
              <div className="points-card">
                <div className="points-value">
                  <FaGem className="points-icon" />
                  <h2>{totalPoints}</h2>
                </div>
                <p>Available Points</p>
              </div>
            </div>

            {/* Available Rewards */}
            <div className="form-section">
              <div className="section-header">
                <h3>Available Rewards</h3>
                <FaGift className="section-icon" />
              </div>
              
              <div className="rewards-grid">
                {rewards.map(reward => (
                  <div key={reward.id} className="reward-card">
                    <div className="reward-image">
                      {reward.id === '1' ? (
                        <Image 
                          src="/rewards/GardenToolSet.png" 
                          alt="Garden Tool Set"
                          width={160}
                          height={160}
                          className="reward-img"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : reward.id === '2' ? (
                        <Image 
                          src="/rewards/Bloomvalleygiftcard.png" 
                          alt="$20 Store Credit"
                          width={160}
                          height={160}
                          className="reward-img"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : reward.id === '3' ? (
                        <Image 
                          src="/rewards/PlantCareKit.png" 
                          alt="Plant Care Kit"
                          width={160}
                          height={160}
                          className="reward-img"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <FaGift className="placeholder-icon" />
                      )}
                    </div>
                    <div className="reward-content">
                      <h4>{reward.name}</h4>
                      <p className="reward-description">{reward.description}</p>
                      <div className="reward-footer">
                        <span className="points-cost">
                          <FaGem className="gem-icon" /> {reward.pointsCost}
                        </span>
                        <button
                          className={`redeem-btn ${totalPoints >= reward.pointsCost ? '' : 'disabled'}`}
                          onClick={() => handleRedeemPoints(reward)}
                          disabled={totalPoints < reward.pointsCost}
                        >
                          <FaExchangeAlt className="exchange-icon" />
                          Redeem
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Points History */}
            <div className="form-section">
              <div className="section-header">
                <h3>Points History</h3>
                <FaHistory className="section-icon" />
              </div>
              
              <div className="history-list">
                {history.map(item => (
                  <div key={item.id} className="history-item">
                    <div className="history-date">
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                    <div className="history-details">
                      <p className="history-description">{item.description}</p>
                      <span className={`points-change ${item.type}`}>
                        {item.type === 'earned' ? '+' : '-'}{item.points}
                      </span>
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

export default PointsPage 