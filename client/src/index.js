import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StockProvider } from './services/StockContext';
import { PortfolioProvider } from './services/PortfolioContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
  background-color: hsla(215,90%,37.7%,0.9);
  }
`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
  <StockProvider>
    <GlobalStyle />
    <PortfolioProvider>
    <App />
    </PortfolioProvider>
  </StockProvider>
  </Router>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
