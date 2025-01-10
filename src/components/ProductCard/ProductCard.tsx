import Image from 'next/image'
import './ProductCard.css'

interface ProductCardProps {
  name: string
  price: number
  description: string
  imageUrl: string
}

const ProductCard = ({ name, price, description, imageUrl }: ProductCardProps) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <Image
          src={imageUrl}
          alt={name}
          width={300}
          height={300}
          className="card-image"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <div className="price-tag">${price}</div>
        <p className="product-description">{description}</p>
        <button className="order-button">
          Order Now
        </button>
      </div>
    </div>
  )
}

export default ProductCard 