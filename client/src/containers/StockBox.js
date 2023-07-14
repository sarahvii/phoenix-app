import React, { useState, useEffect } from "react";
import styled from "styled-components";

import BuyPanel from "../components/BuyPanel";
import NewsPanel from "../components/NewsPanel";
// import NewsList from "../components/NewsList";

const StockBox = ({selectedStock}) => {

    const [livePriceData, setLivePriceData] = useState(null);
    const [liveCompanyData, setLiveCompanyData] = useState(null);
  
  
    useEffect(() => {
      if (!selectedStock) {
        return; 
      }

      fetch(
        `https://finnhub.io/api/v1/quote?symbol=${selectedStock}&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010`
      )
        .then((res) => res.json())
        .then((data) => setLivePriceData(data));
        console.log("live price data in StockBox", livePriceData);
    }, [selectedStock]);
  
    useEffect(() => {
      if (!selectedStock) {
        return; 
      }

      fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${selectedStock}&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010`
      )
        .then((res) => res.json())
        .then((data) => setLiveCompanyData(data));
        console.log("live company data in StockBox", liveCompanyData);
    }, [selectedStock]);
  
    if (!liveCompanyData || !livePriceData) {
      return "Loading...";
    }
  
    const { logo } = liveCompanyData;


    return ( 
        <>
        <h2>StockBox</h2>
        <StockBoxContainer>
          <LogoContainer>
            <LogoLink href={liveCompanyData.weburl} target="_blank">
              <Logo src={logo} alt="company logo" />
            </LogoLink>
            <StockTitleSummeryContainer>
              <StockTitleContainer>
                <StockTitle>{liveCompanyData.name}</StockTitle><StockTicker>({liveCompanyData.ticker})</StockTicker>
              </StockTitleContainer>
              <StockTitleContainer>
                <StockExchange>{liveCompanyData.exchange}.</StockExchange><Currency> Currency in {liveCompanyData.currency}</Currency>
              </StockTitleContainer>
              <StockSummaryContainer>
                <StockCurrentPrice>${livePriceData.c}</StockCurrentPrice>
                <StockPriceChange value={livePriceData.d}> ${livePriceData.d.toFixed(2)}</StockPriceChange>
                <PriceChangePercent value={livePriceData.dp}> ({livePriceData.dp.toFixed(2)}%)  </PriceChangePercent>
              </StockSummaryContainer>
            </StockTitleSummeryContainer>
          </LogoContainer>
        <StockDetailsChartContainer>
          <StockDetailsContainer>
              <DetailContainer>
                <DetailKey>Market cap</DetailKey><DetailValue>${liveCompanyData.marketCapitalization.toFixed(2)}</DetailValue>
              </DetailContainer>
              <DetailContainer>
                <DetailKey>Previous close</DetailKey><DetailValue>${livePriceData.pc}</DetailValue>
              </DetailContainer>
              <DetailContainer>
                <DetailKey>Open</DetailKey><DetailValue>${livePriceData.o}</DetailValue>
              </DetailContainer>
              <DetailContainer>
                <DetailKey>High</DetailKey><DetailValue>${livePriceData.h}</DetailValue>
              </DetailContainer>
              <DetailContainer>
                <DetailKey>Low</DetailKey><DetailValue>${livePriceData.l}</DetailValue>
              </DetailContainer>
          </StockDetailsContainer>
          <StockChart>Stock Chart</StockChart>
        </StockDetailsChartContainer>
          <BuyPanel />

      </StockBoxContainer>
      <NewsPanel containerType="stock" selectedStock={selectedStock} />

        </>
        
     );


};

const StockBoxContainer = styled.div`
  border: 5px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin: 10px;
  width: 100%;
  height: 100%;
  `;

  const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  `;

  const StockTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  margin: 0px
  `;

  const StockSummaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-top: 10px;
  `;

  const StockTitleSummeryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  margin-bottom: 0px;
  margin-left: 50px;
  `;

  const StockDetailsChartContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 100%;
  `
  const StockTitle = styled.p`
  padding: 0px;
  color: black;
  margin-right: 10px;
  margin-bottom: 0px;
  font-weight: bold;
  font-size: 20px;
  `;

  const StockTicker = styled.p`
  display: inline;
  padding: 0px;
  color: black;
  margin-bottom: 0px;
  font-weight: bold;
  font-size: 20px;
  `
  const StockExchange = styled.p`
  padding: 0px;
  color: grey;
  margin-right: 10px;
  margin-bottom: 0px;
  margin-top: 0px;
  font-style: italic;
  `;

  const Currency = styled.p`
  display: inline;
  padding: 0px;
  color: grey;
  margin-right: 10px;
  margin-bottom: 0px;
  margin-top: 0px;
  font-style: italic;
  `;


const Logo = styled.img`
  width: 200px;
  height: 200px;
  margin: 10px;
  padding: 10px;
  border-radius: 50%;
  `;

  const LogoLink = styled.a`
  text-decoration: none;
  `;

  const StockChart = styled.div`
  width: 25%;
  height: 25%;
  margin: 10px;
  border: 3px solid black;
  `;

  const StockCurrentPrice = styled.p`
  padding: 0px;
  color: black;
  margin-right: 10px;
  margin-top: 0px;
  font-weight: bold;
  font-size: 28px;

  `
  
  const StockPriceChange = styled.p`
  padding: 0px;
  color: black;
  margin-right: 10px;
  margin-top: 0px;
  color: ${props => props.value > 0 ? "green" : "red"};
  `

  const PriceChangePercent = styled.p`
  padding: 0px;
  color: ${props => props.value > 0 ? "green" : "red"};
  margin-top: 0px;

  `


  const StockDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 50%;
  margin: 10px;
  `

  const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  `;

  const DetailKey = styled.span`
  padding: 0px; 
  margin-right: 20px;
  `

  const DetailValue = styled.span`
  padding: 0px;
  margin: 0px;
  font-weight: bold;
  `


export default StockBox;