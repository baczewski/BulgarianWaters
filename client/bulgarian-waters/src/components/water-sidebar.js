import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
  Divider,
  Box,
} from '@mui/material';

function WaterSidebar({ resources, onSelect, selectedId }) {
  return (
    <Box
      sx={{
        width: 300,
        boxSizing: 'border-box',
        backgroundColor: '#f4f6f8',
        padding: '16px 0',
        borderRadius: 2,
        boxShadow: 3,
        flexShrink: 0,
        overflowY: 'auto',
        maxHeight: '100%',
      }}
    >
      <List
        subheader={
          <ListSubheader component="div" sx={{ fontSize: 20, fontWeight: 600 }}>
            Water Resources
          </ListSubheader>
        }
      >
        {resources.map((resource, index) => {
          const isSelected = resource.id === selectedId;
          return (
            <ListItem
              button
              key={resource.id + index}
              onClick={() => onSelect(resource)}
              sx={{
                px: 3,
                bgcolor: isSelected ? 'success.light' : 'transparent',
                borderBottom: '1px solid #ddd',
                '&:hover': {
                  bgcolor: isSelected ? 'success.main' : 'action.hover',
                },
              }}
            >
              <ListItemText
                primary={<Typography variant="subtitle1">{resource.name}</Typography>}
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {resource.type}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </Box>
  );
}

export default WaterSidebar;
