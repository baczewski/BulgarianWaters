import React, { useState } from 'react';
import Map, { NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import WaterMarker from './water-marker';
import WaterPopup from './water-popup';


const waterResources = [
  {
    id: "http://www.wikidata.org/entity/Q12274444",
    name: "Ivailovgrad Hydroelectric Power Station",
    type: "dam",
    coordinates: { latitude: 41.583722222, longitude: 26.107111111 }
  },
  {
    id: "http://www.wikidata.org/entity/Q21786713",
    name: "Studena dam",
    type: "dam",
    coordinates: { latitude: 42.54097, longitude: 23.15896 }
  },
  {
    id: "http://www.wikidata.org/entity/Q56043307",
    name: "Vacha Dam",
    type: "dam",
    coordinates: { latitude: 41.940483, longitude: 24.446307 }
  },
  {
    id: "http://www.wikidata.org/entity/Q114875614",
    name: "Chaira Dam",
    type: "dam",
    coordinates: { latitude: 42.159022222, longitude: 23.870913888 }
  },
  {
    id: "http://www.wikidata.org/entity/Q21786712",
    name: "Luda Yana dam",
    type: "dam",
    coordinates: { latitude: 42.52167, longitude: 24.1975 }
  },
  {
    id: "http://www.wikidata.org/entity/Q111363913",
    name: "Koprinka Dam",
    type: "dam",
    coordinates: { latitude: 42.612825, longitude: 25.319522222 }
  },
  {
    id: "http://www.wikidata.org/entity/Q115452881",
    name: "Studen Kladenets Dam",
    type: "dam",
    coordinates: { latitude: 41.6196, longitude: 25.6418 }
  },
  {
    id: "http://www.wikidata.org/entity/Q21786711",
    name: "Plovdivtsi dam",
    type: "dam",
    coordinates: { latitude: 41.40639, longitude: 24.80083 }
  },
  {
    id: "http://www.wikidata.org/entity/Q12284112",
    name: "Krichim Dam",
    type: "dam",
    coordinates: { latitude: 41.991905, longitude: 24.467626 }
  },
  {
    id: "http://www.wikidata.org/entity/Q114800799",
    name: "Yadenitsa Dam",
    type: "dam",
    coordinates: { latitude: 42.098, longitude: 23.88 }
  },
  {
    id: "http://www.wikidata.org/entity/Q12011150",
    name: "Tsankov Kamak Dam",
    type: "dam",
    coordinates: { latitude: 41.822433333, longitude: 24.441944444 }
  },
  {
    id: "http://www.wikidata.org/entity/Q129673329",
    name: "Bakardere Reservoir",
    type: "lake",
    coordinates: { latitude: 42.4875, longitude: 23.72089 }
  },
  {
    id: "http://www.wikidata.org/entity/Q1070423",
    name: "Lake Varna",
    type: "lake",
    capacity: 166,
    coordinates: { latitude: 43.190277777, longitude: 27.825 }
  },
  {
    id: "http://www.wikidata.org/entity/Q6395746",
    name: "Koprinka Reservoir",
    type: "lake",
    capacity: 142200000,
    coordinates: { latitude: 42.616666666, longitude: 25.3 }
  },
  {
    id: "http://www.wikidata.org/entity/Q6395796",
    name: "Iskar Reservoir",
    type: "lake",
    capacity: 655300000,
    coordinates: { latitude: 42.470555555, longitude: 23.573333333 }
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
            )}

        </Map>
    );
}

export default WaterMap;
