import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import HomeBox from './containers/HomeBox';
import PortfolioBox from './containers/PortfolioBox';
import StockBox from './containers/StockBox';
import SearchBar from './components/SearchBar';
import PortfolioStocksService from './services/PortfolioStocksService';

function App() {

  const [portfolioStocks, setPortfolioStocks] = useState(null);


  //get stocks from database
  useEffect(() => {
    PortfolioStocksService.getStocks()
    .then((data) => {
      setPortfolioStocks(data)
      console.log("db data", data) //this is the data from the db
    })
  }, []);


  return (
    <div className="App">
      <NavBar />
      <SearchBar/>
      <HomeBox/>
      {portfolioStocks !== null && <PortfolioBox portfolioStocks={portfolioStocks} />}
      <StockBox/>
    </div>
  );
}

export default App;
