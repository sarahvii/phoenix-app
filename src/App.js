import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import HomeBox from './containers/HomeBox';
import PortfolioBox from './containers/PortfolioBox';
import StockBox from './containers/StockBox';
import SearchBar from './components/SearchBar';

function App() {


  return (
    <div className="App">
      <NavBar />
      <SearchBar/>
      <HomeBox/>
      <PortfolioBox/>
      <StockBox/>
    </div>
  );
}

export default App;
