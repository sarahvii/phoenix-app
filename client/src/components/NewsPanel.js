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
        const currentDate = new Date().toISOString().slice(0,10);
        const fromDate = new Date();
        fromDate.setFullYear(fromDate.getFullYear() -1);
        const from = fromDate.toISOString().slice(0, 10);
        url = `https://finnhub.io/api/v1/company-news?symbol=AAPL&from=${from}&to=${currentDate}&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setNews(data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching news: ', error);
      }
    };

    fetchData();
  }, [containerType]);

  useEffect(() => {
    const fetchStockNews = async () => {
      if (containerType === 'stock' && selectedStock) {
        const currentDate = new Date().toISOString().slice(0,10);
        const fromDate = new Date();
        fromDate.setFullYear(fromDate.getFullYear() -1);
        const from = fromDate.toISOString().slice(0, 10);
        const url = `https://finnhub.io/api/v1/company-news?symbol=${selectedStock}&from=${from}&to=${currentDate}&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          setNews(data.slice(0, 10));
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
  overflow: auto;
  white-space: wrap;
`;

export default NewsPanel;

