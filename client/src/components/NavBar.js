import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';


const NavBar = ({searchBar}) => {
  return (
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
      <Logo>Phoenix Trading</Logo>
      <SearchBar>
        {searchBar}
      </SearchBar>
    </Nav>
  );
}

const Nav = styled.nav`
  background-color: hsl(215,90%,32.7%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const ListItem = styled.li`
  list-style-type: none;
  margin-right: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-right: 10px;
  font-weight: bold;
  font-size: 20px;
  color: white;
  transition: color 0.3s ease;

  &:hover {
    color: #00b4d8;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  height: 40px;
  width: 40px;
  margin-right: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Logo = styled.h1`
  font-size: 40px;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;

export default NavBar;

