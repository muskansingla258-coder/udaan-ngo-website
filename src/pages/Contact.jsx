import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, 
  HelpCircle, MessageSquare, AlertCircle, HeartHandshake 
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Contact.css';

/**
 * Contact Us Page (Assigned to Person 1)
 * Syllabus Concepts Demonstrated:
 * - Controlled components & two-way state binding
 * - Form validation (Email regex, required fields check)
 * - Promises & async/await submission handling
 * - Browser Storage (localStorage saving inquiries)
 * - Accessibility (labels, aria-invalid, alert banners)
 * - CSS Grid responsive layout
 */
export default function Contact({ showToast }) {
  useDocumentTitle('Contact Us');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'general',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValidationErrors = validateForm();
    if (Object.keys(formValidationErrors).length > 0) {
      setErrors(formValidationErrors);
      showToast('Please fix the errors before submitting.', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate async API call with Promise
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Save contact message into localStorage
      const existingInquiries = JSON.parse(localStorage.getItem('udaan_contact_inquiries') || '[]');
      existingInquiries.push({
        ...formData,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('udaan_contact_inquiries', JSON.stringify(existingInquiries));

      setIsSuccess(true);
      showToast('Your message has been sent successfully!', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: 'general',
        subject: '',
        message: ''
      });
    } catch (err) {
      showToast('Failed to send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      {/* HEADER BANNER */}
      <section className="contact-hero-banner">
        <div className="container">
          <span className="badge-pill badge-orange">Get in Touch</span>
          <h1 className="contact-hero-title">We'd Love to Hear From You</h1>
          <p className="contact-hero-subtitle">
            Have questions about our child education programs, CSR partnerships, or volunteering?
            Our team is here to support you.
          </p>
        </div>
      </section>

      {/* MAIN CONTACT CONTENT */}
      <section className="section-padding">
        <div className="container contact-layout-grid">
          {/* Left Column: Contact Information Cards */}
          <aside className="contact-info-column" aria-label="Contact Information">
            <div className="info-card-box">
              <h2 className="info-box-title">Headquarters</h2>
              <p className="info-box-desc">
                Visit our central operations office or schedule a community tour.
              </p>

              <div className="contact-details-list">
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <MapPin size={20} color="#e86014" />
                  </div>
                  <div>
                    <strong>National Office:</strong>
                    <p>Udaan House, 42 Kasturba Gandhi Marg, New Delhi, 110001, India</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item-icon">
                    <Phone size={20} color="#e86014" />
                  </div>
                  <div>
                    <strong>Direct Helplines:</strong>
                    <p>+91 (11) 4567 8900 / +91 98110 00000</p>
                    <small className="muted-text">Mon - Sat: 9:00 AM - 6:30 PM IST</small>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item-icon">
                    <Mail size={20} color="#e86014" />
                  </div>
                  <div>
                    <strong>Email Inquiries:</strong>
                    <p>contact@udaanfoundation.org</p>
                    <p>volunteer@udaanfoundation.org</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Assistance Box */}
            <div className="assistance-card-box">
              <HeartHandshake size={32} color="#e86014" />
              <h3>Corporate Partnerships & CSR</h3>
              <p>Looking to align your corporate social responsibility mandate with proven grassroots impact?</p>
              <a href="mailto:csr@udaanfoundation.org" className="csr-mail-link">
                csr@udaanfoundation.org
              </a>
            </div>
          </aside>

          {/* Right Column: Interactive Controlled Contact Form */}
          <section className="contact-form-column" aria-label="Send a message">
            <div className="form-card-container">
              <h2 className="form-card-title">Send Us a Message</h2>
              <p className="form-card-desc">
                Fill out the form below and a representative will reply within 24 business hours.
              </p>

              {isSuccess && (
                <div className="form-alert-success" role="alert">
                  <CheckCircle2 size={24} color="#16a34a" />
                  <div>
                    <strong>Thank you for contacting Udaan!</strong>
                    <p>Your inquiry has been received. Our team will get back to you shortly.</p>
                  </div>
                </div>
              )}

              <form className="contact-main-form" onSubmit={handleSubmit} noValidate>
                <div className="form-grid-2">
                  <div className="form-field">
                    <label htmlFor="name">Your Name <span className="req">*</span></label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'input-error' : ''}
                      aria-invalid={errors.name ? 'true' : 'false'}
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="email">Email Address <span className="req">*</span></label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'input-error' : ''}
                      aria-invalid={errors.email ? 'true' : 'false'}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label htmlFor="phone">Phone Number (Optional)</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="category">Inquiry Category</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="donation">Donation & Tax Exemption (80G)</option>
                      <option value="volunteer">Volunteering Opportunities</option>
                      <option value="csr">Corporate CSR Partnership</option>
                      <option value="media">Media & Press</option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="subject">Subject <span className="req">*</span></label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? 'input-error' : ''}
                    aria-invalid={errors.subject ? 'true' : 'false'}
                  />
                  {errors.subject && <span className="error-text">{errors.subject}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="message">Your Message <span className="req">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Please tell us details regarding your query..."
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'input-error' : ''}
                    aria-invalid={errors.message ? 'true' : 'false'}
                  ></textarea>
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className="btn-primary btn-submit-contact"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending Message...'
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
