import React, {useState, useRef, useEffect} from 'react'
import {data} from './data/geo_g7s3.topo'
import {feature} from 'topojson-client';
import {geoAlbers, geoPath} from 'd3-geo';
import {zoom, zoomIdentity} from 'd3-zoom';
import {event, select} from "d3-selection";

const business = [
    '50.964238893007200,-3.140376096218200',
    '53.341977534698300,-2.176050799115990',
    '51.324576380230700,-0.265752781176216',
    '55.852282650935500,-4.165391143614090',
    '50.852781150935500,-2.165391143614090',
];

const svgStyle = {
    backgroundColor: 'white',
    border: '1px solid black',
    marginTop: '64px'
};
const mapStyle = {
    fill: 'silver',
    stroke: 'black'
};

const features = feature(data, data.objects.geo);
const width = 860,
    height = 600;
const padding = 800;
const baseScale = width * 3.8;

const getCircle = (x, y, r, sw, id = 1) =>
    <circle
        key={id}
        cx={x}
        cy={y}
        r={r}
        stroke={'#072646'}
        strokeWidth={sw}
        fill={'#9f4aff'}
    />;

const MapUK = () => {
    const [businesses, setBusinesses] = useState(null);
    const [mapOutline, setMapOutline] = useState(null);
    const [zoomTransform, setZoomTransform] = useState(zoomIdentity);
    const svg = useRef(null);

    useEffect(() => {
        const zoomRef = zoom()
            .scaleExtent([.1, 10])
            .translateExtent([[-padding, -padding], [width + padding, height + padding]])
            .extent([[-padding, -padding], [width + padding, height + padding]])
            .on("zoom", () => setZoomTransform(event.transform));

        select(svg.current)
            .call(zoomRef);
    });

    const {x, y, k} = zoomTransform;

    useEffect(() => {
        const tx = (width / 2) * k + x, // T2: scale factor must be applied to this translation
            ty = (height / 2) * k + y;

        // In video first give a brief description of these. Maybe create a video where each of these is parameterised
        // and the dataset is "visualised" seo we can see what these do!
        const projection = geoAlbers()
            .scale(baseScale * k) // Make the map larger to fit the SVG canvas
            .translate([tx, ty]) // T1: translate centers the image
            .center([0, 55.1]) // Without this the UK appears off the top of the SVG canvas
            .rotate([3.3, -0.1]) // rotate the globe...? This moves the UK into the center of the canvas.
            .parallels([50, 60]); // This "lengthens" the UK, making it look less squished

        const pathGenerator = geoPath().projection(projection);

        const _business = [];
        business.forEach((b, index) => {
            const [latitude, longitude] = b.split(',');
            const [x, y] = projection([longitude, latitude]);

            _business.push(
                getCircle(x, y, 6, 1, index)
            )
        });

        setBusinesses(_business);

        setMapOutline(features.features
            .map((d, i) => <path key={i} d={pathGenerator(d)} style={mapStyle} />));
    }, [
        x, y, k, data
    ]);

    return (
        <div>
            <svg width={width} height={height} style={svgStyle} ref={svg}>
                <g>
                    {mapOutline}
                    {businesses}
                </g>
            </svg>
        </div>
    )
};

export default MapUK;
