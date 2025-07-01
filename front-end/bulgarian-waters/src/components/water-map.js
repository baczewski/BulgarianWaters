import * as React from 'react';
import Map, {NavigationControl} from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';


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

        </Map>
    );
}

export default WaterMap;
