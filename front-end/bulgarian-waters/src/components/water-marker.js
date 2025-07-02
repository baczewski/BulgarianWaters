import React from 'react';
import { Marker } from 'react-map-gl/mapbox';

function getColorByWaterResourceType(type) {
    switch (type) {
        case 'dam':
            return 'red';
        case 'lake':
            return 'blue';
        default:
            return 'black';
    }
}

function WaterMarker({ resource, onClick }) {
    return (
        <Marker
          longitude={resource.coordinates.longitude}
          latitude={resource.coordinates.latitude}
          color={getColorByWaterResourceType(resource.type)}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            onClick(resource);
          }}
        />
      );
}

export default WaterMarker;