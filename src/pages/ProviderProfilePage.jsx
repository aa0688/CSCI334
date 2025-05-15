import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProviderProfilePage.module.css';
import { FaStar, FaCheckCircle, FaTag, FaCalendarAlt } from 'react-icons/fa';

// Stub provider data array
const providers = [
  {
    id: '1',
    name: 'Green Thumb Gardens',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.8,
    verified: true,
    tags: ['Gardening', 'Landscaping'],
    rate: '$40/hr',
    bio: 'With over 10 years of experience, Green Thumb Gardens provides expert gardening and landscaping services. We are passionate about making your outdoor spaces beautiful and healthy.',
    availability: 'Mon-Fri, 8am-5pm',
    location: 'Sydney',
    service: 'Gardening',
  },
  {
    id: '2',
    name: 'PlumbRight Pros',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4.6,
    verified: true,
    tags: ['Plumbing'],
    rate: '$60/hr',
    bio: 'Reliable plumbing solutions with fast response.',
    availability: 'Mon-Sat, 7am-6pm',
    location: 'Melbourne',
    service: 'Plumbing',
  },
  {
    id: '3',
    name: 'BrightSpark Electric',
    photo: 'https://randomuser.me/api/portraits/men/65.jpg',
    rating: 4.9,
    verified: true,
    tags: ['Electrical'],
    rate: '$55/hr',
    bio: 'Certified electricians for all your needs.',
    availability: 'Mon-Fri, 8am-5pm',
    location: 'Sydney',
    service: 'Electrical',
  },
  {
    id: '4',
    name: 'Perfect Paints',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 4.7,
    verified: true,
    tags: ['Painting'],
    rate: '$50/hr',
    bio: 'Professional painting with attention to detail.',
    availability: 'Mon-Sun, 9am-6pm',
    location: 'Brisbane',
    service: 'Painting',
  },
];

const ProviderProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const provider = providers.find(p => p.id === id);

  if (!provider) {
    return <div className={styles.profilePage}><div className={styles.notFound}>Provider not found.</div></div>;
  }

  return (
    <div className={styles.profilePage}>
      <nav className={styles.breadcrumb}>
        <a href="/">Home</a> / <a href="/search">{provider.service}</a> / <span>{provider.name}</span>
      </nav>
      <div className={styles.profileContent}>
        <div className={styles.leftCol}>
          <img src={provider.photo} alt={provider.name} className={styles.profileImg} />
          <h1 className={styles.name}>{provider.name}</h1>
          <div className={styles.ratingRow}>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} color={i < Math.round(provider.rating) ? '#ffd166' : '#ddd'} />
            ))}
            <span className={styles.rating}>{provider.rating.toFixed(1)}</span>
            {provider.verified && (
              <span className={styles.verified}><FaCheckCircle /> Verified</span>
            )}
          </div>
          <div className={styles.tags}>
            {provider.tags.map(tag => (
              <span key={tag} className={styles.tag}><FaTag /> {tag}</span>
            ))}
          </div>
          <div className={styles.rate}>{provider.rate}</div>
        </div>
        <div className={styles.rightCol}>
          <div className={styles.sectionTitle}>About</div>
          <div className={styles.bio}>{provider.bio}</div>
          <div className={styles.sectionTitle}>Availability</div>
          <div className={styles.availability}><FaCalendarAlt /> {provider.availability}</div>
          <div className={styles.sectionTitle}>Location</div>
          <div className={styles.location}>{provider.location}</div>
          <button className={styles.bookBtn} onClick={() => navigate(`/provider/${provider.id}/book`)}>Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfilePage; 