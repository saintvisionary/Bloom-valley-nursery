import Image from 'next/image'
import './styles.css'

const ProductBanner = () => {
  return (
    <section className="product-banner">
      <div className="banner-content">
        <div className="banner-text">
          <h1>Premium All-Purpose Potting Soil</h1>
          <p>The perfect foundation for all your plants to thrive. Enriched with organic matter and essential nutrients.</p>
        </div>
        <div className="banner-image">
          <Image
            src="/PottingSoil.png"
            alt="Premium Potting Soil"
            width={500}
            height={300}
            priority
          />
        </div>
      </div>
      <div className="banner-dots">
        {[...Array(3)].map((_, i) => (
          <button
            key={i}
            className={`dot ${i === 0 ? 'active' : ''}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default ProductBanner 