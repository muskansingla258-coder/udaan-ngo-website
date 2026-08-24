import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, ArrowRight, ChevronDown, ChevronUp, Shield, 
  Award, CheckCircle2, User, Users, Globe, Building2,
  Sparkles, Send
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { programsData } from '../data/programsData';
import { homeImpactStories } from '../data/storiesData';
import './Home.css';

/**
 * Home Page (Assigned to Person 1)
 * Syllabus Concepts Demonstrated:
 * - React Component architecture & JSX
 * - Custom Hooks (useDocumentTitle)
 * - useState for Interactive Accordion and Newsletter
 * - Controlled input with event handling
 * - Array .map() rendering with unique keys
 * - Semantic HTML5 (<main>, <section>, <article>)
 * - Browser Storage (localStorage)
 */
export default function Home({ onOpenDonate, showToast }) {
  useDocumentTitle('Home');

  // State for Accordion expand/collapse
  const [expandedStoryId, setExpandedStoryId] = useState(homeImpactStories[0]?.id || null);
  
  // State for Join the Movement Newsletter
  const [bannerEmail, setBannerEmail] = useState('');

  const toggleAccordion = (id) => {
    setExpandedStoryId((prev) => (prev === id ? null : id));
  };

  const handleBannerSubscribe = (e) => {
    e.preventDefault();
    if (!bannerEmail || !bannerEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    try {
      const subscribers = JSON.parse(localStorage.getItem('udaan_newsletter') || '[]');
      if (!subscribers.includes(bannerEmail)) {
        subscribers.push(bannerEmail);
        localStorage.setItem('udaan_newsletter', JSON.stringify(subscribers));
      }
      showToast('Welcome to the movement! Thank you for subscribing.', 'success');
      setBannerEmail('');
    } catch (err) {
      console.error(err);
      showToast('Subscribed successfully!', 'success');
    }
  };

  return (
    <main className="home-page">
      {/* 1. HERO SECTION */}
      <section className="home-hero">
        <div className="hero-overlay"></div>
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Let's ensure <br />
              <span className="hero-highlight">happy childhoods</span> for <br />
              India's children
            </h1>
            <p className="hero-subtitle">
              Across the country, every day millions of children face hardships.
              You can change their lives today. Be their champion for change.
            </p>
            <div className="hero-actions">
              <button 
                type="button" 
                className="btn-primary hero-btn"
                onClick={onOpenDonate}
              >
                Donate to Save a Child's Life <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW DO YOU WANT TO HELP CHILDREN TODAY? */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="section-title-wrap">
            <h2 className="section-title">
              How do you want to <span className="highlight">help children</span> today?
            </h2>
            <p className="section-subtitle">
              Comprehensive care and direct human-being programs addressing child welfare at its roots.
            </p>
          </div>

          <div className="program-cards-grid">
            {programsData.map((prog) => (
              <article key={prog.id} className="program-card">
                <div className="program-card-img-wrap">
                  <img src={prog.image} alt={prog.title} className="program-img" loading="lazy" />
                  <span className="program-tag-badge">
                    <Heart size={12} fill="#e86014" color="#e86014" /> {prog.tag}
                  </span>
                </div>
                <div className="program-card-body">
                  <h3 className="program-card-title">{prog.title}</h3>
                  <p className="program-card-text">{prog.description}</p>
                  <button 
                    type="button" 
                    className="program-donate-link" 
                    onClick={onOpenDonate}
                  >
                    Donate <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR APPROACH AT ALL LEVELS */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="section-title-wrap">
            <h2 className="section-title">
              Our approach is modeled around bringing change <span className="highlight">at all levels</span>
            </h2>
            <p className="section-subtitle">
              Child-centered holistic development requires multi-stakeholder collaboration:
              from individual homes to community-wide advocacy and governance partnerships.
            </p>
          </div>

          <div className="levels-grid">
            <div className="level-card">
              <div className="level-icon-wrap">
                <User size={24} color="#e86014" />
              </div>
              <h3 className="level-title">Child</h3>
              <p className="level-desc">Direct learning kits, nutrition packs, and emotional safe-havens.</p>
            </div>

            <div className="level-card">
              <div className="level-icon-wrap">
                <Users size={24} color="#e86014" />
              </div>
              <h3 className="level-title">Community</h3>
              <p className="level-desc">Empowering local parents, teachers, and panchayats for self-reliance.</p>
            </div>

            <div className="level-card">
              <div className="level-icon-wrap">
                <Globe size={24} color="#e86014" />
              </div>
              <h3 className="level-title">Public</h3>
              <p className="level-desc">Mobilizing citizen awareness on children's rights and equality.</p>
            </div>

            <div className="level-card">
              <div className="level-icon-wrap">
                <Building2 size={24} color="#e86014" />
              </div>
              <h3 className="level-title">Government</h3>
              <p className="level-desc">Engaging public administration for sustainable policy reforms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. IMPACT STORIES (ACCORDION) */}
      <section className="section-padding bg-peach-light">
        <div className="container">
          <div className="section-title-wrap">
            <h2 className="section-title">
              Impact <span className="highlight">Stories</span>
            </h2>
            <p className="section-subtitle">
              Real transformations powered by your generous support and commitment.
            </p>
          </div>

          <div className="accordion-wrap">
            {homeImpactStories.map((story) => {
              const isExpanded = expandedStoryId === story.id;
              return (
                <div key={story.id} className={`accordion-item ${isExpanded ? 'active' : ''}`}>
                  <button 
                    type="button" 
                    className="accordion-header"
                    onClick={() => toggleAccordion(story.id)}
                    aria-expanded={isExpanded}
                  >
                    <div className="accordion-header-text">
                      <h4>{story.title}</h4>
                      <p className="accordion-sub">{story.subtitle}</p>
                    </div>
                    <div className="accordion-icon">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="accordion-body">
                      <p>{story.content}</p>
                      <Link to="/our-stories" className="story-read-link">
                        Read more full stories <ArrowRight size={14} />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. WHY CHILDREN? (SPLIT SECTION) */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="split-grid">
            <div className="split-image-col">
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80" 
                alt="Happy Indian children running outdoors" 
                className="split-img"
                loading="lazy"
              />
            </div>
            <div className="split-content-col">
              <h2 className="section-title text-left">
                Why <span className="highlight">Children?</span>
              </h2>
              <p className="split-text">
                Children represent 100% of our future. When you educate a child, protect them from malnutrition, and give them a nurturing environment, you break the generational cycle of poverty.
              </p>
              <p className="split-text">
                Udaan's grassroots interventions target the most critical years of child development (ages 3–16), ensuring lifelong foundations in cognitive learning, health, and dignity.
              </p>
              <Link to="/our-stories" className="split-cta-link">
                MEET OUR REAL HEROES <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRUST & TRANSPARENCY */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="section-title-wrap">
            <h2 className="section-title">
              Trust & <span className="highlight">Transparency</span>
            </h2>
          </div>

          <div className="trust-grid">
            <div className="trust-card">
              <div className="trust-icon-box">
                <Shield size={28} color="#f5a623" />
              </div>
              <h3 className="trust-title">Most Trusted NGO</h3>
              <p className="trust-desc">Peer-reviewed governance and verified field impact tracking.</p>
            </div>

            <div className="trust-card">
              <div className="trust-icon-box">
                <Award size={28} color="#f5a623" />
              </div>
              <h3 className="trust-title">GuideStar Platinum</h3>
              <p className="trust-desc">Highest level of transparency in financial & operational reporting.</p>
            </div>

            <div className="trust-card">
              <div className="trust-icon-box">
                <CheckCircle2 size={28} color="#f5a623" />
              </div>
              <h3 className="trust-title">Top 100 Nonprofits</h3>
              <p className="trust-desc">Recognized nationally for excellence in child rights and welfare.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. QUOTE SECTION */}
      <section className="quote-section">
        <div className="container">
          <div className="quote-card">
            <span className="quote-mark quote-start">“</span>
            <p className="quote-text">
              If we all do something, then together there is no problem that we cannot solve!
            </p>
            <div className="quote-divider"></div>
            <h4 className="quote-author">Ripan Kapur</h4>
            <p className="quote-role">Founder, Child Rights and You (CRY) / Guiding Vision</p>
            <span className="quote-mark quote-end">”</span>
          </div>
        </div>
      </section>

      {/* 8. IMPACT YOU HELPED ACHIEVE */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="stats-gradient-box">
            <h3 className="stats-box-title">
              Impact <span className="highlight-dark">YOU</span> helped achieve
            </h3>
            <div className="stats-numbers-grid">
              <div className="stat-item">
                <span className="stat-big-number">23M+</span>
                <span className="stat-label">Children Impacted</span>
              </div>
              <div className="stat-item">
                <span className="stat-big-number">91%</span>
                <span className="stat-label">District Coverage</span>
              </div>
              <div className="stat-item">
                <span className="stat-big-number">96%</span>
                <span className="stat-label">Program Fund Utilization</span>
              </div>
              <div className="stat-item">
                <span className="stat-big-number">90%</span>
                <span className="stat-label">Girl Child Retention</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. JOIN THE MOVEMENT (FULL-WIDTH ORANGE BANNER) */}
      <section className="join-movement-banner">
        <div className="container join-movement-container">
          <div className="join-movement-text">
            <h2>Join the Movement</h2>
            <p>Every small effort counts. Sign up to receive urgent calls for action and quarterly stories of hope.</p>
          </div>
          <form className="join-movement-form" onSubmit={handleBannerSubscribe}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={bannerEmail}
              onChange={(e) => setBannerEmail(e.target.value)}
              required
              aria-label="Email for joining movement"
            />
            <button type="submit" className="btn-subscribe-banner">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
