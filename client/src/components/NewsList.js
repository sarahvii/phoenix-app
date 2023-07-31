import React from 'react'
import NewsItem from './NewsItem'
import styled from 'styled-components';

const NewsList = ( { news } ) => {
  return (
    <NewsListContainer>
      {news.map((item, index, image) => (
        <NewsItem key={index} item={item} image={image} />
      ))}
    </NewsListContainer>
  )
};

const NewsListContainer = styled.div`
  display: flex;
  overflow-x: auto;

  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
}
  width: 100%;
  margin: 0 auto;


`

export default NewsList;
