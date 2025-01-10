import Image from 'next/image'
import { useState } from 'react'

interface CustomImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  style?: React.CSSProperties
}

const CustomImage = ({ src, alt, width, height, priority = false, className = '', style = {} }: CustomImageProps) => {
  const [isError, setIsError] = useState(false)

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={`${className} ${isError ? 'image-error' : ''}`}
      style={{
        ...style,
        backgroundColor: isError ? '#f3f4f6' : 'transparent',
      }}
      onError={() => setIsError(true)}
    />
  )
}

export default CustomImage 