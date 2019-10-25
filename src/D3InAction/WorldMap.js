import React from 'react'
import {geoMercator, geoPath} from 'd3-geo'
import worlddata from './world'

const WorldMap = () => {
    const projection = geoMercator();
    const pathGenerator = geoPath().projection(projection);
    const countries = worlddata.features
        .map((d, i) => <path key={i} d={pathGenerator(d)} className="countries" />);

    return (
        <svg width={500} height={500}>
            {countries}
        </svg>
    )
};

export default WorldMap;
