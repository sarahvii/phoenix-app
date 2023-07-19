import React, { useEffect, useState, useCallback, useContext } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import HomeBox from './containers/HomeBox';
import PortfolioBox from './containers/PortfolioBox';
import StockBox from './containers/StockBox';
import SearchBar from './components/SearchBar';
import PortfolioStocksService from './services/PortfolioStocksService';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioContext from './services/PortfolioContext'; // added

function App() {
  const [portfolioStocks, setPortfolioStocks] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const { shouldRefresh } = useContext(PortfolioContext); // added

  // const fetchStocksFromDatabase = useCallback(() => {
  //   PortfolioStocksService.getStocks()
  //     .then((data) => {
  //       setPortfolioStocks(data);
  //       console.log("db data", data); 
  //     });
  // }, []);


  // // this is to avoid an infinite loop until we have buttons to add stocks to the portfolio
  // useEffect(() => {
  //   fetchStocksFromDatabase();
  // }, [fetchStocksFromDatabase]);

  const fetchStocksFromDatabase = () => {
    PortfolioStocksService.getStocks()
      .then((data) => {
        setPortfolioStocks(data);
        console.log("data fetched from DB", data); 
        console.log("shouldRefresh status: ", shouldRefresh);
      });
  }

  useEffect(() => {
    fetchStocksFromDatabase();
  }, [shouldRefresh]); // updated



  return (
    <div className="App">
      <NavBar searchBar={<SearchBar setSelectedStock={setSelectedStock} />} />
      <Routes>
        <Route path="/" element={<HomeBox/>} />
        <Route path="/portfolio" element={portfolioStocks !== null && <PortfolioBox portfolioStocks={portfolioStocks} setSelectedStock={setSelectedStock} />} />
        <Route path="/stocks" element={<StockBox selectedStock={selectedStock} portfolioStocks={portfolioStocks}/>} />
      </Routes>
    </div>
  );
}

export default App;
