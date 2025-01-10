import { FaStar, FaRegStar, FaUser } from 'react-icons/fa'
import './TestimonialCard.css'

interface TestimonialCardProps {
  quote: string
  name: string
  affiliation: string
  rating: number
}

const TestimonialCard = ({ quote, name, affiliation, rating }: TestimonialCardProps) => {
  return (
    <div className="testimonial-card">
      <div className="quote-mark">&ldquo;</div>
      <p className="testimonial-quote">&ldquo;{quote}&rdquo;</p>
      <div className="testimonial-footer">
        <div className="customer-info">
          <div className="customer-icon">
            <FaUser />
          </div>
          <div className="customer-details">
            <h4 className="customer-name">{name}</h4>
            <p className="customer-affiliation">{affiliation}</p>
          </div>
        </div>
        <div className="rating">
          {[...Array(5)].map((_, index) => (
            index < rating ? (
              <FaStar key={index} className="star filled" />
            ) : (
              <FaRegStar key={index} className="star" />
            )
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard 