import React from "react";
import { Marker } from "react-map-gl/mapbox";

function getColorByWaterResourceType(type) {
  switch (type.toLowerCase()) {
    case "dam":
      return "#d32f2f";
    case "lake":
      return "#1976d2";
    case "reservoir":
      return "#388e3c";
    case "river":
      return "#fbc02d";
    default:
      return "#000000";
  }
}

function WaterMarker({ resource, onClick }) {
  const color = getColorByWaterResourceType(resource.type);
  
  return (
    <Marker
      longitude={resource.coordinates.longitude}
      latitude={resource.coordinates.latitude}
      anchor="bottom"
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        onClick(resource);
      }}
    >
      <div
        style={{
          backgroundColor: color,
          borderRadius: "50%",
          width: 20,
          height: 20,
          cursor: "pointer",
          boxShadow: "0 0 5px rgba(0,0,0,0.3)",
          border: "2px solid white",
          userSelect: "none",
        }}
        title={resource.name}
      />
    </Marker>
  );
}

export default WaterMarker;
