const baseURL = 'http://localhost:9000/api/orders'

const PortfolioStocksService = {
    getStocks() {
        return fetch(baseURL)
        .then(res => res.json())
    },
    postStock(payload) {
        return fetch(baseURL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
    }
}

export default PortfolioStocksService;