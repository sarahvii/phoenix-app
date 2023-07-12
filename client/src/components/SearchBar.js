import React, { useState } from "react";

const BASE_URL = "https://finnhub.io/api/v1/stock/";

export default function SearchBar() {
  const [symbol, setSymbol] = useState('');
  const [details, setDetails] = useState(null);

  const detail = (symbol) => {
    return fetch(`${BASE_URL}profile2?symbol=${symbol}&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010`).then((res) => res.json());
  }

  const handleClick = async () => {
    try {
    const response = await detail(symbol);
    console.log(response);
    setDetails(response);
  } catch (err) {
    setDetails({ error: "symbol not found" });
  }
};

  return (
    <div className="Search Bar">
      <p>Search for a stock</p>
      <input value={symbol} onChange={evt => setSymbol(evt.target.value)} />
      <button onClick={handleClick}>Search</button>

      { details && (
        details.error ? (
          <h1>{details.error}</h1>
        ) : (
          <div>
            <h2>{details.name}</h2>
            <p>{details.ticker}</p>
            <img src={details.logo} alt={details.name}/>
          </div>
      ))}

    </div>
  );
}
