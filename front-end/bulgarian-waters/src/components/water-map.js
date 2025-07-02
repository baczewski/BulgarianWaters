import React, { useState } from 'react';
import Map, { NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import WaterMarker from './water-marker';
import WaterPopup from './water-popup';


const waterResources = [
    {
      "id": "http://www.wikidata.org/entity/Q12274444",
      "name": "Ivailovgrad Hydroelectric Power Station",
      "type": "dam",
      "coordinates": {
        "latitude": 41.583722222,
        "longitude": 26.107111111
      }
    },
    {
      "id": "http://www.wikidata.org/entity/Q21786713",
      "name": "Studena dam",
      "type": "dam",
      "coordinates": {
        "latitude": 42.54097,
        "longitude": 23.15896
      }
    },
    {
      "id": "http://www.wikidata.org/entity/Q56043307",
      "name": "Vacha Dam",
      "type": "dam",
      "coordinates": {
        "latitude": 41.940483,
        "longitude": 24.446307
      }
    },
    {
      "id": "http://www.wikidata.org/entity/Q114875614",
      "name": "Chaira Dam",
      "type": "dam",
      "coordinates": {
        "latitude": 42.159022222,
        "longitude": 23.870913888
      }
    },
    {
      "id": "http://www.wikidata.org/entity/Q21786712",
      "name": "Luda Yana dam",
      "type": "dam",
      "coordinates": {
        "latitude": 42.52167,
        "longitude": 24.1975
      }
    },
    {
      "id": "http://www.wikidata.org/entity/Q111363913",
      "name": "Koprinka Dam",
      "type": "dam",
      "coordinates": {
        "latitude": 42.612825,
        "longitude": 25.319522222
      }
    },
    {
      "id": "http://www.wikidata.org/entity/Q115452881",
      "name": "Studen Kladenets Dam",
      "type": "dam",
      "coordinates": {
        "latitude": 41.6196,
        "longitude": 25.6418
      }
    },
    {
      "id": "http://www.wikidata.org/entity/Q21786711",
      "name": "Plovdivtsi dam",
      "type": "dam",
      "coordinates": {
        "latitude": 41.40639,
        "longitude": 24.80083
      }
    },
    {
      "id": "http://www.wikidata.org/entity/Q12284112",
      "name": "Krichim Dam",
      "type": "dam",
      "coordinates": {
        "latitude": 41.991905,
        "longitude": 24.467626
      }
    },
    {
      "id": "http://www.wikidata.org/entity/Q114800799",
      "name": "Yadenitsa Dam",
      "type": "dam",
      "coordinates": {
        "latitude": 42.098,
        "longitude": 23.88
      }
    },
    {
      "id": "http://www.wikidata.org/entity/Q12011150",
      "name": "Tsankov Kamak Dam",
      "type": "dam",
      "coordinates": {
        "latitude": 41.822433333,
        "longitude": 24.441944444
      }
    }
  ];
  

function WaterMap() {
    const [selectedResource, setSelectedResource] = useState(null);

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

            {waterResources.map((resource) => (
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
                // <Popup
                //     longitude={selectedResource.coordinates.longitude}
                //     latitude={selectedResource.coordinates.latitude}
                //     anchor="top"
                //     onClose={() => setSelectedResource(null)}
                // >
                //     <div>
                //         <strong>{selectedResource.name}</strong>
                //         <br />
                //         Type: {selectedResource.type}
                //         <br />
                //         <a href={selectedResource.id} target="_blank" rel="noopener noreferrer">
                //         View on Wikidata
                //         </a>
                //     </div>
                // </Popup>
            )}

        </Map>
    );
}

export default WaterMap;
