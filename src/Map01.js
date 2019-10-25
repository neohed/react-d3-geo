import React from 'react'
import {geoAlbers, geoPath} from 'd3-geo'
import {data} from './data/eng_wales_scotland'

const style = {
    fill: 'none',
    stroke: 'black'
};

const features = data;//feature(data);//, data.objects.eer);
const width = 960,
    height = 1160;

const Map01 = () => {
    const projection = geoAlbers()
        .center([0, 55.4])
        .rotate([4.4, 0])
        .parallels([50, 60])
        .scale(6000)
        .translate([width / 2, height / 2]);

    const pathGenerator = geoPath().projection(projection);
    const countries = features.features
        .map((d, i) => <path key={i} d={pathGenerator(d)} style={style} />);

    return (
        <svg width={1200} height={2000}>
            {countries}
        </svg>
    )
};

export default Map01;
