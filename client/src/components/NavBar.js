import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const NavBar = ({searchBar}) => {
  return (
    <>
      <Nav>
        <NavItems>
          <ListItem>
            <StyledLink to="/portfolio">
              <StyledIcon icon={faHouse} title='Portfolio' />
            </StyledLink>
            <StyledLink to="/about">
              <StyledIcon icon={faCircleInfo} title='About'/>
            </StyledLink>
          </ListItem>
        </NavItems>
        <h1>Phoenix Trading</h1>
        <SearchBar>
          {searchBar}
        </SearchBar>

      </Nav>
    </>
  );
}

const Nav = styled.nav`
  background-color: hsl(215,90%,32.7%);
  color: white;
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
  color: white;

  &:hover {
    color: #00b4d8;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  height: 40px;
  width: 40px;
  margin-right: 10px;
`;

export default NavBar;
