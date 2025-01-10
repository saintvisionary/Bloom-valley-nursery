'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import { FaUser, FaKey, FaCreditCard, FaTag, FaGem, FaBox, FaCheck } from 'react-icons/fa'
import './styles.css'
import Link from 'next/link'

interface FormErrors {
  [key: string]: string
}

const PersonalPage = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    realName: 'John Doe',
    phone: '',
    email: 'john.doe@example.com',
    address: '123 Garden Street, Green City',
    website: '',
    twitter: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: FormErrors = {}
    
    if (!formData.displayName) {
      newErrors.displayName = 'Display name is required'
    }
    
    if (!formData.realName) {
      newErrors.realName = 'Real name is required'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (formData.phone && !/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    if (!formData.address) {
      newErrors.address = 'Address is required'
    }
    
    if (formData.website && !/^https?:\/\/\S+$/.test(formData.website)) {
      newErrors.website = 'Please enter a valid URL'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitSuccess(true)
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClearAll = () => {
    setFormData({
      displayName: '',
      realName: '',
      phone: '',
      email: '',
      address: '',
      website: '',
      twitter: ''
    })
    setErrors({})
  }

  const handleVerifyAccount = async () => {
    if (!formData.twitter) {
      setErrors(prev => ({
        ...prev,
        twitter: 'Please enter your Twitter handle'
      }))
      return
    }
    
    // Simulate verification process
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Verification email sent!')
    } catch (error) {
      console.error('Error verifying account:', error)
    }
  }

  return (
    <div className="personal-page">
      <div className="personal-container">
        {/* Left Column - Navigation Menu */}
        <div className="nav-menu-container">
          <div className="nav-header">
            <FaUser className="nav-icon" />
            <h2>Personal info</h2>
          </div>
          <nav className="settings-nav">
            <Link href="/personal" className="nav-item active">
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
            <Link href="/personal/orders" className="nav-item">
              <FaBox className="nav-icon" />
              <span>My orders</span>
            </Link>
          </nav>
        </div>

        {/* Right Column - Personal Information Form */}
        <div className="form-container">
          <div className="form-header">
            <h2>Personal info</h2>
            <button className="view-profile-btn">
              <FaUser className="btn-icon" />
              View profile
            </button>
          </div>

          <form onSubmit={handleUpdateProfile}>
            <div className="form-section">
              <h3>Account info</h3>
              <div className="form-group">
                <label>DISPLAY NAME</label>
                <input
                  type="text"
                  name="displayName"
                  placeholder="Enter your display name"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className={errors.displayName ? 'error' : ''}
                />
                {errors.displayName && <span className="error-message">{errors.displayName}</span>}
              </div>
              <div className="form-group">
                <label>REAL NAME</label>
                <input
                  type="text"
                  name="realName"
                  value={formData.realName}
                  onChange={handleInputChange}
                  className={errors.realName ? 'error' : ''}
                />
                {errors.realName && <span className="error-message">{errors.realName}</span>}
              </div>
              <div className="form-group">
                <label>PHONE</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label>EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>

            <div className="form-section">
              <h3>YOUR ADDRESS</h3>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>
            </div>

            <div className="form-section">
              <h3>Social</h3>
              <div className="form-group">
                <label>WEBSITE</label>
                <input
                  type="url"
                  name="website"
                  placeholder="Your site URL"
                  value={formData.website}
                  onChange={handleInputChange}
                  className={errors.website ? 'error' : ''}
                />
                {errors.website && <span className="error-message">{errors.website}</span>}
              </div>
              <div className="form-group">
                <label>TWITTER</label>
                <div className="twitter-input">
                  <span className="at-symbol">@</span>
                  <input
                    type="text"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    className={errors.twitter ? 'error' : ''}
                  />
                  <button
                    type="button"
                    className="verify-btn"
                    onClick={handleVerifyAccount}
                    disabled={!formData.twitter}
                  >
                    Verify account
                  </button>
                </div>
                {errors.twitter && <span className="error-message">{errors.twitter}</span>}
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className={`update-btn ${isSubmitting ? 'loading' : ''} ${submitSuccess ? 'success' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : submitSuccess ? (
                  <>
                    <FaCheck className="btn-icon" />
                    Updated!
                  </>
                ) : 'Update profile'}
              </button>
              <button
                type="button"
                className="clear-btn"
                onClick={handleClearAll}
              >
                Clear all
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PersonalPage 