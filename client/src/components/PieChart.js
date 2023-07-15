import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import pie from 'highcharts/modules/series-label';

pie(Highcharts);

const PieChart = ({ portfolioStocks }) => {

  if (!portfolioStocks || portfolioStocks.length === 0) {
    return <div>No data available for the chart.</div>;
  }

  
  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Portfolio Breakdown'
    },
    series: [
      {
        name: 'Shares',
        data: portfolioStocks
          ? portfolioStocks.map((stock) => ({
              name: stock.ticker,
              y: stock.totalShares
            }))
          : []
      }
    ]
  };

  return (
    <>
    
          {portfolioStocks ? (
            <HighchartsReact highcharts={Highcharts} options={options} />
          ) : (
            <p>Loading chart...</p>
          )}
    </>
  );
};


export default PieChart;