import React from 'react';
import { useNavigate } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import pie from 'highcharts/modules/series-label';

pie(Highcharts);

const PieChart = ({ portfolioStocks, setSelectedStock }) => {
  const navigate = useNavigate();

  if (!portfolioStocks || portfolioStocks.length === 0) {
    return <div>No data available for the chart.</div>;
  }

  const handlePointClick = (event) => {
    const ticker = event.point.name;
    console.log('Clicked ticker:', ticker);
    setSelectedStock(ticker); // Set the selected stock
    navigate('/stocks'); // Navigate to '/stocks' page

  };

  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Portfolio Breakdown',
    },
    tooltip: {
      formatter: function () {
        return `<b>${this.point.name}</b>: $${Highcharts.numberFormat(
          this.y,
          0,
          '.',
          ''
        )}`; // format the label of the value field
      },
    },
    plotOptions: {
      series: {
        point: {
          events: {
            click: handlePointClick,
          },
        },
      },
    },
    series: [
      {
        name: 'Current Value',
        data: portfolioStocks.map((stock) => ({
          name: stock.ticker,
          y: stock.values?.currentTotalValue || 0, // Handle undefined value
        })),
      },
    ],
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