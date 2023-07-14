import React from 'react'
import styled from 'styled-components';

const NewsItem = ( {item} ) => {
  return (
    <>

    <NewsItemContainer>
    <h3>{item.headline}</h3>
      <a href={item.url} target="_blank" rel="noreferrer">
        <img src={item.image} alt={item.headline} width="250rem" height="auto"/>
      </a>
    </NewsItemContainer>
    </>
  )
};

const NewsItemContainer = styled.div`
border: 5px solid black;
margin: 10px;
padding: 20px;
display: flex;
min-width: 15rem;
flex-direction: column;
justify-content: space-between;
align-items: center;
`

export default NewsItem;
