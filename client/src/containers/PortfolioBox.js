import React, { useEffect, useState, useContext, useRef } from "react";
import styled from "styled-components";
import PieChart from "../components/PieChart";
import StockList from "../components/StockList";
import NewsPanel from "../components/NewsPanel";
import { StockContext } from "../services/StockContext";
import calculateProfitLoss from "../services/CalculateProfitOrLoss";
import addValueToStock from "../services/AddValueToStock";
import calculateTotals from "../services/CalculateTotals";


const PortfolioBox = ({ portfolioStocks, setSelectedStock }) => {
  const { calculatedValsList, setCalculatedValsList } = useContext(StockContext);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [totalPortfolioProfitLoss, setTotalPortfolioProfitLoss] = useState(0);
  const [profitLossPercentage, setProfitLossPercentage] = useState(0);
  const [isProfit, setIsProfit] = useState(false);
  const [portfolioStocksWithValues, setPortfolioStocksWithValues] = useState([]);
  // const [pieContainerHeight, setPieContainerHeight] = useState(300);

  const  chartContainerRef = useRef(null);

  useEffect(() => {

    //this function is used to calculate the total value of the portfolio and the total profit/loss of the portfolio
    calculateTotals(calculatedValsList, setTotalPortfolioValue, setTotalPortfolioProfitLoss, setProfitLossPercentage, setIsProfit);

    setPortfolioStocksWithValues(addValueToStock(portfolioStocks, calculatedValsList));
    
  }, [calculatedValsList, portfolioStocks]);


  //this is the function that is used to get live data from each stock in the portfolio and send it up to the portfolio box to be totalled
  const handleCalculatedValues = (stock, liveCompanyData, livePriceData) => {
    if (liveCompanyData && livePriceData) {
      const calculatedVals = calculateProfitLoss(stock.orders, livePriceData.c);
      setCalculatedValsList((prevList) => [...prevList, calculatedVals]);
    }
  };

  //sets PieContainer height whenever height of HighCharts container changes
  // useEffect(() => {
  //   const chartContainer = chartContainerRef.current;
  //   if (chartContainer) {
  //     const chartHeight = chartContainer.clientHeight;
  //     setPieContainerHeight(chartHeight);
  //   }
  // }, [chartContainerRef.current])

  return (
    <StockContext.Provider value={{ calculatedValsList, setCalculatedValsList }}>
      <PortfolioOverviewTitle>Portfolio Overview</PortfolioOverviewTitle>
      <PortfolioBoxContainer>
        <PortfolioBoxSummaryPieContainer>
          <PerformanceContainer>
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
          </PerformanceContainer>
          <PieContainer>
            <PieChartTitle>Portfolio Breakdown</PieChartTitle>
            <PieChartContainer ref={chartContainerRef}>
              <PieChart portfolioStocks={portfolioStocksWithValues} setSelectedStock={setSelectedStock} />
            </PieChartContainer>
          </PieContainer>
        </PortfolioBoxSummaryPieContainer>
        <StockListContainer>
        <StockList
          portfolioStocks={portfolioStocksWithValues}
          setSelectedStock={setSelectedStock}
          handleCalculatedValues={handleCalculatedValues}
        />
        </StockListContainer>
        <NewsPanel containerType="portfolio" portfolioStocks={portfolioStocksWithValues} />
      </PortfolioBoxContainer>
    </StockContext.Provider>
  );
};

const PortfolioBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const PortfolioBoxSummaryPieContainer = styled.div`
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: row;
  height: 50vh;
  margin: 10px auto;
  width: 86%;
  flex: 1;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

`;


const PerformanceContainer = styled.div`    /// can this just be a duplicated container with pie container???
  background-color: #DFE1E6;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  margin: 10px 20px 0px 20px;
  padding: 6px 16px 16px 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const SummeryValuesContainer = styled.div`
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: 1px;
  padding: 20px;
  flex: 1;
  `;

const PieContainer = styled.div`
  background-color: #DFE1E6;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  margin: 10px 20px 0px 20px;     
  padding: 6px 16px 16px 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
  `;

const PieChartContainer = styled.div`
margin: 10px 0px;
padding: 12px;
background-color: #fff;
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
border-radius: 12px;

`;



const TotalPortfolioValue = styled.h4`
  margin: 10px;
  padding: 0px;
  color: black;
`;

const TotalPortfolioProfitLoss = styled.h4`
// background-color: pink;
  margin: 10px;
  padding: 0px;
  color: ${(props) => (props.isProfit ? "green" : "red")};
`;

const PercentageProfitLoss = styled.h4`
// background-color: pink;
  margin: 10px;
  padding: 0px;
`;

const SummeryTitle = styled.h2`
  margin: 10px 0px;
  padding: 12px;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
`;

const PieChartTitle = styled.h2`
  margin: 10px 0px;
  padding: 12px;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
`;

const StockListContainer = styled.div`
// background-color: green;
// display: flex;
// flex-direction: column;
// margin: 10px;

//   @media screen and (min-width: 768px) {
//     flex-direction: row;
//     justify-content: center;
//   }
// `;

const PortfolioOverviewTitle = styled.h2`
  background-color: hsl(215,90%,32.7%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px; 
`;


export default PortfolioBox;
