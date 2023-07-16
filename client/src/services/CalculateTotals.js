  //this function is used to calculate the total value of the portfolio and the total profit/loss of the portfolio
  const calculateTotals = (calculatedValsList, setTotalPortfolioValue, setTotalPortfolioProfitLoss, setProfitLossPercentage, setIsProfit) => {
    let totalValue = 0;
    let totalProfitLoss = 0;
    let profitLossPercentage = 0;

    calculatedValsList.forEach((stock) => {
      totalValue += stock.currentTotalValue;
      totalProfitLoss += stock.profitLoss;
    });

    setTotalPortfolioValue(totalValue);
    setTotalPortfolioProfitLoss(totalProfitLoss);

    if (totalValue !== 0) {
      profitLossPercentage = (totalProfitLoss / totalValue) * 100;
      setProfitLossPercentage(profitLossPercentage);
    }

    if (totalProfitLoss > 0) {
      setIsProfit(true);
    }
  };

  export default calculateTotals;