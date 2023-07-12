const BASE_URL = "https://finnhub.io/api/v1/stock/";

export default {
  detail
}

function detail(symbol) {
  return fetch(`${BASE_URL}profile2?symbol=${symbol}&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010`).then((res) => res.json());
}
