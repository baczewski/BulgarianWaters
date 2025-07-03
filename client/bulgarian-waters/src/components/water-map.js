import React, { useState, useMemo } from "react";
import Map, { NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import WaterMarker from "./water-marker";
import WaterPopup from "./water-popup";
import { useQuery } from "@apollo/client";
import { GET_WATER_RESOURCES } from "../services/water-service";
import WaterSidebar from "./water-sidebar";
import WaterLegend from "./water-legend";
import {
  Box,
  CircularProgress,
  Typography,
  IconButton,
  Popover,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Stack,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import debounce from "lodash.debounce";

const MAPBOX_ACCESS_TOKEN =
  "<ENTER_VALID_TOKEN>";

const ALL_TYPES = ["All", "Dam", "Lake", "Reservoir", "River"];

function WaterMap() {
  const [selectedResource, setSelectedResource] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    type: "ALL",
    minCapacity: "",
    minSurfaceArea: "",
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const variables = useMemo(() => {
    const vars = { limit: 50, offset: 0 };
    if (appliedFilters.type !== "ALL") vars.type = appliedFilters.type;
    if (appliedFilters.minCapacity) vars.minCapacity = parseFloat(appliedFilters.minCapacity);
    if (appliedFilters.minSurfaceArea)
      vars.minSurfaceArea = parseFloat(appliedFilters.minSurfaceArea);
    return vars;
  }, [appliedFilters]);

  const { data, loading, error } = useQuery(GET_WATER_RESOURCES, {
    variables,
  });

  const debouncedApplyFilters = useMemo(() => debounce(setAppliedFilters, 1500), []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    debouncedApplyFilters(newFilters);
  };

  const handleReset = () => {
    const reset = { type: "ALL", minCapacity: "", minSurfaceArea: "" };
    setFilters(reset);
    setAppliedFilters(reset);
  };

  const handleOpenFilters = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilters = () => {
    setAnchorEl(null);
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
    <Box sx={{ display: "flex", width: "100%", height: "700px", gap: 2, p: 2 }}>
      <Box
        sx={{
          flex: 4,
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 3,
          border: "1px solid #ccc",
          position: "relative",
        }}
      >
        <Map
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          initialViewState={{ longitude: 25.4858, latitude: 42.7339, zoom: 6 }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          style={{ width: "100%", height: "100%" }}
        >
          <NavigationControl position="top-left" />
          {data.waterResources.map((resource, index) => (
            <WaterMarker
              key={resource.id + index}
              resource={resource}
              onClick={setSelectedResource}
            />
          ))}
          {selectedResource && (
            <WaterPopup resource={selectedResource} onClose={() => setSelectedResource(null)} />
          )}
        </Map>
        <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
          <IconButton onClick={handleOpenFilters}>
            <FilterListIcon />
          </IconButton>
        </Box>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleCloseFilters}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Box sx={{ p: 2, minWidth: 250 }}>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select name="type" value={filters.type} label="Type" onChange={handleFilterChange}>
                  {ALL_TYPES.map((type) => (
                    <MenuItem key={type} value={type.toUpperCase()}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                name="minCapacity"
                type="number"
                label="Min Capacity (m³)"
                value={filters.minCapacity}
                onChange={handleFilterChange}
                fullWidth
              />
              <TextField
                name="minSurfaceArea"
                type="number"
                label="Min Surface Area (km²)"
                value={filters.minSurfaceArea}
                onChange={handleFilterChange}
                fullWidth
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={handleReset}>Reset</Button>
                <Button onClick={handleCloseFilters}>Close</Button>
              </Box>
            </Stack>
          </Box>
        </Popover>
        <WaterLegend />
      </Box>

      <Box sx={{ p: 1 }}>
        <WaterSidebar
          resources={data.waterResources}
          onSelect={setSelectedResource}
          selectedId={selectedResource ? selectedResource.id : null}
        />
      </Box>
    </Box>
  );
}

export default WaterMap;
