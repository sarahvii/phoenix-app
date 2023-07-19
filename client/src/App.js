import React, { useEffect, useState, useCallback, useContext } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import HomeBox from './containers/HomeBox';
import PortfolioBox from './containers/PortfolioBox';
import StockBox from './containers/StockBox';
import SearchBar from './components/SearchBar';
import About from './components/About';
import Footer from './components/Footer';
import PortfolioStocksService from './services/PortfolioStocksService';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioContext from './services/PortfolioContext';
import { set } from 'date-fns';
import WatchList from './components/WatchList';

function App() {
  const [portfolioStocks, setPortfolioStocks] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [watchList, setWatchList] = useState([]); 
  const { shouldRefresh } = useContext(PortfolioContext);


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
  }, [shouldRefresh]);

  const toggleWatchList = (ticker, logo) => {
    //if stock is in watchlist, remove it, else add it
    if (watchList.some((item) => item.ticker === ticker)) {
      setWatchList(watchList.filter((item) => item.ticker !== ticker));
      return false;

    } else {
      setWatchList([...watchList, { ticker: ticker, logo: logo }]);
      return true;
    }
  };
  
  
  
  



  return (
    <div className="App">
      <NavBar searchBar={<SearchBar setSelectedStock={setSelectedStock} />} />
      <WatchList watchList={watchList}/>
      <Routes>
        <Route path="/" element={<HomeBox/>} />
        <Route path="/portfolio" element={portfolioStocks !== null && <PortfolioBox portfolioStocks={portfolioStocks} setSelectedStock={setSelectedStock} />} />
        <Route path="/stocks" element={<StockBox selectedStock={selectedStock} portfolioStocks={portfolioStocks} toggleWatchList={toggleWatchList} watchList={watchList} setWatchList={setWatchList}/>} />
        <Route path="/about" element={<About/>}/> 
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
