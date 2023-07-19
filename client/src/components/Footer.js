import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      <a href="#top" onClick={scrollToTop}>Back to Top</a>
      <p>&copy; 2023 CodeClan. All rights reserved. Developed by Sarah Smith and Paul Cumming.</p>
    </footer>
  );
};

export default Footer;
