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
  display: inline-flex;`

export default NewsList
