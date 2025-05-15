import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import SearchPage from './pages/SearchPage';
import ProviderProfilePage from './pages/ProviderProfilePage';
import BookingPage from './pages/BookingPage';
import CustomerDashboard from './pages/CustomerDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import ChatPage from './pages/ChatPage';
import ServicesHowItWorks from './pages/ServicesHowItWorks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/provider/:id" element={<ProviderProfilePage />} />
        <Route path="/provider/:id/book" element={<BookingPage />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/services" element={<ServicesHowItWorks />} />
      </Routes>
    </Router>
  );
}

export default App;
