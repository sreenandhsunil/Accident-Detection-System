// src/components/Stats.jsx

import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Stats = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card sx={{ backgroundColor: '#1976d2', color: 'white' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <NotificationsActiveIcon /> Total Incidents Today
            </Typography>
            <Typography variant="h4">5</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ backgroundColor: '#d32f2f', color: 'white' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <WarningIcon /> Critical Alerts
            </Typography>
            <Typography variant="h4">2</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ backgroundColor: '#388e3c', color: 'white' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <AccessTimeIcon /> Last Incident
            </Typography>
            <Typography variant="h4">2 mins ago</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Stats;
