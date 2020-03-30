import React from 'react'
import {geoAlbers, geoPath} from 'd3-geo'
import {data} from './data/eng_wales_scotland'

const svgStyle = {
    border: '1px black solid'
};
const style = {
    fill: 'none',
    stroke: 'black'
};

const features = data;//feature(data);//, data.objects.eer);
const width = 430,
    height = 580;

const Map01 = () => {
    const projection = geoAlbers()
        .center([0, 55.4])
        .rotate([4.4, 0])
        .parallels([50, 60])
        .scale(width * 5.6)
        .translate([width / 2, height / 2]);

    const pathGenerator = geoPath().projection(projection);
    const countries = features.features
        .map((d, i) => <path key={i} d={pathGenerator(d)} style={style} />);

    return (
        <svg
            width={width}
            height={height}
            style={svgStyle}
        >
            {countries}
        </svg>
    )
};

export default Map01;
