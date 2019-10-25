import React from 'react'
import {feature} from 'topojson-client';
import {geoMercator, geoPath} from 'd3-geo'
import {data} from '../data/data_england'

const features = feature(data, data.objects.eer);

const WorldMap_topojson = () => {
    const projection = geoMercator();
    const pathGenerator = geoPath().projection(projection);
    const countries = features.features
        .map((d, i) => <path key={i} d={pathGenerator(d)} className="countries" />);

    return (
        <svg width={500} height={500}>
            {countries}
        </svg>
    )
};

export default WorldMap_topojson;
