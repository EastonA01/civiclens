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

// Register the necessary components once globally
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const HousingOccupancyComponent = ({ counties }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!counties.length) return;

      // Fetch data from the Census API
      const responses = await Promise.all(counties.map(fips =>
        axios.get('https://api.census.gov/data/2020/dec/dhc', {
          params: {
            get: 'H1_001N,H4_001N,NAME',
            for: `county:${fips}`,
            in: 'state:37'
          }
        })
      ));

      // Prepare chart data arrays
      const labels = [];
      const occupied = [];
      const vacant = [];
      const total = [];

      responses.forEach(res => {
        const [headers, ...rows] = res.data;
        const values = rows[0];

        const name = values[headers.indexOf('NAME')];
        const totalUnits = parseInt(values[headers.indexOf('H1_001N')], 10);
        const vacantUnits = parseInt(values[headers.indexOf('H4_001N')], 10);
        const occupiedUnits = totalUnits - vacantUnits;

        labels.push(name);
        occupied.push(occupiedUnits);
        vacant.push(vacantUnits);
        total.push(totalUnits);
      });

      const chartData = {
        labels,
        datasets: [
          {
            label: 'Occupied Units',
            backgroundColor: '#4BC0C0',
            data: occupied
          },
          {
            label: 'Vacant Units',
            backgroundColor: '#FF6384',
            data: vacant
          },
          {
            label: 'Total Units',
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
            text: 'Housing Occupancy by County'
          }
        }
      };

      // Destroy previous chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create a new chart
      const ctx = canvasRef.current.getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions
      });
    };

    fetchData();

    // Clean up on unmount
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

export default HousingOccupancyComponent;