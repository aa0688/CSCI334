import React, { useState } from 'react';
import styles from './HomePage.module.css';
import logo from '../assets/logo.svg';
import heroBg from '../assets/hero-bg.jpg';
import { FaLeaf, FaWrench, FaBolt, FaPaintRoller, FaSearch, FaUserCheck, FaClipboardCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const featuredServices = [
  { icon: <FaLeaf />, title: 'Gardening' },
  { icon: <FaWrench />, title: 'Plumbing' },
  { icon: <FaBolt />, title: 'Electrical' },
  { icon: <FaPaintRoller />, title: 'Painting' },
];

const howItWorks = [
  { icon: <FaSearch />, text: 'Search for trusted pros' },
  { icon: <FaUserCheck />, text: 'Book instantly online' },
  { icon: <FaClipboardCheck />, text: 'Get the job done & review' },
];

const serviceOptions = ['Gardening', 'Plumbing', 'Electrical', 'Painting'];

const HomePage = () => {
  const [service, setService] = useState('');
  const [suburb, setSuburb] = useState('');

  return (
    <div className={styles.homePage}>
      <header className={styles.header}>
        <div className={styles.logoNav}>
          <img src={logo} alt="RenoConnect Logo" className={styles.logo} />
          <nav className={styles.nav}>
            <a href="/">Home</a>
            <Link to="/services">Services</Link>
            <Link to="/provider/1/book">How It Works</Link>
            <a href="/auth">Login</a>
          </nav>
        </div>
      </header>
      <section className={styles.hero} style={{ backgroundImage: `url(${heroBg})` }}>
        <div className={styles.overlay} />
        <div className={styles.heroContent}>
          <div className={styles.searchCard}>
            <select value={service} onChange={e => setService(e.target.value)}>
              <option value="">What service?</option>
              {serviceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <input
              type="text"
              placeholder="Your suburb"
              value={suburb}
              onChange={e => setSuburb(e.target.value)}
            />
            <button className={styles.primaryBtn}>Find a Pro</button>
          </div>
        </div>
      </section>
      <section className={styles.howItWorks} id="how">
        <div className={styles.howGrid}>
          {howItWorks.map((step, i) => (
            <div key={i} className={styles.howCol}>
              <div className={styles.howIcon}>{step.icon}</div>
              <div>{step.text}</div>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.featuredServices} id="services">
        <h2>Featured Services</h2>
        <div className={styles.servicesGrid}>
          {featuredServices.map((svc, i) => (
            <div key={i} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>{svc.icon}</div>
              <div className={styles.serviceTitle}>{svc.title}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link to="/services" className={styles.primaryBtn}>
            View All Services & How It Works
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 