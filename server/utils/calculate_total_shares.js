const calculateTotalShares = stock => {
  let totalShares = 0;
  stock.orders.forEach(order => {
    if (order.type === 'buy') {
      totalShares += order.sharesQuantity;
    } else if (order.type === 'sell') {
      totalShares -= order.sharesQuantity;
    }
  });
  if (totalShares < 0) {
    totalShares = 0;
  }
  return totalShares;
};

module.exports = calculateTotalShares;
