import React, { useState, useEffect } from 'react';
import NewsList from './NewsList';
import styled from 'styled-components';
import defaultImage1 from '../images/defaultImage1.jpg';
import defaultImage2 from '../images/defaultImage2.jpg';
import defaultImage3 from '../images/defaultImage3.jpg';
import defaultImage4 from '../images/defaultImage4.jpg';
import defaultImage5 from '../images/defaultImage5.jpg';



const defaultImages = [defaultImage1, defaultImage2, defaultImage3, defaultImage4, defaultImage5];

const NewsPanel = ({ containerType, selectedStock }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let url;
      if (containerType === 'home') {
        url = `https://finnhub.io/api/v1/news?category=general&token=${process.env.REACT_APP_FINNHUB_API_TOKEN}`;
      } else if (containerType === 'portfolio') {
        const currentDate = new Date().toISOString().slice(0, 10);
        const fromDate = new Date();
        fromDate.setFullYear(fromDate.getFullYear() - 1);
        const from = fromDate.toISOString().slice(0, 10);
        url = `https://finnhub.io/api/v1/company-news?symbol=AAPL&from=${from}&to=${currentDate}&token=${process.env.REACT_APP_FINNHUB_API_TOKEN}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();

        console.log('Fetched news data:', data); // Display the fetched news data

        const updatedNews = data.slice(0, 10).map((item, index) => ({
          ...item,
          image: item.image !== '' ? item.image : defaultImages[index % defaultImages.length], // Cycle through default images
        }));

        setNews(updatedNews);
      } catch (error) {
        console.error('Error fetching news: ', error);
        // console.error('Error response:', await error.text());
      }
    };

    fetchData();
  }, [containerType]);

  useEffect(() => {
    const fetchStockNews = async () => {
      if (containerType === 'stock' && selectedStock) {
        const currentDate = new Date().toISOString().slice(0, 10);
        const fromDate = new Date();
        fromDate.setFullYear(fromDate.getFullYear() - 1);
        const from = fromDate.toISOString().slice(0, 10);
        const url = `https://finnhub.io/api/v1/company-news?symbol=${selectedStock}&from=${from}&to=${currentDate}&token=${process.env.REACT_APP_FINNHUB_API_TOKEN}`;
        try {
          const response = await fetch(url);
          const data = await response.json();

          console.log('Fetched stock news data:', data); // Display the fetched stock news data

          const updatedNews = data.slice(0, 10).map((item, index) => ({
            ...item,
            image: item.image !== '' ? item.image : defaultImages[index % defaultImages.length], // Cycle through default images using index
          }));

          setNews(updatedNews);
        } catch (error) {
          console.error('Error fetching stock news: ', error);
        }
      }
    };

    fetchStockNews();
  }, [containerType, selectedStock]);

  return (
    <NewsPanelContainer>
      <NewsLabel>Related News</NewsLabel>
      <NewsList news={news} />
    </NewsPanelContainer>
  );
};

const NewsLabel = styled.div`
  font-size: 18px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: white;
  font-weight: bold;
  padding: 0.5rem;
  margin-left: 0.5rem;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const NewsPanelContainer = styled.div`
  overflow: auto;
  white-space: wrap;
  width: 85%;
  margin: 0 auto;
`;

export default NewsPanel;
