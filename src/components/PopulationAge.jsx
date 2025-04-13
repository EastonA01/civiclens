import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the chart components globally
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const PopulationAgeComponent = ({ counties }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!counties.length) return;

      // Fetch population data from Census API
      const responses = await Promise.all(counties.map(fips =>
        axios.get('https://api.census.gov/data/2020/dec/dhc', {
          params: {
            get: 'P12_002N,P12_020N,P12_001N,NAME',
            for: `county:${fips}`,
            in: 'state:37'
          }
        })
      ));

      const labels = [];
      const under18 = [];
      const over65 = [];
      const total = [];

      responses.forEach(res => {
        const [headers, ...rows] = res.data;
        const values = rows[0];

        const name = values[headers.indexOf('NAME')];
        labels.push(name);
        under18.push(parseInt(values[headers.indexOf('P12_002N')], 10));
        over65.push(parseInt(values[headers.indexOf('P12_020N')], 10));
        total.push(parseInt(values[headers.indexOf('P12_001N')], 10));
      });

      const chartData = {
        labels,
        datasets: [
          {
            label: 'Under 18',
            backgroundColor: '#FF9F40',
            data: under18
          },
          {
            label: 'Over 65',
            backgroundColor: '#9966FF',
            data: over65
          },
          {
            label: 'Total Population',
            backgroundColor: '#C9CBCF',
            data: total
          }
        ]
      };

      const chartOptions = {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: {
            display: true,
            text: 'Population by Age Group'
          }
        }
      };

      // Destroy existing chart if present
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create new chart
      const ctx = canvasRef.current.getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions
      });
    };

    fetchData();

    // Cleanup on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [counties]);

  return (
    <div style={{ width: '25vw' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PopulationAgeComponent;