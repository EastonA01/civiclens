import axios from 'axios';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js';
import React, { useEffect, useRef } from 'react';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const FamilyStructureComponent = ({ counties }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!counties.length) return;

      const responses = await Promise.all(counties.map(fips =>
        axios.get('https://api.census.gov/data/2020/dec/dhc', {
          params: {
            get: 'P18_001N,P18_002N,P18_003N,NAME',
            for: `county:${fips}`,
            in: 'state:37'
          }
        })
      ));

      const labels = [];
      const totalFamilies = [];
      const married = [];
      const singleParent = [];

      responses.forEach(res => {
        const [headers, ...rows] = res.data;
        const values = rows[0];

        labels.push(values[headers.indexOf('NAME')]);
        totalFamilies.push(parseInt(values[headers.indexOf('P18_001N')], 10));
        married.push(parseInt(values[headers.indexOf('P18_002N')], 10));
        singleParent.push(parseInt(values[headers.indexOf('P18_003N')], 10));
      });

      const chartData = {
        labels,
        datasets: [
          { label: 'Total Families', backgroundColor: '#FF6384', data: totalFamilies },
          { label: 'Married Couples', backgroundColor: '#36A2EB', data: married },
          { label: 'Single Parent', backgroundColor: '#FFCE56', data: singleParent }
        ]
      };

      const chartOptions = {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Family Structure by County' }
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
    <div className='canvas-container'>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default FamilyStructureComponent;