import React, { useState, useMemo } from 'react';
import { 
  MapPin, ChevronDown, Play, Quote, Heart, 
  Sparkles, Filter, Users 
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { featuredStories, videoStories, changemakers, communityQuotes } from '../data/storiesData';
import StoryDetailModal from '../components/StoryDetailModal';
import VideoModal from '../components/VideoModal';
import './OurStories.css';

/**
 * Our Stories Page (Assigned to Person 2)
 * Syllabus Concepts Demonstrated:
 * - React Hooks: useState, useMemo
 * - useMemo for performant filtering of story items
 * - Modal state management & child-to-parent event flow
 * - List rendering with Array.map()
 * - Accessible interactive buttons and cards
 */
export default function OurStories() {
  useDocumentTitle('Our Stories');

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Modal states
  const [activeStory, setActiveStory] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  // useMemo hook to filter stories without unnecessary recalculations
  const filteredStories = useMemo(() => {
    if (selectedCategory === 'all') {
      return featuredStories;
    }
    return featuredStories.filter((story) => story.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <main className="our-stories-page">
      {/* 1. HERO SECTION */}
      <section className="stories-hero-section">
        <div className="container">
          <div className="section-title-wrap">
            <h1 className="section-title">Voices of Impact</h1>
            <p className="section-subtitle">
              Every number in our impact report represents a life changed. Read the personal stories of resilience, hope, and transformation from the children and communities we serve.
            </p>
          </div>

          {/* Dynamic Category Filter Tabs (Demonstrating useMemo) */}
          <div className="category-filter-bar">
            <button 
              type="button"
              className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Stories
            </button>
            <button 
              type="button"
              className={`filter-btn ${selectedCategory === 'education' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('education')}
            >
              Education
            </button>
            <button 
              type="button"
              className={`filter-btn ${selectedCategory === 'healthcare' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('healthcare')}
            >
              Healthcare
            </button>
            <button 
              type="button"
              className={`filter-btn ${selectedCategory === 'arts' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('arts')}
            >
              Arts & Expression
            </button>
          </div>
        </div>
      </section>

      {/* 2. FEATURED STORIES GRID */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="stories-cards-grid">
            {filteredStories.map((story) => (
              <article key={story.id} className="story-card">
                <div className="story-card-image-wrap">
                  <img src={story.image} alt={story.title} className="story-card-img" loading="lazy" />
                </div>

                <div className="story-card-body">
                  <div className="story-meta-row">
                    <span className="story-tag-badge">{story.tag}</span>
                    <span className="story-location-tag">
                      <MapPin size={13} color="#796e67" /> {story.location}
                    </span>
                  </div>

                  <h3 className="story-title">{story.title}</h3>
                  <p className="story-summary">{story.summary}</p>

                  <button 
                    type="button" 
                    className="btn-read-more"
                    onClick={() => setActiveStory(story)}
                    aria-label={`Read full story about ${story.title}`}
                  >
                    Read More <ChevronDown size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VIDEO STORIES */}
      <section className="section-padding bg-warm">
        <div className="container">
          <div className="section-title-wrap">
            <h2 className="section-title">Video Stories</h2>
            <p className="section-subtitle">
              Watch the impact unfold in real-time.
            </p>
          </div>

          <div className="video-stories-grid">
            {videoStories.map((vid) => (
              <div 
                key={vid.id} 
                className="video-story-card"
                onClick={() => setActiveVideo(vid)}
                role="button"
                tabIndex="0"
                onKeyDown={(e) => { if (e.key === 'Enter') setActiveVideo(vid); }}
                aria-label={`Play video: ${vid.title}`}
              >
                <div className="video-thumbnail-wrap">
                  <img src={vid.thumbnail} alt={vid.title} className="video-thumb" loading="lazy" />
                  <div className="video-play-btn-circle">
                    <Play size={24} fill="#e86014" color="#e86014" />
                  </div>
                </div>
                <div className="video-card-info">
                  <h3 className="video-card-title">{vid.title}</h3>
                  <span className="video-duration">{vid.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CHANGEMAKERS */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="section-title-wrap">
            <h2 className="section-title">Changemakers</h2>
            <p className="section-subtitle">
              Meet the dedicated team and volunteers driving our mission forward.
            </p>
          </div>

          <div className="changemakers-grid">
            {changemakers.map((person) => (
              <div key={person.id} className="changemaker-card">
                <div className="changemaker-avatar-wrap">
                  <img src={person.avatar} alt={person.name} className="changemaker-avatar" loading="lazy" />
                </div>
                <h3 className="changemaker-name">{person.name}</h3>
                <span className="changemaker-role">{person.role}</span>
                <p className="changemaker-bio">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VOICE OF THE COMMUNITY */}
      <section className="section-padding bg-warm">
        <div className="container">
          <div className="section-title-wrap">
            <h2 className="section-title">Voice of the Community</h2>
          </div>

          <div className="testimonials-grid">
            {communityQuotes.map((item) => (
              <div key={item.id} className="testimonial-quote-card">
                <span className="quote-badge">“</span>
                <p className="testimonial-text">{item.quote}</p>
                <div className="testimonial-author-row">
                  <span className="quote-dash">&mdash;</span>
                  <strong>{item.author}</strong>, <span className="author-loc">{item.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Detail Modal */}
      <StoryDetailModal 
        story={activeStory} 
        isOpen={Boolean(activeStory)} 
        onClose={() => setActiveStory(null)} 
      />

      {/* Video Modal */}
      <VideoModal 
        video={activeVideo} 
        isOpen={Boolean(activeVideo)} 
        onClose={() => setActiveVideo(null)} 
      />
    </main>
  );
}
