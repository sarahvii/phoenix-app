import React, { useState } from "react";
// import "./styles.css";
import CompanyProfileService from "./CompanyProfileService";

export default function SearchBar() {
  const [symbol, setSymbol] = useState('');
  const [details, setDetails] = useState(null);

  const handleClick = async () => {
    try {
    const response = await CompanyProfileService.detail(symbol);
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
