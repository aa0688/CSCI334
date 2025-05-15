import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './BookingPage.module.css';

// Stub provider data array
const providers = [
  {
    id: '1',
    name: 'Green Thumb Gardens',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    service: 'Gardening',
    rate: '$40/hr',
  },
  {
    id: '2',
    name: 'PlumbRight Pros',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    service: 'Plumbing',
    rate: '$60/hr',
  },
  {
    id: '3',
    name: 'BrightSpark Electric',
    photo: 'https://randomuser.me/api/portraits/men/65.jpg',
    service: 'Electrical',
    rate: '$55/hr',
  },
  {
    id: '4',
    name: 'Perfect Paints',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    service: 'Painting',
    rate: '$50/hr',
  },
];

const BookingPage = () => {
  const { id } = useParams();
  const provider = providers.find(p => p.id === id);
  const [form, setForm] = useState({ date: '', time: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({});

  if (!provider) {
    return <div className={styles.bookingPage}><div className={styles.notFound}>Provider not found.</div></div>;
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const handleBlur = e => setTouched(t => ({ ...t, [e.target.name]: true }));
  const handleSubmit = e => {
    e.preventDefault();
    setTouched({ date: true, time: true });
    if (!form.date || !form.time) return;
    setSubmitted(true);
  };

  return (
    <div className={styles.bookingPage}>
      <div className={styles.card}>
        <div className={styles.providerInfo}>
          <img src={provider.photo} alt={provider.name} className={styles.photo} />
          <div>
            <div className={styles.name}>{provider.name}</div>
            <div className={styles.service}>{provider.service}</div>
            <div className={styles.rate}>{provider.rate}</div>
          </div>
        </div>
        {submitted ? (
          <div className={styles.confirmation}>
            <h2>Booking Confirmed!</h2>
            <p>Your booking with <b>{provider.name}</b> is scheduled for <b>{form.date}</b> at <b>{form.time}</b>.</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
            <label>Date
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={touched.date && !form.date ? styles.invalid : ''}
              />
            </label>
            <label>Time
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={touched.time && !form.time ? styles.invalid : ''}
              />
            </label>
            <label>Notes (optional)
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Describe your needs, access instructions, etc."
              />
            </label>
            <button className={styles.bookBtn} type="submit">Book Now</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingPage; 