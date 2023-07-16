const addValueToStock = (portfolioStocks, currentTotalValuesList) => {
    console.log("currentTotalValuesList", currentTotalValuesList);
    let newPortfolioStocks = [...portfolioStocks];

    if (currentTotalValuesList && currentTotalValuesList.length > 0) {
      for (let i = 0; i < portfolioStocks.length; i++) {
        const stock = { ...portfolioStocks[i] };
        const value = currentTotalValuesList[i];
        stock.value = value;

        newPortfolioStocks[i] = stock;
      }
    }

    return newPortfolioStocks;
  };


  export default addValueToStock;