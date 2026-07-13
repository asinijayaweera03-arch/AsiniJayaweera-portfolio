import React from 'react';
import { Award, Clock, ShieldCheck, BookOpen } from 'lucide-react';

const Certificates = () => {
  const completedCertificates = [
    {
      title: 'AI/ML Engineer Stage-1',
      issuer: 'Sri Lankan Institute of Information Technology (SLIIT)',
      type: 'Specialization'
    },
    {
      title: 'Web Design for Beginners',
      issuer: 'University of Moratuwa',
      type: 'Technical Certification'
    },
    {
      title: 'Apply Docker Fundamentals for Modern Application Delivery',
      issuer: 'Coursera',
      type: 'Cloud & DevOps'
    },
    {
      title: 'Project Management Foundations',
      issuer: 'LinkedIn Learning',
      type: 'Project Management'
    },
    {
      title: 'Advanced Certificate in English',
      issuer: 'National Institute of Business Management (NIBM)',
      type: 'Language Proficiency'
    }
  ];

  const inProgressQualifications = [
    {
      title: 'BSc (Hons) in Information Technology',
      issuer: 'Sri Lankan Institute of Information Technology (SLIIT)',
      status: 'Current Undergraduate (2024 - Present)',
      details: 'Focusing on core software engineering principles, database systems, OOP, data structures, and project delivery.'
    }
  ];

  return (
    <section id="certificates" className="section-container">
      <div className="section-header">
        <h2 className="section-title">Certifications & Credentials</h2>
        <div className="section-underline"></div>
      </div>

      <div className="certificates-layout">
        {/* Completed Certificates */}
        <div className="completed-certs-section">
          <h3 className="certs-subtitle">
            <Award className="cert-icon-header" size={20} />
            <span>Completed Certifications</span>
          </h3>
          <div className="certs-grid">
            {completedCertificates.map((cert, index) => (
              <div key={index} className="cert-card">
                <div className="cert-badge-icon">
                  <ShieldCheck size={20} />
                </div>
                <div className="cert-info">
                  <span className="cert-type">{cert.type}</span>
                  <h4 className="cert-title">{cert.title}</h4>
                  <p className="cert-issuer">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress Qualifications */}
        <div className="inprogress-certs-section">
          <h3 className="certs-subtitle">
            <Clock className="cert-icon-header in-progress" size={20} />
            <span>In-Progress Credentials</span>
          </h3>
          <div className="inprogress-grid">
            {inProgressQualifications.map((qual, index) => (
              <div key={index} className="inprogress-card">
                <div className="inprogress-status-badge">In Progress</div>
                <h4 className="inprogress-title">{qual.title}</h4>
                <p className="inprogress-issuer">{qual.issuer}</p>
                <span className="inprogress-status">
                  <BookOpen size={14} style={{ marginRight: '6px' }} />
                  {qual.status}
                </span>
                <p className="inprogress-details">{qual.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
