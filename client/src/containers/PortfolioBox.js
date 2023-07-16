import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import PieChart from "../components/PieChart";
import StockList from "../components/StockList";
import NewsPanel from "../components/NewsPanel";
import { StockContext } from "../services/StockContext";
import calculateProfitLoss from "../services/CalculateProfitOrLoss";
import PortfolioContext from "../services/PortfolioContext";

const PortfolioBox = ({ portfolioStocks, setSelectedStock }) => {
  const { calculatedValsList, setCalculatedValsList } = useContext(StockContext);
  const { setPortfolioData } = useContext(PortfolioContext); // added
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [totalPortfolioProfitLoss, setTotalPortfolioProfitLoss] = useState(0);
  const [profitLossPercentage, setProfitLossPercentage] = useState(0);
  const [isProfit, setIsProfit] = useState(false);
  const [portfolioStocksWithValues, setPortfolioStocksWithValues] = useState([]);
  const { shouldRefresh, setShouldRefresh } = useContext(PortfolioContext); // added

  // const fetchUpdatedPortfolioData = async () => {  //added, but also in buy panel.
  //   try {
  //     const response = await fetch("http://localhost:9000/api/orders");
  //     if (response.ok) {
  //       const data = await response.json();
  //       setPortfolioData(data);
  //     } else {
  //       console.error("Failed to fetch updated portfolio data");
  //     }
  //   } catch (error) {
  //     console.error("Error while fetching updated portfolio data:", error);
  //   }
  // };

  useEffect(() => {
  if (shouldRefresh) {
    // fetchUpdatedPortfolioData();
    setShouldRefresh(false);
  }
}, [shouldRefresh])

  useEffect(() => {


    console.log("calculatedValsList", calculatedValsList);

    const calculateTotals = () => {
      let totalValue = 0;
      let totalProfitLoss = 0;
      let profitLossPercentage = 0;

      calculatedValsList.forEach((stock) => {
        totalValue += stock.currentTotalValue;
        totalProfitLoss += stock.profitLoss;
      });

      setTotalPortfolioValue(totalValue);
      setTotalPortfolioProfitLoss(totalProfitLoss);

      if (totalValue !== 0) {
        profitLossPercentage = (totalProfitLoss / totalValue) * 100;
        setProfitLossPercentage(profitLossPercentage);
      }

      if (totalProfitLoss > 0) {
        setIsProfit(true);
      }
    };

    calculateTotals();
    setPortfolioStocksWithValues(addValueToStock(portfolioStocks, calculatedValsList));
    console.log("portfolioStocksWithValues", portfolioStocksWithValues);

  }, [calculatedValsList, portfolioStocks, setPortfolioData]); // added porfolioStocksWithValues - take out

  const handleCalculatedValues = (stock, liveCompanyData, livePriceData) => {
    if (liveCompanyData && livePriceData) {
      const calculatedVals = calculateProfitLoss(stock.orders, livePriceData.c);
      setCalculatedValsList((prevList) => [...prevList, calculatedVals]);
    }
  };

  const addValueToStock = (portfolioStocks, currentTotalValuesList) => {
    console.log("currentTotalValuesList", currentTotalValuesList);
    let newPortfolioStocks = [...portfolioStocks];

    if (currentTotalValuesList && currentTotalValuesList.length > 0) {
      for (let i = 0; i < portfolioStocks.length; i++) {
        const stock = { ...portfolioStocks[i] };
        const value = currentTotalValuesList[i];
        stock.value = value;

        newPortfolioStocks[i] = stock;
      }
    }

    return newPortfolioStocks;
  };

  return (
    <StockContext.Provider value={{ calculatedValsList, setCalculatedValsList }}>
      <PortfolioBoxContainer>
        <h2>Portfolio Overview</h2>
        <PortfolioBoxSummeryPieContainer>
          <PortfolioSummaryContainer>
            <SummeryTitle>Performance</SummeryTitle>
            <SummeryValuesContainer>
              <TotalPortfolioValue>
                Total Portfolio Value: ${totalPortfolioValue.toFixed(2)}
              </TotalPortfolioValue>
              <TotalPortfolioProfitLoss isProfit={isProfit}>
                Total Portfolio Profit/Loss: ${totalPortfolioProfitLoss.toFixed(2)}
              </TotalPortfolioProfitLoss>
              <PercentageProfitLoss isProfit={isProfit}>
                Percentage Profit/Loss: {profitLossPercentage.toFixed(2)}%
              </PercentageProfitLoss>
            </SummeryValuesContainer>
          </PortfolioSummaryContainer>
          <PieChart portfolioStocks={portfolioStocksWithValues} setSelectedStock={setSelectedStock} />
        </PortfolioBoxSummeryPieContainer>
        <StockList
          portfolioStocks={portfolioStocksWithValues}
          setSelectedStock={setSelectedStock}
          handleCalculatedValues={handleCalculatedValues}
        />
        <NewsPanel containerType="portfolio" portfolioStocks={portfolioStocksWithValues} />
      </PortfolioBoxContainer>
    </StockContext.Provider>
  );
};

const PortfolioBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 5px solid black;
  margin: 10px;
`;

const PortfolioBoxSummeryPieContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 50vh;
  margin: 10px;
`;

const PortfolioSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const TotalPortfolioValue = styled.h4`
  margin: 10px;
  padding: 0px;
  color: black;
`;

const TotalPortfolioProfitLoss = styled.h4`
  margin: 10px;
  padding: 0px;
  color: ${(props) => (props.isProfit ? "green" : "red")};
`;

const PercentageProfitLoss = styled.h4`
  margin: 10px;
  padding: 0px;
`;

const SummeryTitle = styled.h2`
  margin: 10px;
  padding: 0px;
`;

const SummeryValuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: 10px;
  padding: 20px;
`;

export default PortfolioBox;
