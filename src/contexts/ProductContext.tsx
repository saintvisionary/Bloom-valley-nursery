'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { FilterState } from '@/components/Products/ProductHeader'

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  category: string;
}

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  searchSuggestions: string[];
  handleSearch: (query: string) => void;
  handleFilter: (filters: FilterState) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resetFiltersAndSearch: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Apple Tree",
    price: 89.99,
    rating: 4.5,
    reviews: 128,
    imageUrl: "/trees/AppleTree.png",
    category: "trees"
  },
  {
    id: 2,
    name: "Maple Tree",
    price: 149.99,
    rating: 4.8,
    reviews: 89,
    imageUrl: "/trees/MapleTree.png",
    category: "trees"
  },
  {
    id: 3,
    name: "Birch Tree",
    price: 129.99,
    rating: 4.6,
    reviews: 67,
    imageUrl: "/trees/BirchTree.png",
    category: "trees"
  },
  {
    id: 4,
    name: "Aloe Plant",
    price: 24.99,
    rating: 4.7,
    reviews: 156,
    imageUrl: "/plants/AloePlant.png",
    category: "plants"
  },
  {
    id: 5,
    name: "Blue Birdhouse",
    price: 34.99,
    rating: 4.9,
    reviews: 92,
    imageUrl: "/BirdHouse.png",
    category: "accessories"
  },
  {
    id: 6,
    name: "Blue Watering Can",
    price: 19.99,
    rating: 4.7,
    reviews: 143,
    imageUrl: "/WateringCan.png",
    category: "accessories"
  }
]

export function ProductProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [products] = useState<Product[]>(initialProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    categories: [],
    priceRange: '',
    ratings: []
  })

  const resetFiltersAndSearch = useCallback(() => {
    setFilteredProducts(products)
    setSearchQuery('')
    setSearchSuggestions([])
    setActiveFilters({
      categories: [],
      priceRange: '',
      ratings: []
    })
  }, [products])

  // Reset state on mount and route change
  useEffect(() => {
    resetFiltersAndSearch()
  }, [pathname, resetFiltersAndSearch])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    applyFilters(query, activeFilters)
  }

  const handleFilter = (filters: FilterState) => {
    setActiveFilters(filters)
    applyFilters(searchQuery, filters)
  }

  const applyFilters = (query: string, filters: FilterState) => {
    let filtered = [...products]

    // Apply search filter
    if (query) {
      const searchTerm = query.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
      )
    }

    // Apply category filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      )
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(product => {
        switch (filters.priceRange) {
          case 'under-25':
            return product.price < 25
          case '25-50':
            return product.price >= 25 && product.price <= 50
          case '50-100':
            return product.price > 50 && product.price <= 100
          case 'over-100':
            return product.price > 100
          default:
            return true
        }
      })
    }

    // Apply rating filters
    if (filters.ratings.length > 0) {
      filtered = filtered.filter(product => {
        return filters.ratings.some(rating => {
          const minRating = parseInt(rating.split('-')[0])
          return product.rating >= minRating
        })
      })
    }

    setFilteredProducts(filtered)
  }

  // Update search suggestions when search query changes
  useEffect(() => {
    if (searchQuery.length > 0) {
      const suggestions = products
        .filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(product => product.name)
        .slice(0, 5) // Limit to 5 suggestions
      setSearchSuggestions(suggestions)
    } else {
      setSearchSuggestions([])
    }
  }, [searchQuery, products])

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        searchSuggestions,
        handleSearch,
        handleFilter,
        searchQuery,
        setSearchQuery,
        resetFiltersAndSearch
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  return context
} 