import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StyledFooter>
      <a href="#top" onClick={scrollToTop}>
        Back to Top
      </a>
      <p>&copy; 2023 CodeClan. All rights reserved. Developed by Sarah Smith and Paul Cumming.</p>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  color: #fff;
  padding: 20px;
  text-align: center;
  font-size: 14px;

  a {
    color: #fff;
    text-decoration: underline;

    &:hover {
      color: #000;
    }
  }
`;

export default Footer;
