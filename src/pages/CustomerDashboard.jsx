import React, { useState } from 'react';
import styles from './CustomerDashboard.module.css';
import { FaStar, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const user = {
  name: 'Alex Smith',
  email: 'alex.smith@email.com',
};

const bookings = [
  {
    id: 'b1',
    provider: 'Green Thumb Gardens',
    service: 'Gardening',
    date: '2024-05-25',
    time: '10:00',
    status: 'upcoming',
    reviewed: false,
    providerId: '1',
  },
  {
    id: 'b2',
    provider: 'PlumbRight Pros',
    service: 'Plumbing',
    date: '2024-05-10',
    time: '14:00',
    status: 'completed',
    reviewed: true,
    providerId: '2',
  },
  {
    id: 'b3',
    provider: 'BrightSpark Electric',
    service: 'Electrical',
    date: '2024-04-28',
    time: '09:00',
    status: 'completed',
    reviewed: false,
    providerId: '3',
  },
];

const reviews = [
  {
    id: 'r1',
    provider: 'PlumbRight Pros',
    rating: 5,
    text: 'Great service, fixed my leak quickly!',
    date: '2024-05-11',
  },
];

const CustomerDashboard = () => {
  const [tab, setTab] = useState('upcoming');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(null);

  const handleReview = (bookingId) => {
    setShowReviewForm(bookingId);
    setReviewText('');
    setReviewRating(5);
  };
  const submitReview = (bookingId) => {
    // In a real app, submit review to backend
    setShowReviewForm(null);
    alert('Review submitted!');
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Welcome, {user.name}</h1>
        <div className={styles.email}>{user.email}</div>
      </header>
      <div className={styles.tabs}>
        <button className={tab === 'upcoming' ? styles.active : ''} onClick={() => setTab('upcoming')}>Upcoming Bookings</button>
        <button className={tab === 'past' ? styles.active : ''} onClick={() => setTab('past')}>Past Bookings</button>
        <button className={tab === 'reviews' ? styles.active : ''} onClick={() => setTab('reviews')}>Reviews</button>
      </div>
      <div className={styles.tabContent}>
        {tab === 'upcoming' && (
          <div>
            {bookings.filter(b => b.status === 'upcoming').length === 0 ? (
              <div className={styles.empty}>No upcoming bookings.</div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.filter(b => b.status === 'upcoming').map(b => (
                    <tr key={b.id}>
                      <td>{b.provider}</td>
                      <td>{b.service}</td>
                      <td>{b.date}</td>
                      <td>{b.time}</td>
                      <td><span className={styles.statusUpcoming}><FaCalendarAlt /> Upcoming</span></td>
                      <td><button className={styles.cancelBtn}><FaTimesCircle /> Cancel</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        {tab === 'past' && (
          <div>
            {bookings.filter(b => b.status === 'completed').length === 0 ? (
              <div className={styles.empty}>No past bookings.</div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.filter(b => b.status === 'completed').map(b => (
                    <tr key={b.id}>
                      <td>{b.provider}</td>
                      <td>{b.service}</td>
                      <td>{b.date}</td>
                      <td>{b.time}</td>
                      <td><span className={styles.statusCompleted}><FaCheckCircle /> Completed</span></td>
                      <td>
                        {b.reviewed ? (
                          <span className={styles.reviewed}>Reviewed</span>
                        ) : showReviewForm === b.id ? (
                          <div className={styles.reviewForm}>
                            <div>
                              {[1,2,3,4,5].map(star => (
                                <FaStar
                                  key={star}
                                  color={star <= reviewRating ? '#ffd166' : '#ddd'}
                                  onClick={() => setReviewRating(star)}
                                  style={{ cursor: 'pointer' }}
                                />
                              ))}
                            </div>
                            <textarea
                              value={reviewText}
                              onChange={e => setReviewText(e.target.value)}
                              rows={2}
                              placeholder="Write your review..."
                            />
                            <button className={styles.submitBtn} onClick={() => submitReview(b.id)}>Submit</button>
                          </div>
                        ) : (
                          <button className={styles.reviewBtn} onClick={() => handleReview(b.id)}>Review</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        {tab === 'reviews' && (
          <div>
            {reviews.length === 0 ? (
              <div className={styles.empty}>No reviews yet.</div>
            ) : (
              <div className={styles.reviewsList}>
                {reviews.map(r => (
                  <div key={r.id} className={styles.reviewCard}>
                    <div className={styles.reviewProvider}>{r.provider}</div>
                    <div className={styles.reviewStars}>
                      {[1,2,3,4,5].map(star => (
                        <FaStar key={star} color={star <= r.rating ? '#ffd166' : '#ddd'} />
                      ))}
                      <span className={styles.reviewDate}>{r.date}</span>
                    </div>
                    <div className={styles.reviewText}>{r.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard; 