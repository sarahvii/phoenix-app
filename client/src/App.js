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
  const [selectedStock, setSelectedStock] = useState(null);

  const fetchStocksFromDatabase = useCallback(() => {
    PortfolioStocksService.getStocks()
      .then((data) => {
        setPortfolioStocks(data);
        console.log("db data", data); 
      });
  }, []);


  //this is to avoid an infinite loop until we have buttons to add stocks to the portfolio
  useEffect(() => {
    fetchStocksFromDatabase();
  }, [fetchStocksFromDatabase]);

  return (
    <div className="App">
      <NavBar />
      <SearchBar setSelectedStock={setSelectedStock} />
      {/* <HomeBox /> */}
      {portfolioStocks !== null && <PortfolioBox portfolioStocks={portfolioStocks} setSelectedStock={setSelectedStock} />}
      <StockBox selectedStock={selectedStock}/>
    </div>
  );
}

export default App;
