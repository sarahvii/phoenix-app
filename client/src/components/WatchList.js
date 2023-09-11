import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const WatchList = ({ watchList, setSelectedStock }) => {
  if (watchList === null || watchList.length === 0) {
    return null;
  }

  const onClick = (ticker) => {
    setSelectedStock(ticker);
  }

  return (
    <WatchListContainer>
      <List>
      <Title>
        Watchlist
      </Title>
        <WatchListIcon icon={faStar} />
        {watchList.map((item, index) => (
          <ListItem key={index} onClick={() => onClick(item.ticker)}>
          <StyledLink to="/stocks">
                <LogoImage title={item.ticker} src={String(item.logo)} alt="Company Logo" />
            </StyledLink>
          </ListItem>
        ))}
      </List>
    </WatchListContainer>
  );
};

const Title = styled.h2`
  margin-right: 10px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  `;

const WatchListIcon = styled(FontAwesomeIcon)`
  color: yellow;
  margin-right: 100px;
  font-size: 0.2;
`;


const WatchListContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(255, 255, 255, 0.3));
  border-radius: 20px;
  padding-left: 20px;
  width: 75%;
  margin: 2cqmax;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListItem = styled.li`
  display: inline-block;
  margin-right: 10px;
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const StyledLink = styled(Link)`
`;


export default WatchList;
