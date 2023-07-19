import React from 'react';
import styled from 'styled-components';

const WatchList = ({ watchList }) => {
  if (watchList === null || watchList.length === 0) {
    return null;
  }

  return (
    <WatchListContainer>
      <List>
        {watchList.map((item, index) => (
          <ListItem key={index}>
            <LogoImage src={String(item.logo)} alt="Company Logo" />
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

export default WatchList;
