import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
  Divider,
} from '@mui/material';

function WaterSidebar({ resources, onSelect }) {
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: 300,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 300,
          boxSizing: 'border-box',
          backgroundColor: '#f4f6f8',
          padding: '16px 0',
        },
      }}
    >
      <List
        subheader={
          <ListSubheader component="div" sx={{ fontSize: 20, fontWeight: 600 }}>
            Water Resources
          </ListSubheader>
        }
      >
        {resources.map((resource) => (
          <ListItem
            button
            key={resource.id}
            onClick={() => onSelect(resource)}
            sx={{ px: 3 }}
          >
            <ListItemText
              primary={<Typography variant="subtitle1">{resource.name}</Typography>}
              secondary={<Typography variant="body2" color="text.secondary">{resource.type}</Typography>}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}

export default WaterSidebar;
