'use client'

import React, { useState } from 'react'
import { FaUser, FaKey, FaCreditCard, FaTag, FaGem, FaBox, FaSearch, FaFilter } from 'react-icons/fa'
import Link from 'next/link'
import '../styles.css'
import './styles.css'
import Image from 'next/image'

interface Order {
  id: string;
  date: string;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
  }[];
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  trackingNumber?: string;
}

const OrdersPage = () => {
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-2024-001',
      date: '2024-02-20',
      items: [
        {
          id: 1,
          name: 'Maple Tree',
          quantity: 1,
          price: 149.99,
          imageUrl: '/trees/MapleTree.png'
        },
        {
          id: 2,
          name: 'Garden Tool Set',
          quantity: 1,
          price: 49.99,
          imageUrl: '/rewards/GardenToolSet.png'
        }
      ],
      status: 'delivered',
      total: 199.98,
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-02-15',
      items: [
        {
          id: 3,
          name: 'Aloe Plant',
          quantity: 2,
          price: 24.99,
          imageUrl: '/plants/AloePlant.png'
        }
      ],
      status: 'shipped',
      total: 49.98,
      trackingNumber: 'TRK987654321'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-02-10',
      items: [
        {
          id: 4,
          name: 'Blue Watering Can',
          quantity: 1,
          price: 34.99,
          imageUrl: '/WateringCan.png'
        },
        {
          id: 5,
          name: 'Blue Birdhouse',
          quantity: 1,
          price: 29.99,
          imageUrl: '/BirdHouse.png'
        }
      ],
      status: 'processing',
      total: 64.98
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.items.some(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || order.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'status-processing'
      case 'shipped':
        return 'status-shipped'
      case 'delivered':
        return 'status-delivered'
      case 'cancelled':
        return 'status-cancelled'
      default:
        return ''
    }
  }

  return (
    <div className="personal-page">
      <div className="personal-container">
        {/* Left Column - Navigation Menu */}
        <div className="nav-menu-container">
          <div className="nav-header">
            <FaBox className="nav-icon" />
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
            <Link href="/personal/points" className="nav-item">
              <FaGem className="nav-icon" />
              <span>My points</span>
            </Link>
            <Link href="/personal/orders" className="nav-item active">
              <FaBox className="nav-icon" />
              <span>My orders</span>
            </Link>
          </nav>
        </div>

        {/* Right Column - Orders */}
        <div className="form-container">
          <div className="form-header">
            <h2>My orders</h2>
          </div>

          <div className="orders-sections">
            {/* Search and Filter Section */}
            <div className="search-filter-section">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="filter-box">
                <FaFilter className="filter-icon" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Orders</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders List */}
            <div className="orders-list">
              {filteredOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3>Order {order.id}</h3>
                      <span className="order-date">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="order-status">
                      <span className={`status-badge ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="order-items">
                    {order.items.map(item => (
                      <div key={item.id} className="order-item">
                        <div className="item-image">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={80}
                            height={80}
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div className="item-details">
                          <h4>{item.name}</h4>
                          <p className="item-quantity">Quantity: {item.quantity}</p>
                          <p className="item-price">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <div className="order-total">
                      <span>Total:</span>
                      <span className="total-amount">${order.total.toFixed(2)}</span>
                    </div>
                    {order.trackingNumber && (
                      <div className="tracking-info">
                        <span>Tracking Number:</span>
                        <span className="tracking-number">{order.trackingNumber}</span>
                      </div>
                    )}
                    <button className="view-details-btn">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersPage 