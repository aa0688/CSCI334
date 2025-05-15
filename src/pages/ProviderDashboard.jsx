import React, { useState } from 'react';
import styles from './ProviderDashboard.module.css';
import { FaStar, FaCheckCircle, FaTimesCircle, FaUserCircle, FaCalendarAlt } from 'react-icons/fa';

const provider = {
  name: 'Jamie Lee',
  email: 'jamie.lee@provider.com',
  avatar: '',
  services: ['Gardening', 'Plumbing'],
  location: 'San Francisco, CA',
  bio: 'Experienced provider specializing in home and garden services.',
  availability: 'Mon-Fri, 9am-5pm',
};

const bookings = [
  {
    id: 'pb1',
    customer: 'Alex Smith',
    service: 'Gardening',
    date: '2024-05-25',
    time: '10:00',
    status: 'pending',
  },
  {
    id: 'pb2',
    customer: 'Taylor Brown',
    service: 'Plumbing',
    date: '2024-05-10',
    time: '14:00',
    status: 'upcoming',
  },
  {
    id: 'pb3',
    customer: 'Morgan Lee',
    service: 'Gardening',
    date: '2024-04-28',
    time: '09:00',
    status: 'completed',
  },
];

const reviews = [
  {
    id: 'pr1',
    customer: 'Alex Smith',
    rating: 5,
    text: 'Jamie was fantastic! My garden looks amazing.',
    date: '2024-05-26',
  },
  {
    id: 'pr2',
    customer: 'Taylor Brown',
    rating: 4,
    text: 'Quick and professional plumbing service.',
    date: '2024-05-11',
  },
];

const ProviderDashboard = () => {
  const [tab, setTab] = useState('upcoming');
  const [profile, setProfile] = useState(provider);
  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState(provider);

  const handleAccept = (id) => {
    alert('Booking accepted!');
  };
  const handleDecline = (id) => {
    alert('Booking declined!');
  };
  const handleComplete = (id) => {
    alert('Booking marked as completed!');
  };
  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };
  const saveProfile = () => {
    setProfile(profileForm);
    setEditMode(false);
    alert('Profile updated!');
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.avatar}>
          {provider.avatar ? (
            <img src={provider.avatar} alt="avatar" />
          ) : (
            <FaUserCircle size={56} color="#bbb" />
          )}
        </div>
        <div>
          <h1>{profile.name}</h1>
          <div className={styles.email}>{profile.email}</div>
          <div className={styles.services}>{profile.services.join(', ')}</div>
        </div>
      </header>
      <div className={styles.tabs}>
        <button className={tab === 'upcoming' ? styles.active : ''} onClick={() => setTab('upcoming')}>Upcoming Bookings</button>
        <button className={tab === 'past' ? styles.active : ''} onClick={() => setTab('past')}>Past Bookings</button>
        <button className={tab === 'reviews' ? styles.active : ''} onClick={() => setTab('reviews')}>Reviews</button>
        <button className={tab === 'profile' ? styles.active : ''} onClick={() => setTab('profile')}>Profile</button>
      </div>
      <div className={styles.tabContent}>
        {tab === 'upcoming' && (
          <div>
            {bookings.filter(b => b.status === 'pending' || b.status === 'upcoming').length === 0 ? (
              <div className={styles.empty}>No upcoming bookings.</div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.filter(b => b.status === 'pending' || b.status === 'upcoming').map(b => (
                    <tr key={b.id}>
                      <td>{b.customer}</td>
                      <td>{b.service}</td>
                      <td>{b.date}</td>
                      <td>{b.time}</td>
                      <td>
                        {b.status === 'pending' ? (
                          <span className={styles.statusPending}><FaCalendarAlt /> Pending</span>
                        ) : (
                          <span className={styles.statusUpcoming}><FaCheckCircle /> Upcoming</span>
                        )}
                      </td>
                      <td>
                        {b.status === 'pending' ? (
                          <>
                            <button className={styles.acceptBtn} onClick={() => handleAccept(b.id)}>Accept</button>
                            <button className={styles.declineBtn} onClick={() => handleDecline(b.id)}>Decline</button>
                          </>
                        ) : (
                          <button className={styles.completeBtn} onClick={() => handleComplete(b.id)}>Mark Completed</button>
                        )}
                      </td>
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
                    <th>Customer</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.filter(b => b.status === 'completed').map(b => (
                    <tr key={b.id}>
                      <td>{b.customer}</td>
                      <td>{b.service}</td>
                      <td>{b.date}</td>
                      <td>{b.time}</td>
                      <td><span className={styles.statusCompleted}><FaCheckCircle /> Completed</span></td>
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
                    <div className={styles.reviewCustomer}>{r.customer}</div>
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
        {tab === 'profile' && (
          <div className={styles.profileSection}>
            {editMode ? (
              <div className={styles.profileForm}>
                <label>Name
                  <input name="name" value={profileForm.name} onChange={handleProfileChange} />
                </label>
                <label>Email
                  <input name="email" value={profileForm.email} onChange={handleProfileChange} />
                </label>
                <label>Services
                  <input name="services" value={profileForm.services.join(', ')} onChange={e => setProfileForm({ ...profileForm, services: e.target.value.split(',').map(s => s.trim()) })} />
                </label>
                <label>Location
                  <input name="location" value={profileForm.location} onChange={handleProfileChange} />
                </label>
                <label>Bio
                  <textarea name="bio" value={profileForm.bio} onChange={handleProfileChange} />
                </label>
                <label>Availability
                  <input name="availability" value={profileForm.availability} onChange={handleProfileChange} />
                </label>
                <button className={styles.saveBtn} onClick={saveProfile}>Save</button>
                <button className={styles.cancelBtn} onClick={() => setEditMode(false)}>Cancel</button>
              </div>
            ) : (
              <div className={styles.profileView}>
                <div><strong>Name:</strong> {profile.name}</div>
                <div><strong>Email:</strong> {profile.email}</div>
                <div><strong>Services:</strong> {profile.services.join(', ')}</div>
                <div><strong>Location:</strong> {profile.location}</div>
                <div><strong>Bio:</strong> {profile.bio}</div>
                <div><strong>Availability:</strong> {profile.availability}</div>
                <button className={styles.editBtn} onClick={() => setEditMode(true)}>Edit Profile</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard; 