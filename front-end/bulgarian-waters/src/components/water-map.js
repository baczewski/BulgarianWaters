import React, { useState } from "react";
import Map, { NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import WaterMarker from "./water-marker";
import WaterPopup from "./water-popup";
import { useQuery } from "@apollo/client";
import { GET_WATER_RESOURCES } from "../services/water-service";
import WaterSidebar from "./water-sidebar";
import WaterLegend from "./water-legend";
import { Box, CircularProgress, Typography, FormControl, Select, InputLabel, MenuItem } from "@mui/material";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoidHJhZmZpayIsImEiOiJjbWNrdTBqeGgwNGE0MmpzN28wa203NTVrIn0.t4f5Fda423jAlQlO-jE1fw";

const ALL_TYPES = ["All", "Dam", "Lake", "Reservoir", "River"];

function WaterMap() {
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedType, setSelectedType] = useState("ALL");

  const variables = {
    limit: 20,
    offset: 0,
  }

  if (selectedType !== "ALL") {
    variables.type = selectedType;
  }

  const { data, loading, error } = useQuery(GET_WATER_RESOURCES, {
    variables
  });

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setSelectedResource(null);
  };

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
          position: "relative"
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

          {data.waterResources.map((resource, index) => (
            <WaterMarker key={resource.id + index} resource={resource} onClick={setSelectedResource} />
          ))}

          {selectedResource && (
            <WaterPopup resource={selectedResource} onClose={() => setSelectedResource(null)} />
          )}
        </Map>

        <WaterLegend />
      </Box>

      <Box sx={{ p: 1, flexDirection: "column", gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="filter-type-label">Filter by Type</InputLabel>
          <Select
            labelId="filter-type-label"
            id="filter-type"
            value={selectedType}
            label="Filter by Type"
            onChange={handleTypeChange}
          >
            {ALL_TYPES.map((type) => (
              <MenuItem key={type} value={type.toUpperCase()}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <WaterSidebar
          resources={data.waterResources}
          onSelect={setSelectedResource}
        />
      </Box>
    </Box>
  );
}

export default WaterMap;
