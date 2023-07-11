const baseURL = 'http://localhost:9000/api/orders'

const PortfolioStocksService = {
    getStocks() {
        return fetch(baseURL)
        .then(res => res.json())
    },
}

export default PortfolioStocksService;