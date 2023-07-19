import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


import BuyPanel from "../components/BuyPanel";
import NewsPanel from "../components/NewsPanel";
import CandleStickChart from "../components/CandleStickChart";


// import NewsList from "../components/NewsList";

const StockBox = ({selectedStock, portfolioStocks, watchList, setWatchList, toggleWatchList}) => {

    const [livePriceData, setLivePriceData] = useState(null);
    const [liveCompanyData, setLiveCompanyData] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [stockDetails, setStockDetails] = useState(null);
    const [isWatched, setIsWatched] = useState(false);


    let isOwned = false;
    
    if (portfolioStocks !== null) {
      isOwned = portfolioStocks.some(stock => stock.ticker === selectedStock);
    }


    const retrieveStockDetails = (isOwned, selectedStock, portfolioStocks) => {
      if (isOwned) {
        portfolioStocks.map(stock => {
          if (stock.ticker === selectedStock) {
            setStockDetails(stock);
          }
        })
      }
    }



    useEffect(() => {
      if (!selectedStock) {
        return; 
      }

      fetch(
        `https://finnhub.io/api/v1/quote?symbol=${selectedStock}&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010`
      )
        .then((res) => res.json())
        .then((data) => setLivePriceData(data));
        setCurrentTime(new Date()); // Update currentTime after setting livePriceData
        retrieveStockDetails(isOwned, selectedStock, portfolioStocks);


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
    }, [selectedStock]);

    useEffect(() => {
      console.log("watchList in StockBox", watchList);
    
      if (watchList && selectedStock) {
        const selectedStockExists = watchList.some(item => item.ticker === selectedStock);
        setIsWatched(selectedStockExists);
      }
    }, [watchList, selectedStock]);
    



    //useEffects below are to allow console.logs to print after the data is fetched
      // useEffect(() => {
      //   console.log("live price data in StockBox", livePriceData);
      // }, [livePriceData]);
      
      useEffect(() => {
        console.log("live company data in StockBox", liveCompanyData);
      }, [liveCompanyData]);

    
    if (!liveCompanyData || !livePriceData) {
      return "Loading...";
    }
  
    const { logo } = liveCompanyData;

    const formattedDate = format(currentTime, "do MMMM yyyy, hh:mm:ss a");





    const OwnershipDetailsContainer = () => {

      if (!stockDetails) {
        return null; 
      }
      return (
        <div>
          <p>You own { stockDetails.totalShares } shares of {' ' + stockDetails.ticker}</p>
        </div>
      );
    };

    const handleToggleWatchList = () => {
      const updatedIsWatched = toggleWatchList(selectedStock, liveCompanyData.logo);
      setIsWatched(updatedIsWatched);
    }





    return ( 
        <>
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
                <CurrentTime>As of {formattedDate}</CurrentTime>
            </StockTitleSummeryContainer>
          </LogoContainer>
        <StockDetailsChartContainer>




          <StockDetailsContainer>
            <StyledIcon icon={faStar} onClick={handleToggleWatchList} isWatched={isWatched} />
              <DetailContainer>
                <DetailKey>Market cap:</DetailKey><DetailValue>${liveCompanyData.marketCapitalization.toFixed(2)}</DetailValue>
              </DetailContainer>
              <DetailContainer>
                <DetailKey>Previous close:</DetailKey><DetailValue>${livePriceData.pc}</DetailValue>
              </DetailContainer>
              <DetailContainer>
                <DetailKey>Open:</DetailKey><DetailValue>${livePriceData.o}</DetailValue>
              </DetailContainer>
              <DetailContainer>
                <DetailKey>High:</DetailKey><DetailValue>${livePriceData.h}</DetailValue>
              </DetailContainer>
              <DetailContainer>
                <DetailKey>Low:</DetailKey><DetailValue>${livePriceData.l}</DetailValue>
              </DetailContainer>
          {isOwned && <OwnershipDetailsContainer/>}
          <BuyPanel currentPrice={livePriceData.c} stockName={liveCompanyData.name} stockTicker={liveCompanyData.ticker}/>
          </StockDetailsContainer>

          <StockChartContainer>
            <CandleStickChart stockName={liveCompanyData.name} stockTicker={liveCompanyData.ticker}></CandleStickChart>
          </StockChartContainer>
        </StockDetailsChartContainer>

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

  const StockChartContainer = styled.div`
  width: 90%;
  height: 50%;
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

  const CurrentTime = styled.p`
  font-size: 18px;
  font-style: italic;
  color: grey;  
  `;

  const StyledIcon = styled(FontAwesomeIcon)`
  width: 30px;
  height: 30px;
  margin: 10px;
  padding: 10px;
  border-radius: 50%;
  color: ${(props) => (props.isWatched ? "rgb(237, 237, 7)" : "rgb(153, 153, 255)")}
  `;

  /* const OwnershipDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 50%;
  margin: 10px;
  ` */





export default StockBox;