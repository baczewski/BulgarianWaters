import React from "react";
import { Popup } from "react-map-gl/mapbox";
import { Box, Typography, Link, Divider } from "@mui/material";

function WaterPopup({ resource, onClose }) {
  return (
    <Popup
      longitude={resource.coordinates.longitude}
      latitude={resource.coordinates.latitude}
      anchor="top"
      closeButton={true}
      closeOnClick={false}
      onClose={onClose}
      maxWidth="300px"
    >
      <Box sx={{ p: 2, maxWidth: 300 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {resource.name}
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Type:</strong> {resource.type}
        </Typography>

        {/* {resource.description && (
          <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
            {resource.description}
          </Typography>
        )} */}

        <Link
          href={resource.id}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          View on Wikidata
        </Link>
      </Box>
    </Popup>
  );
}

export default WaterPopup;
