import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchPage.module.css';
import { FaStar } from 'react-icons/fa';

const serviceTypes = ['Gardening', 'Plumbing', 'Electrical', 'Painting'];
const sortOptions = ['Best Match', 'Price: Low to High', 'Price: High to Low', 'Rating'];

const stubProviders = [
  {
    id: 1,
    name: 'Green Thumb Gardens',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.8,
    price: '$40/hr',
    bio: 'Expert gardening and landscaping services for your home.',
    service: 'Gardening',
    location: 'Sydney',
    available: '2024-05-20',
  },
  {
    id: 2,
    name: 'PlumbRight Pros',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4.6,
    price: '$60/hr',
    bio: 'Reliable plumbing solutions with fast response.',
    service: 'Plumbing',
    location: 'Melbourne',
    available: '2024-05-22',
  },
  {
    id: 3,
    name: 'BrightSpark Electric',
    photo: 'https://randomuser.me/api/portraits/men/65.jpg',
    rating: 4.9,
    price: '$55/hr',
    bio: 'Certified electricians for all your needs.',
    service: 'Electrical',
    location: 'Sydney',
    available: '2024-05-21',
  },
  {
    id: 4,
    name: 'Perfect Paints',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 4.7,
    price: '$50/hr',
    bio: 'Professional painting with attention to detail.',
    service: 'Painting',
    location: 'Brisbane',
    available: '2024-05-23',
  },
];

const SearchPage = () => {
  const [filters, setFilters] = useState({
    serviceTypes: [],
    location: '',
    availability: '',
    rating: 1,
    sortBy: 'Best Match',
  });
  const navigate = useNavigate();

  const handleFilterChange = e => {
    const { name, value, type, checked } = e.target;
    if (name === 'serviceTypes') {
      setFilters(f => ({
        ...f,
        serviceTypes: checked ? [...f.serviceTypes, value] : f.serviceTypes.filter(v => v !== value),
      }));
    } else {
      setFilters(f => ({ ...f, [name]: value }));
    }
  };

  // Simple filter logic for demo
  const filteredProviders = stubProviders.filter(p => {
    if (filters.serviceTypes.length && !filters.serviceTypes.includes(p.service)) return false;
    if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.availability && p.available !== filters.availability) return false;
    if (filters.rating && p.rating < filters.rating) return false;
    return true;
  });

  return (
    <div className={styles.searchPage}>
      <aside className={styles.sidebar}>
        <div className={styles.filterGroup}>
          <div className={styles.filterLabel}>Service Type</div>
          {serviceTypes.map(type => (
            <label key={type} className={styles.checkbox}>
              <input
                type="checkbox"
                name="serviceTypes"
                value={type}
                checked={filters.serviceTypes.includes(type)}
                onChange={handleFilterChange}
              />
              {type}
            </label>
          ))}
        </div>
        <div className={styles.filterGroup}>
          <div className={styles.filterLabel}>Location</div>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </div>
        <div className={styles.filterGroup}>
          <div className={styles.filterLabel}>Availability</div>
          <input
            type="date"
            name="availability"
            value={filters.availability}
            onChange={handleFilterChange}
          />
        </div>
        <div className={styles.filterGroup}>
          <div className={styles.filterLabel}>Rating: {filters.rating}+</div>
          <input
            type="range"
            name="rating"
            min={1}
            max={5}
            step={0.1}
            value={filters.rating}
            onChange={handleFilterChange}
          />
        </div>
        <div className={styles.filterGroup}>
          <div className={styles.filterLabel}>Sort By</div>
          <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
            {sortOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </aside>
      <main className={styles.mainContent}>
        <div className={styles.grid}>
          {filteredProviders.map(provider => (
            <div key={provider.id} className={styles.card}>
              <img src={provider.photo} alt={provider.name} className={styles.photo} />
              <div className={styles.name}>{provider.name}</div>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color={i < Math.round(provider.rating) ? '#ffd166' : '#ddd'} />
                ))}
                <span className={styles.rating}>{provider.rating.toFixed(1)}</span>
              </div>
              <div className={styles.price}>{provider.price}</div>
              <div className={styles.bio}>{provider.bio}</div>
              <button className={styles.profileBtn} onClick={() => navigate(`/provider/${provider.id}`)}>View Profile</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SearchPage; 