import "./App.css";
import NavbarComponent from "./components/navbar";
import CountySelector from "./components/CountySelector";
import React, { useState } from 'react';
import HousingOccupancyComponent from "./components/HousingOccupancy";
import EthnicDiversityComponent from "./components/EthnicDiversity";
import FamilyStructureComponent from "./components/FamilyStructure";
import PopulationAgeComponent from "./components/PopulationAge";

function App() {
  const [selectedCounties, setSelectedCounties] = useState([]);
  const [selectedView, setSelectedView] = useState('');

  return (
    <>
      <NavbarComponent onNavigate={setSelectedView}/>
      <div id="page-content">
        <CountySelector onCountyChange={setSelectedCounties} />

        {/* Render selected comparison */}
        {selectedView === 'housing' && <HousingOccupancyComponent counties={selectedCounties} />}
        {selectedView === 'diversity' && <EthnicDiversityComponent counties={selectedCounties}/>}
        {selectedView === 'structure' && <FamilyStructureComponent counties={selectedCounties} />}
        {selectedView === 'age' && <PopulationAgeComponent counties={selectedCounties} />}

      </div>
    </>
  );
}

export default App;
