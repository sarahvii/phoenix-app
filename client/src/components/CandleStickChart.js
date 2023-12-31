import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HCVolume from 'highcharts/modules/series-label';

// Initialize the HCVolume module
HCVolume(Highcharts);

const CandlestickChart = ({ stockName, stockTicker }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!stockTicker) {
      return;
    }

    const fetchCandleData = async () => {
      const currentDate = Math.floor(Date.now() / 1000);
      const fromDate = new Date();
      fromDate.setFullYear(fromDate.getFullYear() - 1);
      const from = Math.floor(fromDate.getTime() / 1000);
      const url = `https://finnhub.io/api/v1/stock/candle?symbol=${stockTicker}&resolution=D&from=${from}&to=${currentDate}&token=${process.env.REACT_APP_FINNHUB_API_TOKEN}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.t && data.t.length > 0) {
          setData(data);
        } else {
          console.error('Invalid or empty data received:', data);
        }
      } catch (error) {
        console.error('Error fetching stock news: ', error);
      }
    };

    fetchCandleData();
  }, [stockTicker]);

  if (!data || !data.t || data.t.length === 0) {
    return <div>No valid data available for the chart.</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const seriesData = data.t.map((timestamp, index) => ({
    x: timestamp * 1000,
    open: data.o[index],
    high: data.h[index],
    low: data.l[index],
    close: data.c[index],
    color: data.c[index] > data.o[index] ? 'green' : 'red',
  }));

  const volumeData = data.t.map((timestamp, index) => ({
    x: timestamp * 1000,
    y: data.v[index],
  }));

  const options = {
    chart: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    title: {
      text: stockName ? ` ${stockName}` : '',
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        day: '%e %b',
      },
    },
    yAxis: [
      {
        title: {
          text: 'Stock Price History ($)',
        },
      },
      {
        title: {
          text: 'Volume',
        },
        opposite: true,
      },
    ],
    series: [
      {
        type: 'candlestick',
        name: 'Stock Price History ($)',
        data: seriesData,
        color: 'transparent',
      },
      {
        type: 'column',
        name: 'Volume',
        data: volumeData,
        yAxis: 1,
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