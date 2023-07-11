use phoenix_stocks;
db.dropDatabase();

db.orders.insertMany(
  [
    {
      "stockName": "Apple",
      "ticker": "AAPL",
      "totalShares": 100,
      "orders": [
        {
          "sharesQuantity": 100,
          "date": "2022-08-01",
          "pricePerShare": 161.01,
          "type": "buy"
        }
      ]
    },
    {
      "stockName": "Meta",
      "ticker": "META",
      "totalShares": 200,
      "orders": [
        {
          "sharesQuantity": 200,
          "date": "2022-08-01",
          "pricePerShare": 157.25,
          "type": "buy"
        }
      ]
    },
    {
      "stockName": "Alphabet Inc.",
      "ticker": "GOOG",
      "totalShares": 150,
      "orders": [
        {
          "sharesQuantity": 150,
          "date": "2022-08-01",
          "pricePerShare": 115.53,
          "type": "buy"
        }
      ]
    },
    {
      "stockName": "Tesla",
      "ticker": "TSLA",
      "totalShares": 50,
      "orders": [
        {
          "sharesQuantity": 50,
          "date": "2022-08-01",
          "pricePerShare": 301.28,
          "type": "buy"
        }
      ]
    }
  ]
  
  
)
  