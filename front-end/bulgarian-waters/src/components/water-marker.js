import React from 'react';
import { Marker } from 'react-map-gl/mapbox';

function WaterMarker({ resource, onClick }) {
    return (
        <Marker
          longitude={resource.coordinates.longitude}
          latitude={resource.coordinates.latitude}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            onClick(resource);
          }}
        />
      );
}

export default WaterMarker;