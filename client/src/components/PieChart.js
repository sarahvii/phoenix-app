import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import pie from 'highcharts/modules/series-label';

pie(Highcharts);

const PieChart = ({ portfolioStocks }) => {
  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Portfolio Stocks'
    },
    series: [
      {
        name: 'Stocks',
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
      <h1>🥧</h1>
      {portfolioStocks ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <p>Loading chart...</p>
      )}
    </>
  );
};

export default PieChart;