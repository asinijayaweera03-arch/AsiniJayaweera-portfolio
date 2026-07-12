import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const About = () => {
  const education = [
    {
      degree: 'BSc(Hons) - Information Technology',
      institution: 'Sri Lankan Institute of Information Technology (SLIIT)',
      period: '2024 - Present',
      location: 'Malabe, Sri Lanka'
    },
    {
      degree: 'G.C.E Advanced Level (Biology)',
      institution: 'Dharmapala Vidyalaya Pannipitiya',
      period: 'Passed in 2022',
      location: 'Pannipitiya, Sri Lanka'
    },
    {
      degree: 'G.C.E. Ordinary Level',
      institution: 'Girls’ High School Mt.Lavinia',
      period: 'Passed in 2019',
      location: 'Mount Lavinia, Sri Lanka'
    }
  ];

  return (
    <section id="about" className="section-container">
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
        <div className="section-underline"></div>
      </div>

      <div className="about-grid">
        <div className="about-info">
          <p className="about-text">
            I am a motivated IT undergraduate at SLIIT with a strong interest in software development and modern web and mobile technologies. Currently, I am actively developing applications using the MERN stack and React Native while strengthening my foundations in Java programming and data structures. I thrive on solving complex analytical challenges, continuously expanding my technical skills, and collaborating with teams to deliver innovative, real-world solutions.
          </p>
          <div className="about-quick-facts">
            <div className="fact-item">
              <span className="fact-label">Role Focus</span>
              <span className="fact-value">Full-Stack Web & Mobile Dev</span>
            </div>
            <div className="fact-item">
              <span className="fact-label">Languages</span>
              <span className="fact-value">JavaScript, TypeScript, Java, Python</span>
            </div>
            <div className="fact-item">
              <span className="fact-label">Approach</span>
              <span className="fact-value">Agile, Iterative & Detail-Oriented</span>
            </div>
          </div>
        </div>

        <div className="about-education">
          <h3 className="about-subtitle">Education History</h3>
          <div className="timeline">
            {education.map((edu, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot">
                  <GraduationCap size={16} />
                </div>
                <div className="timeline-content">
                  <span className="timeline-date">
                    <Calendar size={14} />
                    {edu.period}
                  </span>
                  <h4 className="timeline-degree">{edu.degree}</h4>
                  <p className="timeline-institution">{edu.institution}</p>
                  <span className="timeline-location">
                    <MapPin size={12} />
                    {edu.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
