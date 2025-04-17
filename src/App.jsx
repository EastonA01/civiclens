import React, { useState } from 'react';
import "./App.css";
import CountySelector from "./components/CountySelector";
import EthnicDiversityComponent from "./components/EthnicDiversity";
import FamilyStructureComponent from "./components/FamilyStructure";
import HousingOccupancyComponent from "./components/HousingOccupancy";
import PopulationAgeComponent from "./components/PopulationAge";
import TopNavbar from "./components/TopNavbar";

function App() {
  const [selectedCounties, setSelectedCounties] = useState([]);
  const [selectedView, setSelectedView] = useState('');

  return (
    <>
      <TopNavbar onNavigate={setSelectedView} />
      <div id="page-content">
        <div className='halfed-content min-width-50'>
          <CountySelector onCountyChange={setSelectedCounties} />
        </div>

        <div className='halfed-content w-50'>
          {/* Render selected comparison */}
          {selectedView === 'housing' && <HousingOccupancyComponent counties={selectedCounties} />}
          {selectedView === 'diversity' && <EthnicDiversityComponent counties={selectedCounties} />}
          {selectedView === 'structure' && <FamilyStructureComponent counties={selectedCounties} />}
          {selectedView === 'age' && <PopulationAgeComponent counties={selectedCounties} />}
        </div>

      </div>
    </>
  );
}

export default App;
