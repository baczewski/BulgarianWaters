import * as React from 'react';
import Map, { NavigationControl, Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const waterResources = [
    {
      coordinates: { latitude: 45.221944444, longitude: 29.743333333 },
      id: 'http://www.wikidata.org/entity/Q1653',
      name: 'Дунав',
    },
    {
      coordinates: { latitude: 42.25008, longitude: 27.58922 },
      id: 'http://www.wikidata.org/entity/Q1563774',
      name: 'Ясна поляна',
    },
    {
      coordinates: { latitude: 42.5, longitude: 27.4 },
      id: 'http://www.wikidata.org/entity/Q1014783',
      name: 'Бургаско езеро',
    },
];

function WaterMap() {
    return (
        <Map 
            mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
            initialViewState={{
                longitude: 25.4858,
                latitude: 42.7339,
                zoom: 6
            }}
            style={{ width: 600, height: 400 }}
            mapStyle='mapbox://styles/mapbox/streets-v12'
        >
            <NavigationControl position='top-right' />

            {waterResources.map((resource, index) => (
                <Marker
                    key={index}
                    longitude={resource.coordinates.longitude}
                    latitude={resource.coordinates.latitude}
                    anchor='bottom'
                >

                </Marker>
            ))}

        </Map>
    );
}

export default WaterMap;
