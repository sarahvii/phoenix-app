import React, { useEffect, useState, useContext, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import PieChart from "../components/PieChart";
import StockList from "../components/StockList";
import NewsPanel from "../components/NewsPanel";
import { StockContext } from "../services/StockContext";
import calculateProfitLoss from "../services/CalculateProfitOrLoss";
import addValueToStock from "../services/AddValueToStock";
import calculateTotals from "../services/CalculateTotals";
import { PageContainer, OverviewTitle, ExternalContainerColumn, ExternalContainerRow, InternalContainerColumn, DisplayContainer } from "../components/SharedStyles";


const PortfolioBox = ({ portfolioStocks, setSelectedStock }) => {
  const { calculatedValsList, setCalculatedValsList } = useContext(StockContext);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [totalPortfolioProfitLoss, setTotalPortfolioProfitLoss] = useState(0);
  const [profitLossPercentage, setProfitLossPercentage] = useState(0);
  const [isProfit, setIsProfit] = useState(false);
  const [portfolioStocksWithValues, setPortfolioStocksWithValues] = useState([]);

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


  return (
    <StockContext.Provider value={{ calculatedValsList, setCalculatedValsList }}>
    <OverviewTitle>Portfolio Overview</OverviewTitle>
      <PageContainer>

        <ExternalContainerRow>
          <InternalContainerColumn>
            <PortfolioBoxTitle>Performance</PortfolioBoxTitle>
            <DisplayContainer>

                <TotalValueLabel>Total Portfolio Value:</TotalValueLabel>  
                <TotalPortfolioValue>
                 ${totalPortfolioValue.toFixed(2)}
                </TotalPortfolioValue>
                  {totalPortfolioProfitLoss === 0 ? null : <UpDownIcon icon={faCaretUp} value={totalPortfolioProfitLoss} />}
                <SummaryLabel>
                  {totalPortfolioProfitLoss > 0 ? "The value of your portfolio has increased by:" : "The value of your portfolio has decreased by:"}
                </SummaryLabel>
                <TotalPortfolioProfitLoss >
                  <ValueChange value={totalPortfolioProfitLoss}> ${Math.abs(totalPortfolioProfitLoss.toFixed(2))}</ValueChange>
                </TotalPortfolioProfitLoss>
                <PercentageProfitLoss value={totalPortfolioProfitLoss}>
                {Math.abs(profitLossPercentage.toFixed(2))}%
                </PercentageProfitLoss>

            </DisplayContainer>
          </InternalContainerColumn>

          <InternalContainerColumn>
            <PortfolioBoxTitle>Portfolio Breakdown</PortfolioBoxTitle>

            <DisplayContainer ref={chartContainerRef}>
              <PieChart portfolioStocks={portfolioStocksWithValues} setSelectedStock={setSelectedStock} />
            </DisplayContainer>

          </InternalContainerColumn>
        </ExternalContainerRow>

          <ExternalContainerColumn>
            {/* <StockListInternalContainer> */}
              <StockList
                portfolioStocks={portfolioStocksWithValues}
                setSelectedStock={setSelectedStock}
                handleCalculatedValues={handleCalculatedValues}
              />
            {/* </StockListInternalContainer> */}
          </ExternalContainerColumn>

        <NewsPanel containerType="portfolio" portfolioStocks={portfolioStocksWithValues} />
      </PageContainer>
    </StockContext.Provider>
  );
};

const SummaryLabel = styled.p`
  font-size: 12px;
`;

const TotalValueLabel = styled.p`
  font-size: 12px
`;

const TotalPortfolioValue = styled.h4`
  margin: 10px;
  padding: 0px;
  color: black;
  font-weight: bold;
  font-size: 48px;
  `;

const TotalPortfolioProfitLoss = styled.h4`
  margin: 10px;
  padding: 0px;
  color: black;
`;

const PercentageProfitLoss = styled.h4`
  margin: 10px;
  padding: 0px;
  color: ${props => {
      if (props.value > 0) {
        return "green";
      } else if (props.value < 0) {
        return "red";
      } else {
        return "black";
      }
    } };
`;

const PortfolioBoxTitle = styled.h2`
  margin: 10px 0px;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
`;

const ValueChange = styled.span`
  color: black;
  font-weight: bold;
  font-size: 32px;
  `
const UpDownIcon = styled(FontAwesomeIcon)`
  height: 150px;
  color: ${props => {
      if (props.value > 0) {
        return "green";
      } else if (props.value < 0) {
        return "red";
      } else {
        return "black";
      }
    }};
  transform: ${props => props.value < 0 ? "scaleY(-1)" : "scaleY(1)"};
  `


export default PortfolioBox;
