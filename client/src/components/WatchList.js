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
  font-size: 18px;
  font-weight: bold;
  color: white;
  `;

const WatchListIcon = styled(FontAwesomeIcon)`
  color: yellow;
  margin-right: 100px;
  font-size: 0.2;
`;


const WatchListContainer = styled.div`
  margin-top: 20px;
  display: flex;
  margin-left: 40px;
  align-items: start;
  justify-content: start;
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
