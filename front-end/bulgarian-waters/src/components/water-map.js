import React, { useState } from "react";
import Map, { NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import WaterMarker from "./water-marker";
import WaterPopup from "./water-popup";
import { useQuery } from "@apollo/client";
import { GET_WATER_RESOURCES } from "../services/water-service";
import WaterSidebar from "./water-sidebar";
import WaterLegend from "./water-legend";
import { Box, CircularProgress, Typography } from "@mui/material";



function WaterMap() {
  const [selectedResource, setSelectedResource] = useState(null);

  const { data, loading, error } = useQuery(GET_WATER_RESOURCES, {
    variables: {
      limit: 20,
      offset: 0,
    },
  });

  if (loading) {
    return (
      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "700px",
        gap: 2,
        p: 2,
      }}
    >
      <Box
        sx={{
          flex: 4,
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 3,
          border: "1px solid #ccc",
          position: "relative", // Важно за absolute позициониране на легендата
        }}
      >
        <Map
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            longitude: 25.4858,
            latitude: 42.7339,
            zoom: 6,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          style={{ width: "100%", height: "100%" }}
        >
          <NavigationControl position="top-right" />

          {data.waterResources.map((resource) => (
            <WaterMarker key={resource.id} resource={resource} onClick={setSelectedResource} />
          ))}

          {selectedResource && (
            <WaterPopup resource={selectedResource} onClose={() => setSelectedResource(null)} />
          )}
        </Map>

        <WaterLegend />
      </Box>

      <Box sx={{ flex: 1 }}>
        <WaterSidebar resources={data.waterResources} onSelect={setSelectedResource} />
      </Box>
    </Box>
  );
}

export default WaterMap;
