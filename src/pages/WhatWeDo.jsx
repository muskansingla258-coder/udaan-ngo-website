import React, { useState } from 'react';
import { 
  Users, BarChart2, Handshake, CheckCircle2, 
  ArrowRight, Shield, FileText, PieChart, Sparkles 
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { programsData, methodologyPillars, timelineMilestones } from '../data/programsData';
import './WhatWeDo.css';

/**
 * What We Do Page (Assigned to Person 2)
 * Syllabus Concepts Demonstrated:
 * - Component-based architecture
 * - Rendering lists with unique keys
 * - useState for active program selection & modal preview
 * - CSS Grid & Responsive media queries
 * - Accessibility and Semantic HTML5 tags
 */
export default function WhatWeDo({ onOpenDonate }) {
  useDocumentTitle('What We Do');
  const [selectedProgram, setSelectedProgram] = useState(programsData[0]);

  return (
    <main className="what-we-do-page">
      {/* 1. HERO SECTION */}
      <section className="wwd-hero-section">
        <div className="container wwd-hero-container">
          <div className="wwd-hero-text">
            <h1 className="wwd-hero-title">
              Empowering Flight <br />
              <span className="highlight-text">Through Action</span>
            </h1>
            <p className="wwd-hero-subtitle">
              We focus on holistic development, ensuring every child has access to quality education,
              essential healthcare, and a safe environment to thrive.
            </p>
            <div className="wwd-hero-cta">
              <button 
                type="button" 
                className="btn-primary"
                onClick={onOpenDonate}
              >
                Support Our Programs <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="wwd-hero-image-wrap">
            <img 
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80" 
              alt="Indian school children reading together in a bright classroom" 
              className="wwd-hero-img"
            />
          </div>
        </div>
      </section>

      {/* 2. OUR CORE PROGRAMS */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="section-title-wrap">
            <h2 className="section-title">Our Core Programs</h2>
            <p className="section-subtitle">
              Targeted, multifaceted interventions designed to address systemic barriers to child well-being.
            </p>
          </div>

          {/* Program Cards Grid */}
          <div className="core-programs-grid">
            {programsData.map((prog) => (
              <article 
                key={prog.id} 
                className={`core-program-card ${selectedProgram.id === prog.id ? 'active-program' : ''}`}
                onClick={() => setSelectedProgram(prog)}
              >
                <div className="core-program-img-wrap">
                  <img src={prog.image} alt={prog.title} className="core-program-img" loading="lazy" />
                  <span className="badge-pill badge-orange core-program-tag">{prog.tag}</span>
                </div>

                <div className="core-program-body">
                  <h3 className="core-program-title">{prog.title}</h3>
                  <p className="core-program-desc">{prog.description}</p>
                  
                  <div className="core-program-stats">
                    <strong>Reach:</strong> {prog.stats}
                  </div>

                  <div className="core-program-pillars">
                    {prog.pillars.map((pillar, idx) => (
                      <span key={idx} className="pillar-tag">
                        <CheckCircle2 size={12} color="#e86014" /> {pillar}
                      </span>
                    ))}
                  </div>

                  <button 
                    type="button" 
                    className="btn-outline program-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDonate();
                    }}
                  >
                    Support this Program
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR METHODOLOGY */}
      <section className="section-padding bg-warm">
        <div className="container">
          <div className="section-title-wrap">
            <h2 className="section-title">Our Methodology</h2>
            <p className="section-subtitle">
              A systematic, community-first approach to creating sustainable, long-term impact in the lives of children.
            </p>
          </div>

          <div className="methodology-grid">
            {methodologyPillars.map((item) => (
              <div key={item.id} className="methodology-card">
                <div className="methodology-icon-box">
                  {item.icon === 'Users' && <Users size={28} color="#ffffff" />}
                  {item.icon === 'BarChart2' && <BarChart2 size={28} color="#ffffff" />}
                  {item.icon === 'Handshake' && <Handshake size={28} color="#ffffff" />}
                  {item.icon === 'CheckCircle2' && <CheckCircle2 size={28} color="#ffffff" />}
                </div>
                <h3 className="methodology-card-title">{item.title}</h3>
                <p className="methodology-card-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR JOURNEY OF IMPACT (TIMELINE) */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="section-title-wrap">
            <h2 className="section-title">Our Journey of Impact</h2>
            <p className="section-subtitle">
              Over a decade of measured transformation, institutional partnerships, and expanding grassroots footprint.
            </p>
          </div>

          <div className="timeline-grid">
            {timelineMilestones.map((milestone) => (
              <div key={milestone.year} className="timeline-card">
                <span className="timeline-year">{milestone.year}</span>
                <h3 className="timeline-title">{milestone.title}</h3>
                <p className="timeline-desc">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMMITMENT TO TRANSPARENCY */}
      <section className="section-padding bg-warm">
        <div className="container">
          <div className="transparency-banner-card">
            <div className="transparency-content-col">
              <h2 className="transparency-heading">Commitment to Transparency</h2>
              <p className="transparency-text">
                We believe that every donation is a trust placed in us. Our financials are audited annually by top-tier independent firms, and we maintain full transparency in our fund allocation to ensure maximum impact for the communities we serve.
              </p>
              
              <div className="transparency-badges-row">
                <div className="t-badge">
                  <CheckCircle2 size={16} color="#e86014" />
                  <span>Independent Audits</span>
                </div>
                <div className="t-badge">
                  <FileText size={16} color="#e86014" />
                  <span>Public Reports</span>
                </div>
                <div className="t-badge">
                  <PieChart size={16} color="#e86014" />
                  <span>85% Program Allocation</span>
                </div>
              </div>
            </div>

            <div className="transparency-badge-box">
              <div className="shield-graphic-wrap">
                <Shield size={48} color="#e86014" />
                <Sparkles size={20} className="sparkle-icon" color="#f5a623" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
