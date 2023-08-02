import React from 'react'
import styled from 'styled-components';

const NewsItem = ( {item} ) => {
  return (
    <>
    <NewsInternalContainer>
    <NewsItemContainer>
    <h3>{item.headline}</h3>
      <a href={item.url} target="_blank" rel="noreferrer">
        <img src={item.image} alt={item.headline} width="250rem" height="auto"/>
      </a>
    </NewsItemContainer>
    </NewsInternalContainer>
    </>
  )
};

// const NewsItemContainer = styled.div`
// border: 5px solid black;
// background-color: #fff;
// box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
// border-radius: 12px;
// margin: 10px;
// padding: 20px;
// display: flex;
// min-width: 15rem;
// flex-direction: column;
// justify-content: space-between;
// align-items: center;

// `;

const NewsItemContainer = styled.div`
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 5px auto;
  padding: 20px;
  flex: 1;
  min-width: 15rem;
  max-height: 20rem;
  width: 70%;  
  
  
  &:hover {
    background-color: #DFE1E6;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
  }

  
  `;

  const NewsInternalContainer = styled.div`
  background-color: #DFE1E6;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  margin: 10px 20px 0px 20px;
  padding: 1px 1px 1px 1px;
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 80%;
  `;






export default NewsItem;
