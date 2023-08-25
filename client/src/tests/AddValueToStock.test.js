import addValueToStock from '../services/AddValueToStock';

describe('addValueToStock', () => {
  it('adds calculated values to portfolio stocks', () => {
    const portfolioStocks = [
      { ticker: 'AAPL', name: 'Apple Inc.' },
      { ticker: 'GOOGL', name: 'Alphabet Inc.' },
    ];

    const currentTotalValuesList = [
      { ticker: 'AAPL', profitLoss: 100, totalShares: 50 },
      { ticker: 'GOOGL', profitLoss: -50, totalShares: 25 },
    ];

    const expectedPortfolioStocks = [
      {
        ticker: 'AAPL',
        name: 'Apple Inc.',
        values: { ticker: 'AAPL', profitLoss: 100, totalShares: 50 },
      },
      {
        ticker: 'GOOGL',
        name: 'Alphabet Inc.',
        values: { ticker: 'GOOGL', profitLoss: -50, totalShares: 25 },
      },
    ];

    const result = addValueToStock(portfolioStocks, currentTotalValuesList);

    expect(result).toEqual(expectedPortfolioStocks);
  });

  it('returns the same portfolio stocks when no calculated values', () => {
    const portfolioStocks = [
      { ticker: 'AAPL', name: 'Apple Inc.' },
      { ticker: 'GOOGL', name: 'Alphabet Inc.' },
    ];

    const currentTotalValuesList = [];

    const result = addValueToStock(portfolioStocks, currentTotalValuesList);

    expect(result).toEqual(portfolioStocks);
  });
});
