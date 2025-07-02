import React, { useState } from 'react';
import Map, { NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import WaterMarker from './water-marker';
import WaterPopup from './water-popup';
import { useQuery } from '@apollo/client';
import { GET_WATER_RESOURCES } from '../services/water-service';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidHJhZmZpayIsImEiOiJjbWNrdTBqeGgwNGE0MmpzN28wa203NTVrIn0.t4f5Fda423jAlQlO-jE1fw';

function WaterMap() {
    const [selectedResource, setSelectedResource] = useState(null);

    const { data, loading, error } = useQuery(GET_WATER_RESOURCES, {
      variables: {
        limit: 100,
        offset: 0,
      },
    });

    console.log(data?.waterResources);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

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

            {data.waterResources.map((resource) => (
                <WaterMarker 
                    key={resource.id}
                    resource={resource}
                    onClick={setSelectedResource}
                />
            ))}

            {selectedResource && (
                <WaterPopup 
                    resource={selectedResource}
                    onClose={() => setSelectedResource(null)}
                />
            )}

        </Map>
    );
}

export default WaterMap;
