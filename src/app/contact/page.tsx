'use client'

import React, { useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import Footer from '@/components/Footer'
import './styles.css'

const topics = [
  'General Inquiry',
  'Plant Care Advice',
  'Product Availability',
  'Bulk Orders',
  'Events & Workshops',
  'Career Opportunities',
  'Feedback & Suggestions'
]

interface FormData {
  topic: string
  name: string
  email: string
  description: string
}

interface FormErrors {
  topic?: string
  name?: string
  email?: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    name: '',
    email: '',
    description: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: FormErrors = {}
    
    if (!formData.topic) {
      newErrors.topic = 'Please select a topic'
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSubmitSuccess(true)
      setFormData({
        topic: '',
        name: '',
        email: '',
        description: ''
      })

      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  return (
    <div className="contact-page">
      <div className="contact-content">
        <div className="contact-form-section">
          <h1>Contact Us</h1>
          <p className="subtitle">
            Reach out to us with any questions or needs, and our Bloom Valley team 
            will be happy to assist you
          </p>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="topic">Topic</label>
              <select
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className={errors.topic ? 'error' : ''}
              >
                <option value="">Select a topic</option>
                {topics.map(topic => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
              {errors.topic && <span className="error-message">{errors.topic}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description (optional)</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description (optional)"
                rows={4}
              />
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'SENDING...' : 'SEND REQUEST'}
            </button>

            {submitSuccess && (
              <div className="success-message">
                Thank you for your message! We&apos;ll get back to you soon.
              </div>
            )}
          </form>
        </div>

        <div className="map-section">
          <div className="map-container">
            <div className="map-roads" />
            <div className="map-marker">
              <FaMapMarkerAlt />
            </div>
          </div>
          
          <div className="location-info">
            <h3>Visit Our Garden Center</h3>
            <p>123 Garden Street<br />Bloom Valley, CA 94123</p>
            <div className="hours">
              <h4>Hours</h4>
              <p>Monday - Saturday: 9:00 AM - 6:00 PM<br />
              Sunday: 10:00 AM - 5:00 PM</p>
            </div>
            <div className="contact-info">
              <h4>Contact</h4>
              <p>Phone: (555) 123-4567<br />
              Email: info@bloomvalley.com</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
} 