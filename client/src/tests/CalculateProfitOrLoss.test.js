import calculateProfitOrLoss from '../services/CalculateProfitOrLoss';

describe('calculateProfitOrLoss', () => {
    let orders;

    beforeEach(() => {
        orders = [
            { type: 'buy', sharesQuantity: 10, pricePerShare: 50, date: '2023-08-01' },
            { type: 'sell', sharesQuantity: 5, pricePerShare: 60, date: '2023-08-05' },

        ];
    });

    it('calculates profit for a sequence of buy and sell orders', () => {
        const currentPrice = 70;

        const result = calculateProfitOrLoss(orders, currentPrice);

        // Calculate expected profit/loss value
        const expectedProfitLoss = (5 * 70) - (10 * 50); // (5 shares * $70) - (10 shares * $50)
  
        const expectedIsProfit = expectedProfitLoss > 0;

        expect(result.profitLoss).toBe(expectedProfitLoss);
        expect(result.isProfit).toBe(expectedIsProfit);
        
    });

});