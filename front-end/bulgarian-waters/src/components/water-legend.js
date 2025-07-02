import React from "react";
import { Box, Typography } from "@mui/material";

const legendItems = [
  { type: "Dam", color: "#d32f2f" },
  { type: "Lake", color: "#1976d2" },
  { type: "Reservoir", color: "#388e3c" },
  { type: "River", color: "#fbc02d" },
];

function WaterLegend() {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 20,
        left: 20,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 2,
        boxShadow: 3,
        p: 2,
        minWidth: 140,
        zIndex: 10,
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        Legend
      </Typography>
      {legendItems.map(({ type, color }) => (
        <Box
          key={type}
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 0.5,
          }}
        >
          <Box
            sx={{
              width: 18,
              height: 18,
              backgroundColor: color,
              borderRadius: "50%",
              border: "2px solid white",
              mr: 1.5,
            }}
          />
          <Typography variant="body2">{type}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default WaterLegend;
