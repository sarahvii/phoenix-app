import calculateTotals from '../services/CalculateTotals';

describe('calculateTotals', () => {
  it('calculates portfolio totals and profit/loss percentage correctly', () => {
    const calculatedValsList = [
      { currentTotalValue: 1000, profitLoss: 200 },
      { currentTotalValue: 1500, profitLoss: -100 },
      { currentTotalValue: 800, profitLoss: 50 },
    ];

    const setTotalPortfolioValue = jest.fn();
    const setTotalPortfolioProfitLoss = jest.fn();
    const setProfitLossPercentage = jest.fn();
    const setIsProfit = jest.fn();

    calculateTotals(
      calculatedValsList,
      setTotalPortfolioValue,
      setTotalPortfolioProfitLoss,
      setProfitLossPercentage,
      setIsProfit
    );

    expect(setTotalPortfolioValue).toHaveBeenCalledWith(3300);
    expect(setTotalPortfolioProfitLoss).toHaveBeenCalledWith(150);
    expect(setProfitLossPercentage).toHaveBeenCalledWith(150 / 3300 * 100);
    expect(setIsProfit).toHaveBeenCalledWith(true);
  });

  it('handles zero total portfolio value', () => {
    const calculatedValsList = [];

    const setTotalPortfolioValue = jest.fn();
    const setTotalPortfolioProfitLoss = jest.fn();
    const setProfitLossPercentage = jest.fn();
    const setIsProfit = jest.fn();

    calculateTotals(
      calculatedValsList,
      setTotalPortfolioValue,
      setTotalPortfolioProfitLoss,
      setProfitLossPercentage,
      setIsProfit
    );

    expect(setTotalPortfolioValue).toHaveBeenCalledWith(0);
    expect(setTotalPortfolioProfitLoss).toHaveBeenCalledWith(0);
    expect(setProfitLossPercentage).toHaveBeenCalledWith(0);
    expect(setIsProfit).toHaveBeenCalledWith(false);
  });
});
