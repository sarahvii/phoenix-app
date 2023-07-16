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
    tooltip: {
      formatter: function () {
        return `<b>${this.point.name}</b>: $${Highcharts.numberFormat(this.y, 0, '.', '')}`; // format the label of the value field
      }
    },
    series: [
      {
        name: 'Current Value',
        data: portfolioStocks.map((stock) => ({
          name: stock.ticker,
          y: stock.value?.currentTotalValue || 0 // Handle undefined value
        }))
      }
    ]
  };

  return (
    <>
      {portfolioStocks.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <p>Loading chart...</p>
      )}
    </>
  );
};




export default PieChart;