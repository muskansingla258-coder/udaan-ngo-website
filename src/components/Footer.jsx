import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Send, CheckCircle2 } from 'lucide-react';
import './Footer.css';

/**
 * Footer Component (Assigned to Person 1)
 * Syllabus Concepts:
 * - HTML5 semantic <footer> tag
 * - React Controlled Input & Form Submission
 * - Browser Storage (localStorage) integration
 * - CSS Flexbox & Responsive Layouts
 */
export default function Footer({ onSubscribeSuccess }) {
  const [footerEmail, setFooterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleFooterSubscribe = (e) => {
    e.preventDefault();
    if (!footerEmail || !footerEmail.includes('@')) return;

    // Save newsletter subscriber in localStorage
    try {
      const existingSubscribers = JSON.parse(localStorage.getItem('udaan_newsletter') || '[]');
      if (!existingSubscribers.includes(footerEmail)) {
        existingSubscribers.push(footerEmail);
        localStorage.setItem('udaan_newsletter', JSON.stringify(existingSubscribers));
      }
    } catch (err) {
      console.error('Storage error:', err);
    }

    setIsSubscribed(true);
    if (onSubscribeSuccess) {
      onSubscribeSuccess('Thank you for subscribing to Udaan updates!');
    }
    setFooterEmail('');
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        {/* Left Column: Brand & Copyright */}
        <div className="footer-brand-col">
          <Link to="/" className="footer-logo">
            <span className="brand-name">Udaan</span>
          </Link>
          <p className="footer-mission">Empowering every child's flight.</p>
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Udaan Child Welfare Foundation. All rights reserved.
          </p>
        </div>

        {/* Center Column: Quick Navigation Links */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links-list">
            <li><Link to="/what-we-do">What We Do</Link></li>
            <li><Link to="/our-stories">Our Stories</Link></li>
            <li><Link to="/impact">Impact Metrics</Link></li>
            <li><Link to="/get-involved">Get Involved</Link></li>
          </ul>
        </div>

        {/* Right Links: Legal & Contact */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Support & Legal</h4>
          <ul className="footer-links-list">
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/get-involved#careers">Careers</Link></li>
            <li><Link to="/impact#reports">Annual Reports</Link></li>
            <li><a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy Policy: Udaan strictly protects all donor and volunteer personal information.'); }}>Privacy Policy</a></li>
          </ul>
        </div>

        {/* Right Column: Newsletter Subscription */}
        <div className="footer-newsletter-col">
          <h4 className="footer-heading">Stay Connected</h4>
          <p className="footer-newsletter-text">
            Receive our quarterly impact report and urgent child protection appeals.
          </p>
          
          <form className="footer-subscribe-form" onSubmit={handleFooterSubscribe}>
            <input 
              type="email" 
              placeholder="Your email address" 
              value={footerEmail}
              onChange={(e) => setFooterEmail(e.target.value)}
              required
              aria-label="Email address for newsletter"
            />
            <button type="submit" className="btn-footer-submit" aria-label="Subscribe">
              <Send size={16} />
            </button>
          </form>

          {isSubscribed && (
            <p className="footer-success-note">
              <CheckCircle2 size={14} /> Subscribed successfully!
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
