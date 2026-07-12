import React from 'react';
import { Layout, Server, Wrench, Layers } from 'lucide-react';

const Skills = () => {
  const skillGroups = [
    {
      title: 'Frontend Development',
      icon: <Layout className="group-icon frontend" size={24} />,
      skills: [
        { name: 'HTML5 & CSS3', level: '90%' },
        { name: 'JavaScript (ES6+)', level: '85%' },
        { name: 'TypeScript', level: '70%' },
        { name: 'React.js', level: '80%' },
        { name: 'React Native', level: '75%' },
        { name: 'Figma (UI/UX)', level: '70%' }
      ]
    },
    {
      title: 'Backend & Database',
      icon: <Server className="group-icon backend" size={24} />,
      skills: [
        { name: 'Node.js & Express.js', level: '80%' },
        { name: 'Java (JSP, Servlets)', level: '75%' },
        { name: 'Python', level: '60%' },
        { name: 'MongoDB', level: '80%' },
        { name: 'MySQL', level: '75%' },
        { name: 'OOP & Data Structures', level: '80%' }
      ]
    },
    {
      title: 'Developer Tools',
      icon: <Wrench className="group-icon tools" size={24} />,
      skills: [
        { name: 'Git & GitHub', level: '85%' },
        { name: 'VS Code & IntelliJ', level: '90%' },
        { name: 'Postman (API Testing)', level: '80%' },
        { name: 'Docker Fundamentals', level: '65%' }
      ]
    },
    {
      title: 'Process & Delivery',
      icon: <Layers className="group-icon process" size={24} />,
      skills: [
        { name: 'Agile & Scrum Methodologies', level: '85%' },
        { name: 'Sprint Tracking (Jira/GitHub)', level: '80%' },
        { name: 'Requirement Analysis', level: '75%' },
        { name: 'Team Coordination & Delivery', level: '80%' }
      ]
    }
  ];

  return (
    <section id="skills" className="section-container">
      <div className="section-header">
        <h2 className="section-title">Technical Skills</h2>
        <div className="section-underline"></div>
      </div>

      <div className="skills-grid">
        {skillGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="skills-card">
            <div className="skills-card-header">
              {group.icon}
              <h3 className="skills-group-title">{group.title}</h3>
            </div>
            <div className="skills-list">
              {group.skills.map((skill, skillIdx) => (
                <div key={skillIdx} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}</span>
                  </div>
                  <div className="skill-bar-container">
                    <div 
                      className="skill-bar-progress" 
                      style={{ width: skill.level }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
