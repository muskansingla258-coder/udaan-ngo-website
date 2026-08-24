import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Shared Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DonateModal from './components/DonateModal';
import Toast from './components/Toast';
import ScrollToTop from './components/ScrollToTop';

// Page Components (Separated by Member Assignments)
// Person 1: Home, Contact
import Home from './pages/Home';
import Contact from './pages/Contact';

// Person 2: What We Do, Our Stories
import WhatWeDo from './pages/WhatWeDo';
import OurStories from './pages/OurStories';

// Person 3: Impact, Get Involved
import Impact from './pages/Impact';
import GetInvolved from './pages/GetInvolved';

// 404 Route Catch-All
import NotFound from './pages/NotFound';

import './App.css';

/**
 * App.jsx (Main Router & Application Shell)
 * Syllabus Concepts Demonstrated:
 * - React Router (Routes, Route)
 * - Lifting state up (DonateModal state & Toast state accessible across all routes)
 * - Clean modular component assembly without cluttering App.jsx
 * - Proper Props passing and callback handling
 */
export default function App() {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Reusable helper to trigger notifications anywhere in the app
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast({ message: '', type: 'success' });
  };

  return (
    <div className="app-layout">
      {/* Scroll restore on navigation */}
      <ScrollToTop />

      {/* Shared Navigation Bar */}
      <Navbar onOpenDonate={() => setIsDonateOpen(true)} />

      {/* Main Viewport Routed Content */}
      <div className="app-main-content">
        <Routes>
          {/* Person 1 Routes */}
          <Route 
            path="/" 
            element={
              <Home 
                onOpenDonate={() => setIsDonateOpen(true)} 
                showToast={showToast} 
              />
            } 
          />
          <Route 
            path="/contact" 
            element={<Contact showToast={showToast} />} 
          />

          {/* Person 2 Routes */}
          <Route 
            path="/what-we-do" 
            element={
              <WhatWeDo 
                onOpenDonate={() => setIsDonateOpen(true)} 
              />
            } 
          />
          <Route 
            path="/our-stories" 
            element={<OurStories />} 
          />

          {/* Person 3 Routes */}
          <Route 
            path="/impact" 
            element={<Impact showToast={showToast} />} 
          />
          <Route 
            path="/get-involved" 
            element={
              <GetInvolved 
                onOpenDonate={() => setIsDonateOpen(true)} 
                showToast={showToast} 
              />
            } 
          />

          {/* Universal 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Shared Footer */}
      <Footer onSubscribeSuccess={(msg) => showToast(msg, 'success')} />

      {/* Global Donation Modal (Lifting State Up) */}
      <DonateModal 
        isOpen={isDonateOpen} 
        onClose={() => setIsDonateOpen(false)}
        onSuccess={(msg) => showToast(msg, 'success')}
      />

      {/* Global Toast Notifications */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={closeToast} 
      />
    </div>
  );
}
