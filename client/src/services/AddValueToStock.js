const addValueToStock = (portfolioStocks, currentTotalValuesList) => {
    let newPortfolioStocks = [...portfolioStocks];

    if (currentTotalValuesList && currentTotalValuesList.length > 0) {
      for (let i = 0; i < portfolioStocks.length; i++) {
        const stock = { ...portfolioStocks[i] };
        for (let j = 0; j < currentTotalValuesList.length; j++) {
          if (stock.ticker === currentTotalValuesList[j].ticker) {
            stock.values = currentTotalValuesList[j];
          }
        }
        newPortfolioStocks[i] = stock;
      }
    }

    return newPortfolioStocks;
  };


  export default addValueToStock;