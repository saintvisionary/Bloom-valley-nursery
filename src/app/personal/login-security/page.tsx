'use client'

import React, { useState, FormEvent } from 'react'
import { FaUser, FaKey, FaCreditCard, FaTag, FaGem, FaBox, FaEye, FaEyeSlash, FaCheck, FaShieldAlt } from 'react-icons/fa'
import '../styles.css'
import './styles.css'
import Link from 'next/link'

interface FormErrors {
  [key: string]: string
}

const LoginSecurityPage = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const validateForm = () => {
    const newErrors: FormErrors = {}
    
    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required'
    }
    
    if (!newPassword) {
      newErrors.newPassword = 'New password is required'
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, and numbers'
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitSuccess(true)
      setTimeout(() => {
        setSubmitSuccess(false)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      }, 3000)
    } catch (error) {
      console.error('Error updating password:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleTwoFactor = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setTwoFactorEnabled(prev => !prev)
    } catch (error) {
      console.error('Error toggling 2FA:', error)
    }
  }

  return (
    <div className="personal-page">
      <div className="personal-container">
        {/* Left Column - Navigation Menu */}
        <div className="nav-menu-container">
          <div className="nav-header">
            <FaKey className="nav-icon" />
            <h2>Settings</h2>
          </div>
          <nav className="settings-nav">
            <Link href="/personal" className="nav-item">
              <FaUser className="nav-icon" />
              <span>Personal info</span>
            </Link>
            <Link href="/personal/login-security" className="nav-item active">
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
            <Link href="#" className="nav-item">
              <FaBox className="nav-icon" />
              <span>My orders</span>
            </Link>
          </nav>
        </div>

        {/* Right Column - Security Settings */}
        <div className="form-container">
          <div className="form-header">
            <h2>Login and security</h2>
          </div>

          <div className="security-sections">
            {/* Password Change Section */}
            <div className="form-section">
              <h3>Change password</h3>
              <form onSubmit={handlePasswordChange}>
                <div className="form-group">
                  <label>CURRENT PASSWORD</label>
                  <div className="password-input">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className={errors.currentPassword ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.currentPassword && <span className="error-message">{errors.currentPassword}</span>}
                </div>

                <div className="form-group">
                  <label>NEW PASSWORD</label>
                  <div className="password-input">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={errors.newPassword ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
                </div>

                <div className="form-group">
                  <label>CONFIRM NEW PASSWORD</label>
                  <div className="password-input">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={errors.confirmPassword ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

                <div className="password-requirements">
                  <h4>Password requirements:</h4>
                  <ul>
                    <li className={newPassword.length >= 8 ? 'met' : ''}>
                      Minimum 8 characters
                    </li>
                    <li className={/[A-Z]/.test(newPassword) ? 'met' : ''}>
                      At least one uppercase letter
                    </li>
                    <li className={/[a-z]/.test(newPassword) ? 'met' : ''}>
                      At least one lowercase letter
                    </li>
                    <li className={/\d/.test(newPassword) ? 'met' : ''}>
                      At least one number
                    </li>
                  </ul>
                </div>

                <button 
                  type="submit" 
                  className={`update-btn ${isSubmitting ? 'loading' : ''} ${submitSuccess ? 'success' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating...' : submitSuccess ? (
                    <>
                      <FaCheck className="btn-icon" />
                      Password updated!
                    </>
                  ) : 'Update password'}
                </button>
              </form>
            </div>

            {/* Two-Factor Authentication Section */}
            <div className="form-section">
              <h3>Two-factor authentication</h3>
              <div className="two-factor-section">
                <div className="two-factor-info">
                  <FaShieldAlt className="shield-icon" />
                  <div>
                    <h4>Add an extra layer of security</h4>
                    <p>
                      Two-factor authentication adds an additional layer of security to your
                      account by requiring more than just a password to sign in.
                    </p>
                  </div>
                </div>
                <div className="two-factor-toggle">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={twoFactorEnabled}
                      onChange={toggleTwoFactor}
                    />
                    <span className="slider"></span>
                  </label>
                  <span className="toggle-label">
                    {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginSecurityPage 