import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import HomeBox from './containers/HomeBox';
import PortfolioBox from './containers/PortfolioBox';
import StockBox from './containers/StockBox';
import SearchBar from './components/SearchBar';
import PortfolioStocksService from './services/PortfolioStocksService';

function App() {
  const [portfolioStocks, setPortfolioStocks] = useState(null);

  const fetchStocksFromDatabase = useCallback(() => {
    PortfolioStocksService.getStocks()
      .then((data) => {
        setPortfolioStocks(data);
        console.log("db data", data); 
      });
  }, []);

  useEffect(() => {
    fetchStocksFromDatabase();
  }, [fetchStocksFromDatabase]);

  return (
    <div className="App">
      <NavBar />
      <SearchBar />
      <HomeBox />
      {portfolioStocks !== null && <PortfolioBox portfolioStocks={portfolioStocks} />}
      <StockBox />
    </div>
  );
}

export default App;
