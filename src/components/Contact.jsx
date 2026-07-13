import React from 'react';
import { Mail, Send, ArrowUpRight } from 'lucide-react';

const Linkedin = ({ size = 24, ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


const Contact = () => {
  return (
    <section id="contact" className="section-container">
      <div className="section-header">
        <h2 className="section-title">Get in Touch</h2>
        <div className="section-underline"></div>
      </div>

      <div className="contact-layout">
        <div className="contact-card email-card">
          <div className="contact-icon-wrapper">
            <Mail size={28} />
          </div>
          <div className="contact-info">
            <h3 className="contact-card-title">Email Me</h3>
            <p className="contact-card-subtext">Direct professional inquiries</p>
            <a 
              href="mailto:asinijayaweera03@gmail.com" 
              className="contact-action-btn"
            >
              <span>asinijayaweera03@gmail.com</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="contact-card linkedin-card">
          <div className="contact-icon-wrapper">
            <Linkedin size={28} />
          </div>
          <div className="contact-info">
            <h3 className="contact-card-title">LinkedIn</h3>
            <p className="contact-card-subtext">Let's connect professionally</p>
            <a 
              href="https://linkedin.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-action-btn"
            >
              <span>Asini - LinkedIn</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
