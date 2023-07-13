import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import PieChart from "../components/PieChart";
import StockList from "../components/StockList";
import NewsPanel from "../components/NewsPanel";
import { StockContext } from "../services/StockContext";
import calculateProfitLoss from "../services/CalculateProfitOrLoss";

const PortfolioBox = ({ portfolioStocks, setSelectedStock }) => {
  const { calculatedValsList, setCalculatedValsList } = useContext(StockContext);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [totalPortfolioProfitLoss, setTotalPortfolioProfitLoss] = useState(0);
  const [profitLossPercentage, setProfitLossPercentage] = useState(0);
  const [isProfit, setIsProfit] = useState(false);

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
  }, [calculatedValsList]);

  const handleCalculatedValues = (stock, liveCompanyData, livePriceData) => {
    if (liveCompanyData && livePriceData) {
      const calculatedVals = calculateProfitLoss(stock.orders, livePriceData.c);
      setCalculatedValsList((prevList) => [...prevList, calculatedVals]);
    }
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
                Total Portfolio Value: {totalPortfolioValue.toFixed(2)}
                </TotalPortfolioValue>
                <TotalPortfolioProfitLoss isProfit={isProfit}>
                Total Portfolio Profit/Loss: {totalPortfolioProfitLoss.toFixed(2)}
                </TotalPortfolioProfitLoss>
                <PercentageProfitLoss isProfit={isProfit}>
                Percentage Profit/Loss: {profitLossPercentage.toFixed(2)}%
                </PercentageProfitLoss>
            </SummeryValuesContainer>
          </PortfolioSummaryContainer>
          <PieChart portfolioStocks={portfolioStocks} />
        </PortfolioBoxSummeryPieContainer>
        <StockList
          portfolioStocks={portfolioStocks}
          setSelectedStock={setSelectedStock}
          handleCalculatedValues={handleCalculatedValues}
        />
        <NewsPanel containerType="portfolio" portfolioStocks={portfolioStocks} />
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
  /* align-items: center; */
  height: 50vh;
  margin: 10px;
`;

const PortfolioSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const TotalPortfolioValue = styled.h3`
  margin: 10px;
  padding: 0px;
  color: black;
`;

const TotalPortfolioProfitLoss = styled.h3`
  margin: 10px;
  padding: 0px;
  color: ${(props) => (props.isProfit ? "green" : "red")};
`;

const PercentageProfitLoss = styled.h3`
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
    margin: 10px;
    padding: 20px;
`;


export default PortfolioBox;
