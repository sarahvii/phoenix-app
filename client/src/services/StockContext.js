import React, { createContext, useState } from "react";

const StockContext = createContext();

const StockProvider = ({ children }) => {
  const [calculatedValsList, setCalculatedValsList] = useState([]);

  return (
    <StockContext.Provider value={{ calculatedValsList, setCalculatedValsList }}>
      {children}
    </StockContext.Provider>
  );
};

export { StockContext, StockProvider };
