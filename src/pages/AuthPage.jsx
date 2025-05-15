import React, { useState } from 'react';
import styles from './AuthPage.module.css';
import illustration from '../assets/auth-illustration.svg';

const roles = ['Customer', 'Service Provider'];
const services = ['Gardening', 'Plumbing', 'Electrical', 'Painting'];

const AuthPage = () => {
  const [tab, setTab] = useState('login');
  const [login, setLogin] = useState({ email: '', password: '', remember: false });
  const [signup, setSignup] = useState({ name: '', email: '', password: '', role: '', services: [], availability: '' });
  const [touched, setTouched] = useState({});

  const handleLoginChange = e => {
    const { name, value, type, checked } = e.target;
    setLogin(l => ({ ...l, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleSignupChange = e => {
    const { name, value, type, checked } = e.target;
    if (name === 'services') {
      setSignup(s => ({ ...s, services: checked ? [...s.services, value] : s.services.filter(v => v !== value) }));
    } else {
      setSignup(s => ({ ...s, [name]: value }));
    }
  };
  const handleBlur = e => setTouched(t => ({ ...t, [e.target.name]: true }));
  const required = v => v && v.length > 0;
  const showServices = signup.role === 'Service Provider';

  return (
    <div className={styles.authPage}>
      <div className={styles.leftPanel}>
        <img src={illustration} alt="Welcome" className={styles.illustration} />
      </div>
      <div className={styles.rightPanel}>
        <div className={styles.tabs}>
          <button className={tab === 'login' ? styles.active : ''} onClick={() => setTab('login')}>Login</button>
          <button className={tab === 'signup' ? styles.active : ''} onClick={() => setTab('signup')}>Sign Up</button>
        </div>
        {tab === 'login' ? (
          <form className={styles.form} autoComplete="off">
            <label>Email
              <input name="email" type="email" value={login.email} onChange={handleLoginChange} onBlur={handleBlur} required />
            </label>
            <label>Password
              <input name="password" type="password" value={login.password} onChange={handleLoginChange} onBlur={handleBlur} required />
            </label>
            <div className={styles.row}>
              <label className={styles.checkbox}><input type="checkbox" name="remember" checked={login.remember} onChange={handleLoginChange} /> Remember me</label>
            </div>
            <button className={styles.primaryBtn} type="submit">Sign In</button>
          </form>
        ) : (
          <form className={styles.form} autoComplete="off">
            <label>Full Name
              <input name="name" value={signup.name} onChange={handleSignupChange} onBlur={handleBlur} required />
            </label>
            <label>Email
              <input name="email" type="email" value={signup.email} onChange={handleSignupChange} onBlur={handleBlur} required />
            </label>
            <label>Password
              <input name="password" type="password" value={signup.password} onChange={handleSignupChange} onBlur={handleBlur} required />
            </label>
            <label>Role
              <select name="role" value={signup.role} onChange={handleSignupChange} onBlur={handleBlur} required>
                <option value="">Select role</option>
                {roles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </label>
            {showServices && (
              <>
                <div className={styles.servicesChips}>
                  {services.map(s => (
                    <label key={s} className={styles.chip}>
                      <input
                        type="checkbox"
                        name="services"
                        value={s}
                        checked={signup.services.includes(s)}
                        onChange={handleSignupChange}
                      />
                      {s}
                    </label>
                  ))}
                </div>
                <label>Availability
                  <input type="date" name="availability" value={signup.availability} onChange={handleSignupChange} />
                </label>
              </>
            )}
            <button className={styles.primaryBtn} type="submit">Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage; 