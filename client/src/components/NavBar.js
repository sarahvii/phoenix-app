import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const NavBar = ({searchBar}) => {
  return (
    <>
      <Nav>
        <NavItems>
          <ListItem>
            <StyledLink to="/portfolio">
              <StyledIcon icon={faHouse} />
            </StyledLink>
          </ListItem>
        </NavItems>
        <SearchBar>
          {searchBar}
        </SearchBar>

      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px; 
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const ListItem = styled.li`
  list-style-type: none;
  margin-right: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-right: 10px;
  font-weight: bold;
  font-size: 20px;
  color: black;

  &:hover {
    color: blue;
  }

  &:hover:after {
    content: ' Portfolio';
    display: inline;
    width: 0;
    height: 2px;
    transition: width 7ms ease-in-out;
    z-index: 1;

  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  height: 40px;
  width: 40px;
`;

export default NavBar;
