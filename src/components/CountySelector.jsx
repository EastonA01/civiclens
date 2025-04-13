import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountySelector = ({ onCountyChange }) => {
  const [counties, setCounties] = useState([]);
  const [selectedCounties, setSelectedCounties] = useState(['']); // Start with one input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounties = async () => {
      try {
        const response = await axios.get('https://api.census.gov/data/2020/dec/dhc', {
          params: {
            get: 'NAME',
            for: 'county:*',
            in: 'state:37', // NC
          }
        });

        const [headers, ...rows] = response.data;
        const nameIndex = headers.indexOf('NAME');
        const countyIndex = headers.indexOf('county');

        const formatted = rows.map(row => ({
          name: row[nameIndex],
          fips: row[countyIndex]
        }));

        setCounties(formatted);
      } catch (err) {
        console.error(err);
        setError('Failed to load counties');
      } finally {
        setLoading(false);
      }
    };

    fetchCounties();
  }, []);

  const handleCountyChange = (index, newFips) => {
    const updated = [...selectedCounties];
    updated[index] = newFips;
    setSelectedCounties(updated);
    onCountyChange(updated.filter(fips => fips)); // Only pass valid selections
  };

  const addCountyInput = () => {
    setSelectedCounties([...selectedCounties, '']);
  };

  const removeCountyInput = (index) => {
    const updated = selectedCounties.filter((_, i) => i !== index);
    setSelectedCounties(updated);
    onCountyChange(updated.filter(fips => fips));
  };

  if (loading) return <p>Loading counties...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Select Counties to Compare:</h3>
      {selectedCounties.map((fips, index) => (
        <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <select
            value={fips}
            onChange={(e) => handleCountyChange(index, e.target.value)}
          >
            <option value="">--Choose a county--</option>
            {counties.map(county => (
              <option key={county.fips} value={county.fips}>
                {county.name}
              </option>
            ))}
          </select>
          {selectedCounties.length > 1 && (
            <button onClick={() => removeCountyInput(index)} style={{ marginLeft: '10px' }}>
              −
            </button>
          )}
        </div>
      ))}
      <button onClick={addCountyInput}>+ Add County</button>
    </div>
  );
};

export default CountySelector;