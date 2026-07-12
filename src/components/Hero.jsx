import React from 'react';
import { ArrowRight, FileText, Send } from 'lucide-react';

const Hero = () => {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-background">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>

      <div className="hero-content">
        <div className="badge-container">
          <span className="hero-badge">Available for Opportunities</span>
        </div>

        <h1 className="hero-title">
          Hi, I am <span className="gradient-text">Asini Jayaweera</span>
        </h1>
        
        <h2 className="hero-subtitle">
          Full-Stack Developer specializing in <span className="highlight-text">Web & Mobile Development</span>
        </h2>
        
        <p className="hero-tagline">
          Motivated IT undergraduate at SLIIT specializing in building robust web and mobile applications using the MERN stack and React Native, with a strong foundation in Java, data structures, and Agile team delivery.
        </p>

        <div className="hero-ctas">
          <button 
            className="btn btn-primary"
            onClick={() => handleScrollTo('projects')}
          >
            <span>View Projects</span>
            <ArrowRight size={18} />
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={() => handleScrollTo('contact')}
          >
            <span>Let's Talk</span>
            <Send size={18} />
          </button>

          <a 
            href="/Asini_Jayaweera_CV.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-tertiary"
          >
            <FileText size={18} />
            <span>Read CV</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
