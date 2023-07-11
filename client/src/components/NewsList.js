import React from 'react'
import NewsItem from './NewsItem'
import { styled } from 'styled-components';

const NewsList = ( {generalNews} ) => {
  return (
    <NewsListContainer>
      {generalNews.map((item, index, image) => (
        <NewsItem key={index} item={item} image={image} />
      ))}
    </NewsListContainer>
  )
};

const NewsListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;`

export default NewsList
