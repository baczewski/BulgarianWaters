import React from 'react';
import { Popup } from 'react-map-gl/mapbox';

function WaterPopup({ resource, onClose }) {
  return (
    <Popup
        longitude={resource.coordinates.longitude}
        latitude={resource.coordinates.latitude}
        anchor="top"
        onClose={onClose}
    >
        <div className="text-sm">
            <strong>{resource.name}</strong>
            <br />
            Type: {resource.type}
            <br />
            <a
                href={resource.id}
                target="_blank"
                rel="noopener noreferrer"
                >
                View on Wikidata
            </a>
        </div>
    </Popup>
  );
}

export default WaterPopup;
