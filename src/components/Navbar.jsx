import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Sparkles } from 'lucide-react';
import './Navbar.css';

/**
 * Navbar Component (Assigned to Person 1)
 * Syllabus Concepts:
 * - React Router NavLink with dynamic active class
 * - useState for mobile toggle and scroll shadow
 * - useEffect for scroll events & body scroll lock
 * - Semantic <header> and <nav> HTML5 tags
 * - Accessibility attributes (aria-expanded, aria-label)
 */
export default function Navbar({ onOpenDonate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu whenever route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Track window scroll for adding shadow to sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" aria-label="Udaan Foundation Home">
          <div className="brand-icon">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 22C10 22 14 16 18 10C22 4 28 4 28 4C28 4 26 12 20 18C16 22 10 26 4 26L4 22Z" fill="#e86014"/>
              <path d="M12 24C16 24 19 20 22 15C25 10 29 10 29 10C29 10 27 16 23 20C19 23 15 26 12 26V24Z" fill="#f5a623" opacity="0.85"/>
            </svg>
          </div>
          <span className="brand-name">Udaan</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav desktop-nav" aria-label="Main Navigation">
          <NavLink 
            to="/what-we-do" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            What We Do
          </NavLink>
          <NavLink 
            to="/our-stories" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Our Stories
          </NavLink>
          <NavLink 
            to="/impact" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Impact
          </NavLink>
          <NavLink 
            to="/get-involved" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Get Involved
          </NavLink>
        </nav>

        {/* CTA Button & Mobile Toggle */}
        <div className="navbar-actions">
          <button 
            type="button" 
            className="btn-donate-nav" 
            onClick={onOpenDonate}
            aria-label="Open Donation Modal"
          >
            Donate Now
          </button>

          {/* Mobile Hamburger Toggle */}
          <button 
            type="button" 
            className="mobile-menu-toggle" 
            onClick={toggleMobileMenu} 
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer">
          <nav className="mobile-nav-links" aria-label="Mobile Navigation">
            <NavLink 
              to="/" 
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              Home
            </NavLink>
            <NavLink 
              to="/what-we-do" 
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              What We Do
            </NavLink>
            <NavLink 
              to="/our-stories" 
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              Our Stories
            </NavLink>
            <NavLink 
              to="/impact" 
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              Impact
            </NavLink>
            <NavLink 
              to="/get-involved" 
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              Get Involved
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              Contact Us
            </NavLink>

            <button 
              type="button" 
              className="btn-primary mobile-donate-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenDonate();
              }}
            >
              <Heart size={18} fill="currentColor" /> Donate Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
