import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StockProvider } from './services/StockContext';
import { PortfolioProvider } from './services/PortfolioContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import backgroundImage from './images/background3.jpg';

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url(${backgroundImage});
    background-size: cover; 
    background-repeat: no-repeat;
    background-attachment: fixed; 
    margin: 0;
    padding: 0;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
