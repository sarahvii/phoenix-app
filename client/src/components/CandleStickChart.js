import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const CandlestickChart = ({ stockName, stockTicker }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchCandleData = async () => {
      if (stockTicker) {
        const currentDate = Math.floor(Date.now() / 1000);
        const fromDate = new Date();
        fromDate.setFullYear(fromDate.getFullYear() - 1);
        const from = Math.floor(fromDate.getTime() / 1000);
        const url = `https://finnhub.io/api/v1/stock/candle?symbol=${stockTicker}&resolution=D&from=${from}&to=${currentDate}&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error('Error fetching stock news: ', error);
        }
      }
    };

    fetchCandleData();
  }, [stockTicker]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const seriesData = data.t.map((timestamp, index) => ({
    x: timestamp * 1000,
    open: data.o[index],
    high: data.h[index],
    low: data.l[index],
    close: data.c[index],
    color: data.c[index] > data.o[index] ? 'green' : 'red', // Set color based on price comparison
  }));

  const options = {
    title: {
      text: 'Stock Candlestick Chart',
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        day: '%e %b', // Format the label to show day and month (e.g., 15 Jan)
      },
    },
    series: [
      {
        type: 'candlestick',
        name: 'Stock Price',
        data: seriesData,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default CandlestickChart;
