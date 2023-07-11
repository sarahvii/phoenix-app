import React, { useState, useEffect } from 'react'
import NewsList from './NewsList';
import styled from 'styled-components';

const NewsPanel = () => {
  const [generalNews, setGeneralNews] = useState([]);

  useEffect(() => {
    const getGeneralNews = () => {
      return fetch('https://finnhub.io/api/v1/news?category=general&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010')
      .then((response) => response.json())
      .then(data => setGeneralNews(data.slice(0,5)))
    };
    getGeneralNews();
  }, [])




  return (
    <NewsPanelContainer>
      <p>NEWS</p>
      <NewsList generalNews={generalNews}/>
    </NewsPanelContainer>
  )
};

const NewsPanelContainer = styled.div`
overflow-x: scroll;
white-space: wrap;
`;



export default NewsPanel
