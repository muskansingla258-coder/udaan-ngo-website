import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import './Toast.css';

/**
 * Reusable Notification Toast Component
 * Syllabus Concepts:
 * - Conditional rendering
 * - useEffect with setTimeout cleanup for auto-dismiss
 * - CSS animations
 */
export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`toast-notification toast-${type}`} role="alert">
      <div className="toast-icon">
        {type === 'success' && <CheckCircle2 size={20} />}
        {type === 'error' && <AlertCircle size={20} />}
        {type === 'info' && <Info size={20} />}
      </div>
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
}
