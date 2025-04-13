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

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const EthnicDiversityComponent = ({ counties }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!counties.length) return;

      const responses = await Promise.all(counties.map(fips =>
        axios.get('https://api.census.gov/data/2020/dec/dhc', {
          params: {
            get: 'P10_003N,P10_004N,P10_005N,P10_006N,NAME',
            for: `county:${fips}`,
            in: 'state:37'
          }
        })
      ));

      const labels = [];
      const white = [];
      const black = [];
      const native = [];
      const asian = [];

      responses.forEach(res => {
        const [headers, ...rows] = res.data;
        const values = rows[0];

        labels.push(values[headers.indexOf('NAME')]);
        white.push(parseInt(values[headers.indexOf('P10_003N')], 10));
        black.push(parseInt(values[headers.indexOf('P10_004N')], 10));
        native.push(parseInt(values[headers.indexOf('P10_005N')], 10));
        asian.push(parseInt(values[headers.indexOf('P10_006N')], 10));
      });

      const chartData = {
        labels,
        datasets: [
          { label: 'White', backgroundColor: '#FF6384', data: white },
          { label: 'Black or African American', backgroundColor: '#36A2EB', data: black },
          { label: 'American Indian/Alaska Native', backgroundColor: '#FFCE56', data: native },
          { label: 'Asian', backgroundColor: '#4BC0C0', data: asian }
        ]
      };

      const chartOptions = {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Ethnic Diversity by County' }
        }
      };

      if (chartRef.current) chartRef.current.destroy();

      const ctx = canvasRef.current.getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions
      });
    };

    fetchData();

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [counties]);

  return (
    <div style={{ width: '25vw' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default EthnicDiversityComponent;