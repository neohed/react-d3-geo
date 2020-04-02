import React from 'react';
import './App.css';
import Map01 from './Map01'
import WorldMap from "./D3InAction/WorldMap";
import WorldMap_topojson from "./D3InAction/WorldMap_topojson";

function App() {
    return (
        <div className="App">
            <h1>Map01</h1>
            <Map01/>
            <h1>WorldMap</h1>
            <WorldMap/>
            <h1>WorldMap_topojson</h1>
            <WorldMap_topojson/>
        </div>
    );
}

export default App;
