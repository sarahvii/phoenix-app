import React, { useState, useEffect } from 'react';
import NewsList from './NewsList';
import styled from 'styled-components';

const NewsPanel = ({ containerType, selectedStock }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let url;
      if (containerType === 'home') {
        url = 'https://finnhub.io/api/v1/news?category=general&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010';
      } else if (containerType === 'portfolio') {
        url = 'https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2023-01-01&to=2023-06-01&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010';
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('newsdata', data);
        setNews(data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching news: ', error);
      }
    };

    fetchData();
  }, [containerType]);

  useEffect(() => {
    const fetchStockNews = async () => {
      if (containerType === 'stock' && selectedStock) {
        const url = `https://finnhub.io/api/v1/company-news?symbol=${selectedStock}&from=2023-01-01&to=2023-06-01&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          console.log('stockNewsData', data);
          setNews(data.slice(0, 5));
        } catch (error) {
          console.error('Error fetching stock news: ', error);
        }
      }
    };

    fetchStockNews();
  }, [containerType, selectedStock]);

  return (
    <NewsPanelContainer>
      <NewsList news={news} />
    </NewsPanelContainer>
  );
};

const NewsPanelContainer = styled.div`
  overflow-x: scroll;
  white-space: wrap;
`;

export default NewsPanel;
