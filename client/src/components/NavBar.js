import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <p>NavBar</p>
      <nav>
        <ul>
          <li>
            <Link to="/portfolio">Portfolio</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
