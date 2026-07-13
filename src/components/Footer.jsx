import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Asini Jayaweera. All rights reserved.
          </p>
          <p className="footer-sub">
            Built with React &bull; Vite &bull; Vanilla CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
