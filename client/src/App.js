import React, { useEffect, useState, useContext } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import HomeBox from './containers/HomeBox';
import PortfolioBox from './containers/PortfolioBox';
import StockBox from './containers/StockBox';
import SearchBar from './components/SearchBar';
import About from './components/About';
import Footer from './components/Footer';
import PortfolioStocksService from './services/PortfolioStocksService';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import PortfolioContext from './services/PortfolioContext';
import { set } from 'date-fns';
import WatchList from './components/WatchList';
import styled from 'styled-components';

function App() {
  const [portfolioStocks, setPortfolioStocks] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [watchList, setWatchList] = useState([]); 
  const { shouldRefresh } = useContext(PortfolioContext);
  const navigate = useNavigate();


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
      <Wrapper>
        <NavBar searchBar={<SearchBar setSelectedStock={setSelectedStock} />} />
        <WatchList watchList={watchList} setSelectedStock={setSelectedStock}/>

      </Wrapper>

      <Routes>
        <Route path="/" element={<HomeBox/>} />
        <Route path="/portfolio" element={portfolioStocks !== null && <PortfolioBox portfolioStocks={portfolioStocks} setSelectedStock={setSelectedStock} />} />
        <Route path="/stocks" element={<StockBox selectedStock={selectedStock} portfolioStocks={portfolioStocks} toggleWatchList={toggleWatchList} watchList={watchList}/>} />
        <Route path="/about" element={<About/>}/> 

      </Routes>

      <Footer/>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default App;
