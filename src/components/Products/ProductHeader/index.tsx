'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { FaMapMarkerAlt, FaTag, FaSearch, FaFilter, FaTimes } from 'react-icons/fa'
import { useProducts } from '@/contexts/ProductContext'
import './styles.css'

const locations = [
  "San Francisco, California",
  "Los Angeles, California",
  "New York, New York",
  "Seattle, Washington",
  "Portland, Oregon"
]

const deals = [
  {
    title: "Spring Sale",
    discount: "20% off all plants"
  },
  {
    title: "Bundle & Save",
    discount: "Buy 2 trees, get 1 free"
  },
  {
    title: "Weekend Special",
    discount: "Free watering can with $50+ purchase"
  }
]

const filters = {
  categories: [
    { id: 'trees', label: 'Trees' },
    { id: 'plants', label: 'Plants' },
    { id: 'accessories', label: 'Accessories' }
  ],
  priceRanges: [
    { id: 'under-25', label: 'Under $25' },
    { id: '25-50', label: 'Between $25 - $50' },
    { id: '50-100', label: 'Between $50 - $100' },
    { id: 'over-100', label: 'Over $100' }
  ],
  ratings: [
    { id: '4-up', label: '4 Stars & Up' },
    { id: '3-up', label: '3 Stars & Up' },
    { id: '2-up', label: '2 Stars & Up' }
  ]
}

export interface FilterState {
  categories: string[];
  priceRange: string;
  ratings: string[];
}

interface ProductHeaderProps {
  isDetailPage?: boolean;
}

const ProductHeader = ({ isDetailPage = false }: ProductHeaderProps) => {
  const {
    searchQuery,
    setSearchQuery,
    searchSuggestions,
    handleSearch,
    handleFilter
  } = useProducts()

  const [showLocations, setShowLocations] = useState(false)
  const [showDeals, setShowDeals] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(locations[0])
  const [filterState, setFilterState] = useState<FilterState>({
    categories: [],
    priceRange: '',
    ratings: []
  })

  const searchContainerRef = useRef<HTMLDivElement>(null)
  const filtersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
        setShowFilters(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(searchQuery)
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    handleSearch(suggestion)
    setShowSuggestions(false)
  }

  const handleFilterChange = useCallback((type: keyof FilterState, value: string) => {
    setFilterState(prev => {
      const newState = { ...prev }
      
      if (type === 'priceRange') {
        newState.priceRange = value === prev.priceRange ? '' : value
      } else {
        const array = prev[type] as string[]
        const index = array.indexOf(value)
        
        if (index === -1) {
          newState[type] = [...array, value]
        } else {
          newState[type] = array.filter(item => item !== value)
        }
      }
      
      return newState
    })
  }, [])

  const handleFilterReset = () => {
    const resetState = {
      categories: [],
      priceRange: '',
      ratings: []
    }
    setFilterState(resetState)
    handleFilter(resetState)
  }

  const handleFilterApply = () => {
    handleFilter(filterState)
    setShowFilters(false)
  }

  const closeAllDropdowns = () => {
    setShowLocations(false)
    setShowDeals(false)
    setShowFilters(false)
  }

  return (
    <header className="product-header">
      <div className="header-content">
        <div className="header-left">
          <div className="dropdown-container">
            <button 
              className="location-selector"
              onClick={() => {
                closeAllDropdowns()
                setShowLocations(!showLocations)
              }}
            >
              <FaMapMarkerAlt />
              <span>{selectedLocation}</span>
              <span className={`dropdown-arrow ${showLocations ? 'active' : ''}`}>▼</span>
            </button>
            
            {showLocations && (
              <div className="dropdown-menu">
                {locations.map((location) => (
                  <button
                    key={location}
                    className="dropdown-item"
                    onClick={() => {
                      setSelectedLocation(location)
                      setShowLocations(false)
                    }}
                  >
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="dropdown-container">
            <button 
              className="deals-button"
              onClick={() => {
                closeAllDropdowns()
                setShowDeals(!showDeals)
              }}
            >
              <FaTag />
              <span>Best deals</span>
              <span className={`dropdown-arrow ${showDeals ? 'active' : ''}`}>▼</span>
            </button>

            {showDeals && (
              <div className="dropdown-menu">
                {deals.map((deal) => (
                  <div key={deal.title} className="dropdown-item deal">
                    <strong>{deal.title}</strong>
                    <p>{deal.discount}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {!isDetailPage && (
          <div className="header-right">
            <div className="search-container" ref={searchContainerRef}>
              <form className="search-form" onSubmit={handleSearchSubmit}>
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for plants, trees, accessories..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setShowSuggestions(true)
                  }}
                  onFocus={() => setShowSuggestions(true)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-search"
                    onClick={() => {
                      setSearchQuery('')
                      handleSearch('')
                    }}
                  >
                    <FaTimes />
                  </button>
                )}
              </form>
              
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="search-suggestions">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <FaSearch className="suggestion-icon" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="dropdown-container" ref={filtersRef}>
              <button 
                className="filter-button"
                onClick={(e) => {
                  e.stopPropagation()
                  closeAllDropdowns()
                  setShowFilters(!showFilters)
                }}
              >
                <FaFilter />
                <span>Filter</span>
                <span className={`dropdown-arrow ${showFilters ? 'active' : ''}`}>▼</span>
              </button>

              {showFilters && (
                <div className="dropdown-menu filters-menu">
                  <div className="filter-section">
                    <h3>Categories</h3>
                    <div className="filter-options">
                      {filters.categories.map((category) => (
                        <div key={category.id} className="filter-option">
                          <input
                            type="checkbox"
                            id={category.id}
                            checked={filterState.categories.includes(category.id)}
                            onChange={() => handleFilterChange('categories', category.id)}
                          />
                          <label htmlFor={category.id}>{category.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="filter-section">
                    <h3>Price Range</h3>
                    <div className="filter-options">
                      {filters.priceRanges.map((range) => (
                        <div key={range.id} className="filter-option">
                          <input
                            type="radio"
                            id={range.id}
                            name="priceRange"
                            checked={filterState.priceRange === range.id}
                            onChange={() => handleFilterChange('priceRange', range.id)}
                          />
                          <label htmlFor={range.id}>{range.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="filter-section">
                    <h3>Rating</h3>
                    <div className="filter-options">
                      {filters.ratings.map((rating) => (
                        <div key={rating.id} className="filter-option">
                          <input
                            type="checkbox"
                            id={rating.id}
                            checked={filterState.ratings.includes(rating.id)}
                            onChange={() => handleFilterChange('ratings', rating.id)}
                          />
                          <label htmlFor={rating.id}>{rating.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="filter-actions">
                    <button className="filter-reset" onClick={handleFilterReset}>
                      Reset
                    </button>
                    <button className="filter-apply" onClick={handleFilterApply}>
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default ProductHeader 