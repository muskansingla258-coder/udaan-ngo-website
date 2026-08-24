import React, { useState } from 'react';
import { 
  Heart, Download, ChevronDown, ChevronUp, Briefcase, 
  ArrowRight, CheckCircle2, Building, HandHeart, 
  FileCheck, Sparkles 
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { jobOpenings, volunteerFAQs } from '../data/jobsData';
import JobDetailModal from '../components/JobDetailModal';
import './GetInvolved.css';

/**
 * Get Involved Page (Assigned to Person 3)
 * Syllabus Concepts Demonstrated:
 * - Controlled components & input validation
 * - useState for Volunteer form & FAQ accordion
 * - Modal composition with JobDetailModal
 * - Browser Storage (localStorage saving volunteer submissions)
 * - Event handling & CSS Grid/Flexbox layouts
 */
export default function GetInvolved({ onOpenDonate, showToast }) {
  useDocumentTitle('Get Involved');

  // Volunteer form state
  const [volunteerForm, setVolunteerForm] = useState({
    fullName: '',
    email: '',
    areaOfInterest: '',
    message: ''
  });
  const [isSubmittingVolunteer, setIsSubmittingVolunteer] = useState(false);
  const [isVolunteerSuccess, setIsVolunteerSuccess] = useState(false);

  // FAQ Accordion state (stores open FAQ id)
  const [openFaqId, setOpenFaqId] = useState(volunteerFAQs[0]?.id || null);

  // Job Modal state
  const [selectedJob, setSelectedJob] = useState(null);

  const handleVolunteerChange = (e) => {
    const { name, value } = e.target;
    setVolunteerForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    if (!volunteerForm.fullName || !volunteerForm.email || !volunteerForm.areaOfInterest) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    setIsSubmittingVolunteer(true);

    setTimeout(() => {
      try {
        const volunteers = JSON.parse(localStorage.getItem('udaan_volunteers') || '[]');
        volunteers.push({
          ...volunteerForm,
          registeredAt: new Date().toISOString()
        });
        localStorage.setItem('udaan_volunteers', JSON.stringify(volunteers));
      } catch (err) {
        console.error(err);
      }

      setIsSubmittingVolunteer(false);
      setIsVolunteerSuccess(true);
      showToast('Thank you for volunteering with Udaan!', 'success');
      setVolunteerForm({ fullName: '', email: '', areaOfInterest: '', message: '' });
    }, 1000);
  };

  const toggleFaq = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const handleDownloadToolkit = () => {
    showToast('Downloading Udaan Fundraising Toolkit (PDF)...', 'info');
    setTimeout(() => {
      showToast('Fundraising Toolkit downloaded successfully!', 'success');
    }, 1200);
  };

  return (
    <main className="get-involved-page">
      {/* 1. HERO SECTION */}
      <section className="gi-hero-section">
        <div className="container">
          <div className="section-title-wrap">
            <h1 className="section-title">Take Action Today.</h1>
            <p className="section-subtitle">
              Whether you want to contribute your time, skills, or resources, there's a place for you in our mission. Join us in creating lasting change through modern, impactful solutions.
            </p>
          </div>

          {/* 2. TOP GRID: VOLUNTEER FORM (LEFT) & FUND/TOOLKIT CARDS (RIGHT) */}
          <div className="gi-top-grid">
            {/* Left Card: Volunteer Interest Form */}
            <div className="volunteer-form-card">
              <div className="card-top-tag">
                <span className="badge-pill badge-orange">
                  <HandHeart size={14} /> Volunteer
                </span>
              </div>
              <h2 className="volunteer-card-title">Volunteer Interest Form</h2>
              <p className="volunteer-card-sub">
                Sign up to offer your time and expertise. We'll match you with the right opportunity.
              </p>

              {isVolunteerSuccess ? (
                <div className="volunteer-success-msg">
                  <CheckCircle2 size={36} color="#16a34a" />
                  <h4>Thank You for Stepping Forward!</h4>
                  <p>Our volunteer coordination team will review your preferences and contact you within 2 business days.</p>
                  <button 
                    type="button" 
                    className="btn-outline btn-reset-form"
                    onClick={() => setIsVolunteerSuccess(false)}
                  >
                    Submit Another Interest
                  </button>
                </div>
              ) : (
                <form className="volunteer-form" onSubmit={handleVolunteerSubmit}>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label htmlFor="vol-fullName">Full Name</label>
                      <input
                        id="vol-fullName"
                        type="text"
                        name="fullName"
                        required
                        placeholder="Jane Doe"
                        value={volunteerForm.fullName}
                        onChange={handleVolunteerChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="vol-email">Email Address</label>
                      <input
                        id="vol-email"
                        type="email"
                        name="email"
                        required
                        placeholder="jane@example.com"
                        value={volunteerForm.email}
                        onChange={handleVolunteerChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="vol-areaOfInterest">Area of Interest</label>
                    <select
                      id="vol-areaOfInterest"
                      name="areaOfInterest"
                      required
                      value={volunteerForm.areaOfInterest}
                      onChange={handleVolunteerChange}
                    >
                      <option value="">Select an area...</option>
                      <option value="teaching">Education & Remedial Teaching</option>
                      <option value="healthcare">Mobile Health Camp Assistance</option>
                      <option value="digital">Coding & Digital Literacy Mentorship</option>
                      <option value="fundraising">Community Fundraising & Events</option>
                      <option value="content">Creative Content & Photography</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="vol-message">Brief Message (Optional)</label>
                    <textarea
                      id="vol-message"
                      name="message"
                      rows="3"
                      placeholder="Tell us a bit about why you want to join..."
                      value={volunteerForm.message}
                      onChange={handleVolunteerChange}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary btn-submit-volunteer"
                    disabled={isSubmittingVolunteer}
                  >
                    {isSubmittingVolunteer ? 'Submitting...' : 'Submit Interest'}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Fund the Mission & Fundraising Toolkit */}
            <div className="gi-right-col">
              {/* Card A: Fund the Mission */}
              <div className="mission-fund-card">
                <div className="card-top-tag">
                  <span className="badge-pill badge-gold">
                    <Heart size={14} /> Donate
                  </span>
                </div>
                <h3 className="gi-side-card-title">Fund the Mission</h3>
                <p className="gi-side-card-desc">
                  Your financial support directly funds our transparent, high-impact projects.
                </p>

                <div className="monthly-goal-wrap">
                  <div className="monthly-goal-header">
                    <span>Monthly Goal</span>
                    <span className="goal-pct">75%</span>
                  </div>
                  <div className="goal-progress-bar">
                    <div className="goal-progress-fill" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <button 
                  type="button" 
                  className="btn-gold btn-full-width"
                  onClick={onOpenDonate}
                >
                  Make a Donation
                </button>
              </div>

              {/* Card B: Fundraising Toolkit */}
              <div className="toolkit-card">
                <div className="card-top-tag">
                  <span className="badge-pill badge-soft">
                    <FileCheck size={14} /> Toolkit
                  </span>
                </div>
                <h3 className="gi-side-card-title">Fundraising Toolkit</h3>
                <p className="gi-side-card-desc">
                  Start your own campaign for Udaan. Get all the resources you need to rally your community.
                </p>

                <button 
                  type="button" 
                  className="btn-outline btn-full-width btn-toolkit"
                  onClick={handleDownloadToolkit}
                >
                  <Download size={16} /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORPORATE PARTNERSHIPS */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="corporate-banner">
            <div className="corporate-text-col">
              <h2 className="corporate-title">Corporate Partnerships</h2>
              <p className="corporate-desc">
                Align your brand with impact. We partner with organizations to create CSR initiatives that make a real difference in children's lives.
              </p>
            </div>
            <div className="corporate-action-col">
              <button 
                type="button" 
                className="btn-dark btn-partner"
                onClick={() => showToast('CSR Partnership inquiry opened. Please email csr@udaanfoundation.org', 'info')}
              >
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ FOR VOLUNTEERS */}
      <section className="section-padding bg-warm">
        <div className="container">
          <div className="section-title-wrap">
            <h2 className="section-title">FAQ for Volunteers</h2>
          </div>

          <div className="volunteer-faq-list">
            {volunteerFAQs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className={`faq-item-card ${isOpen ? 'open' : ''}`}>
                  <button 
                    type="button" 
                    className="faq-question-btn"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <div className="faq-chevron">
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="faq-answer-body">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. JOIN THE TEAM (CAREERS) */}
      <section className="section-padding bg-white" id="careers">
        <div className="container">
          <div className="section-title-wrap">
            <h2 className="section-title">Join the Team</h2>
            <p className="section-subtitle">
              Looking for a full-time role? Explore our open positions and build a career with purpose.
            </p>
          </div>

          <div className="jobs-cards-grid">
            {jobOpenings.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-card-header">
                  <h3 className="job-title">{job.title}</h3>
                  <span className={`badge-pill ${job.type === 'Internship' ? 'badge-gold' : 'badge-orange'}`}>
                    {job.type}
                  </span>
                </div>
                <p className="job-summary">{job.summary}</p>
                
                <button 
                  type="button" 
                  className="btn-job-details"
                  onClick={() => setSelectedJob(job)}
                  aria-label={`View details for ${job.title}`}
                >
                  View Details <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Application / Details Modal */}
      <JobDetailModal
        job={selectedJob}
        isOpen={Boolean(selectedJob)}
        onClose={() => setSelectedJob(null)}
        onApplySuccess={(msg) => showToast(msg, 'success')}
      />
    </main>
  );
}
