import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


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
        {watchList.map((item, index) => (
          <ListItem key={index} onClick={() => onClick(item.ticker)}>
          <StyledLink to="/stocks">
                <LogoImage src={String(item.logo)} alt="Company Logo" />
            </StyledLink>
          </ListItem>
        ))}
      </List>
    </WatchListContainer>
  );
};

const WatchListContainer = styled.div`
  margin-top: 20px;
  display: flex;
  margin-left: 40px;
  align-items: center;
  justify-content: center;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
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
