import React, { useState } from 'react';
import { 
  GraduationCap, Download, CheckSquare, Search, 
  TrendingUp, Utensils, HeartHandshake, Users, 
  Activity, ShieldCheck, CheckCircle2, ArrowUpRight 
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { 
  impactMetrics, yearlyGrowthData, sdgGoals, 
  impactReports, impactMethodologies 
} from '../data/impactData';
import './Impact.css';

/**
 * Impact Page (Assigned to Person 3)
 * Syllabus Concepts Demonstrated:
 * - Dynamic data visualization & bar calculations
 * - Simulated File Download event handling
 * - CSS Grid & Responsive design
 * - Component composition and modular UI
 * - Accessible SVG icons & semantic tags
 */
export default function Impact({ showToast }) {
  useDocumentTitle('Impact');

  const maxGrowthValue = 130000;

  const handleDownloadReport = (report) => {
    showToast(`Downloading "${report.title}" (${report.fileSize})...`, 'info');
    setTimeout(() => {
      showToast(`"${report.title}" downloaded successfully!`, 'success');
    }, 1500);
  };

  return (
    <main className="impact-page">
      {/* 1. HERO SECTION */}
      <section className="impact-hero-section">
        <div className="container">
          <div className="section-title-wrap">
            <h1 className="section-title">Measurable Change, Real Lives</h1>
            <p className="section-subtitle">
              We believe in transparent, data-driven humanitarian action. Here is how your support translates into tangible outcomes for children across the region.
            </p>
          </div>

          {/* 2. TOP METRICS GRID */}
          <div className="top-metrics-grid">
            {/* Card 1: Children Impacted (Main Stat) */}
            <div className="metric-card metric-primary">
              <div className="metric-card-header">
                <h3 className="metric-card-title">Children Impacted</h3>
                <p className="metric-card-sub">Total reach across all core programs since 2020.</p>
              </div>
              <div className="metric-big-number">124,500+</div>
              <div className="metric-progress-wrapper">
                <div className="metric-progress-bar">
                  <div className="metric-progress-fill" style={{ width: '85%' }}></div>
                </div>
                <span className="metric-progress-label">85% of 2025 Goal</span>
              </div>
            </div>

            {/* Card 2: In School */}
            <div className="metric-card">
              <div className="metric-icon-small">
                <GraduationCap size={24} color="#f5a623" />
              </div>
              <h3 className="metric-card-title">In School</h3>
              <p className="metric-card-sub">Children actively enrolled in formal education programs.</p>
              <div className="metric-medium-number">45,200</div>
            </div>

            {/* Card 3: Protected from Malnutrition */}
            <div className="metric-card">
              <h3 className="metric-card-title">Protected from Malnutrition</h3>
              <p className="metric-card-sub">Infants and children receiving consistent nutritional support.</p>
              <div className="metric-medium-number">78,000</div>
            </div>

            {/* Card 4: Communities Engaged */}
            <div className="metric-card metric-communities-card">
              <div className="metric-communities-text">
                <h3 className="metric-card-title">Communities Engaged</h3>
                <p className="metric-card-sub">We work at the grassroots level, partnering with local leaders to ensure sustainable change.</p>
                <div className="metric-medium-number highlight-orange">340+ Regions</div>
              </div>
              <div className="metric-map-graphic">
                <img 
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=400&q=80" 
                  alt="Udaan Regional coverage map" 
                  className="regional-map-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. YEARLY GROWTH & DIRECT VS INDIRECT IMPACT */}
      <section className="section-padding bg-white">
        <div className="container growth-split-grid">
          {/* Left Column: Yearly Growth Bar Chart */}
          <div className="growth-chart-card">
            <h2 className="growth-section-title">Yearly Growth</h2>
            <p className="growth-section-sub">Our continuous effort to expand reach year over year.</p>

            <div className="bars-list">
              {yearlyGrowthData.map((item) => {
                const barWidth = `${(item.value / maxGrowthValue) * 100}%`;
                return (
                  <div key={item.year} className="bar-row">
                    <span className="bar-year">{item.year}</span>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: barWidth }}></div>
                    </div>
                    <span className="bar-value">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Direct vs Indirect Impact */}
          <div className="ripple-impact-card">
            <h2 className="growth-section-title">Direct vs Indirect Impact</h2>
            <p className="growth-section-sub">Understanding the ripple effect of our interventions.</p>

            <div className="impact-types-list">
              <div className="impact-type-box direct-impact-box">
                <div className="impact-type-header">
                  <div className="impact-badge-dot direct-dot"></div>
                  <span className="impact-badge-text direct-text">DIRECT IMPACT</span>
                </div>
                <p className="impact-type-desc">
                  Tangible support provided to individuals: nutritious meals served, scholarships awarded, and medical treatments funded.
                </p>
              </div>

              <div className="impact-type-box indirect-impact-box">
                <div className="impact-type-header">
                  <div className="impact-badge-dot indirect-dot"></div>
                  <span className="impact-badge-text indirect-text">INDIRECT IMPACT</span>
                </div>
                <p className="impact-type-desc">
                  Long-term benefits to the community: Improved local economies, heightened health awareness, and generational educational uplift.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GLOBAL GOALS ALIGNMENT (SDGs) */}
      <section className="section-padding bg-warm">
        <div className="container">
          <div className="section-title-wrap">
            <h2 className="section-title">Global Goals Alignment</h2>
            <p className="section-subtitle">
              Our work directly contributes to the <strong>United Nations Sustainable Development Goals (SDGs)</strong>, ensuring a structured approach to global betterment.
            </p>
          </div>

          <div className="sdg-cards-grid">
            <div className="sdg-card">
              <div className="sdg-icon-circle sdg-orange">
                <Utensils size={26} color="#d64232" />
              </div>
              <h3 className="sdg-title">Zero Hunger</h3>
              <p className="sdg-desc">SDG Goal 2: End hunger and improve child nutrition.</p>
            </div>

            <div className="sdg-card">
              <div className="sdg-icon-circle sdg-red">
                <GraduationCap size={26} color="#c5192d" />
              </div>
              <h3 className="sdg-title">Quality Education</h3>
              <p className="sdg-desc">SDG Goal 4: Ensure inclusive, equitable schooling.</p>
            </div>

            <div className="sdg-card">
              <div className="sdg-icon-circle sdg-green">
                <HeartHandshake size={26} color="#4c9f38" />
              </div>
              <h3 className="sdg-title">Good Health</h3>
              <p className="sdg-desc">SDG Goal 3: Promote healthy lives & maternal care.</p>
            </div>

            <div className="sdg-card">
              <div className="sdg-icon-circle sdg-blue">
                <Users size={26} color="#dd1367" />
              </div>
              <h3 className="sdg-title">Reduced Inequalities</h3>
              <p className="sdg-desc">SDG Goal 10: Empower marginalized communities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRANSPARENCY IN ACTION (REPORT DOWNLOADS) */}
      <section className="section-padding bg-white" id="reports">
        <div className="container">
          <div className="transparency-action-banner">
            <div className="transparency-action-text">
              <h2>Transparency in Action</h2>
              <p>
                Dive deeper into our data, financials, and comprehensive impact analysis.
                Download our latest reports to see exactly how resources are allocated.
              </p>
            </div>

            <div className="report-downloads-col">
              {impactReports.map((rep) => (
                <button
                  key={rep.id}
                  type="button"
                  className="report-download-btn"
                  onClick={() => handleDownloadReport(rep)}
                  aria-label={`Download ${rep.title}`}
                >
                  <span>{rep.title}</span>
                  <Download size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR METHODOLOGY */}
      <section className="section-padding bg-warm">
        <div className="container">
          <div className="section-title-wrap">
            <h2 className="section-title">Our Methodology</h2>
            <p className="section-subtitle">
              Data integrity is central to our mission. We employ rigorous tracking and independent audits to ensure every number reported reflects a genuine, lasting impact on a child's life.
            </p>
          </div>

          <div className="impact-methodology-grid">
            <div className="impact-methodology-card">
              <div className="im-icon-box">
                <Search size={24} color="#e86014" />
              </div>
              <h3 className="im-card-title">INDEPENDENT AUDITS</h3>
              <p className="im-card-desc">
                Annual verification by third-party evaluators to confirm program efficacy.
              </p>
            </div>

            <div className="impact-methodology-card">
              <div className="im-icon-box">
                <TrendingUp size={24} color="#e86014" />
              </div>
              <h3 className="im-card-title">REAL-TIME TRACKING</h3>
              <p className="im-card-desc">
                Digital systems deployed in the field for immediate data collection.
              </p>
            </div>

            <div className="impact-methodology-card">
              <div className="im-icon-box">
                <CheckSquare size={24} color="#e86014" />
              </div>
              <h3 className="im-card-title">LONGITUDINAL STUDIES</h3>
              <p className="im-card-desc">
                Tracking children over 5-10 years to measure sustainable outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
