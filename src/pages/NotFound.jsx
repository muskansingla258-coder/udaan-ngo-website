import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './NotFound.css';

/**
 * 404 Page Not Found Component
 * Syllabus Concepts:
 * - React Router wildcard catch-all route (path="*")
 * - User experience & safe navigation fallback
 */
export default function NotFound() {
  useDocumentTitle('404 Page Not Found');

  return (
    <main className="not-found-page">
      <div className="container not-found-container">
        <span className="not-found-code">404</span>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-desc">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn-primary">
            <Home size={18} /> Return to Homepage
          </Link>
          <Link to="/contact" className="btn-outline">
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}
