import React, { useState } from 'react';
import { X, Heart, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import './DonateModal.css';

/**
 * Donate Modal Component
 * Syllabus Concepts:
 * - React Controlled Forms & Multiple state inputs
 * - Conditional rendering (Amount presets, Form view vs Success view)
 * - Accessibility (role="dialog", aria-modal="true", keyboard focus)
 * - Browser Storage (localStorage saving donation history)
 */
export default function DonateModal({ isOpen, onClose, onSuccess }) {
  const [frequency, setFrequency] = useState('monthly'); // 'monthly' | 'once'
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    panNumber: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const presetAmounts = [500, 1000, 2500, 5000];

  const handleAmountClick = (val) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    if (val && !isNaN(val)) {
      setAmount(Number(val));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API network call with Promise
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);

      // Save to localStorage
      try {
        const donations = JSON.parse(localStorage.getItem('udaan_donations') || '[]');
        donations.push({
          amount,
          frequency,
          donor: formData.name,
          email: formData.email,
          date: new Date().toISOString()
        });
        localStorage.setItem('udaan_donations', JSON.stringify(donations));
      } catch (err) {
        console.error('Donation storage error:', err);
      }

      if (onSuccess) {
        onSuccess(`Thank you, ${formData.name}! Your donation of ₹${amount.toLocaleString()} was successful.`);
      }
    }, 1200);
  };

  const handleReset = () => {
    setIsDone(false);
    setFormData({ name: '', email: '', phone: '', panNumber: '' });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="donate-title">
      <div className="modal-content donate-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!isDone ? (
          <div>
            <div className="donate-header">
              <div className="donate-badge">
                <Heart size={16} fill="#e86014" color="#e86014" /> Every Rupee Counts
              </div>
              <h3 id="donate-title" className="donate-title">Empower a Child's Future</h3>
              <p className="donate-subtitle">
                100% of your public donation goes directly to education and child healthcare.
              </p>
            </div>

            {/* Frequency Selector */}
            <div className="frequency-toggle-group">
              <button 
                type="button"
                className={`freq-btn ${frequency === 'monthly' ? 'active' : ''}`}
                onClick={() => setFrequency('monthly')}
              >
                Give Monthly <span className="tag-recommended">Most Impact</span>
              </button>
              <button 
                type="button"
                className={`freq-btn ${frequency === 'once' ? 'active' : ''}`}
                onClick={() => setFrequency('once')}
              >
                Give Once
              </button>
            </div>

            {/* Amount Presets */}
            <div className="amount-grid">
              {presetAmounts.map((val) => (
                <button
                  key={val}
                  type="button"
                  className={`amount-pill ${amount === val && !customAmount ? 'selected' : ''}`}
                  onClick={() => handleAmountClick(val)}
                >
                  ₹{val.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <div className="custom-amount-wrap">
              <span className="currency-symbol">₹</span>
              <input
                type="number"
                placeholder="Enter other amount"
                value={customAmount}
                onChange={handleCustomChange}
                min="100"
                className="custom-amount-input"
                aria-label="Custom donation amount"
              />
            </div>

            {/* Donor Information Form */}
            <form className="donate-form" onSubmit={handleDonateSubmit}>
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="donor-name">Full Name *</label>
                  <input
                    id="donor-name"
                    type="text"
                    name="name"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="donor-email">Email Address *</label>
                  <input
                    id="donor-email"
                    type="email"
                    name="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="donor-phone">Phone Number</label>
                  <input
                    id="donor-phone"
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="donor-pan">PAN (For 80G Tax Exemption)</label>
                  <input
                    id="donor-pan"
                    type="text"
                    name="panNumber"
                    placeholder="ABCDE1234F"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary btn-submit-donate"
                disabled={isProcessing || !amount}
              >
                {isProcessing ? 'Processing Donation...' : `Donate ₹${amount.toLocaleString()} ${frequency === 'monthly' ? '/ Month' : 'Now'}`}
              </button>

              <div className="donation-security-note">
                <ShieldCheck size={16} color="#16a34a" />
                <span>256-Bit Encrypted &bull; 80G Tax Exemption Eligible</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="donation-success-view">
            <div className="success-icon-wrap">
              <CheckCircle2 size={56} color="#16a34a" />
            </div>
            <h3>Thank You for Your Generosity!</h3>
            <p className="success-msg">
              Your contribution of <strong>₹{amount.toLocaleString()}</strong> ({frequency === 'monthly' ? 'Monthly' : 'One-time'}) enables us to provide learning kits, daily nutrition, and a protective shelter to India's most vulnerable children.
            </p>
            <p className="receipt-note">
              An 80G tax receipt has been emailed to <strong>{formData.email}</strong>.
            </p>
            <button type="button" className="btn-primary" onClick={handleReset}>
              Close & Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
