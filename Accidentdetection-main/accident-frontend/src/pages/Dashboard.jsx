// src/pages/Dashboard.jsx

import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import Grid from "@mui/material/Grid";
import Navbar from '../components/Navbar';
import Livefeed from '../components/Livefeed';
import Stats from '../components/Stats';
import RecentIncidents from '../components/RecentIncidents';
import UploadVideo from '../components/UploadVideo';
import MapView from '../components/MapView';

function Dashboard() {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom color="primary">
          Accident Detection Dashboard
        </Typography>

        {/* Surveillance Camera Feeds */}
        <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Surveillance Camera Live Feeds
          </Typography>

          <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2 }}>
            <Box sx={{ minWidth: 300 }}>
              <Livefeed title="Camera 1 - Main Gate" src="/videos/cam1.mp4" />
            </Box>
            <Box sx={{ minWidth: 300 }}>
              <Livefeed title="Camera 2 - Parking Area" src="/videos/cam2.mp4" />
            </Box>
            <Box sx={{ minWidth: 300 }}>
              <Livefeed title="Camera 3 - Highway Entrance" src="/videos/cam3.mp4" />
            </Box>
            <Box sx={{ minWidth: 300 }}>
              <Livefeed title="Camera 4 - Sidewalk" src="/videos/cam4.mp4" />
            </Box>
          </Box>
        </Paper>

        {/* Stats and Recent Incidents */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid xs={12} md={8}>
            <Stats />
          </Grid>
          <Grid xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Incidents
              </Typography>
              <RecentIncidents />
            </Paper>
          </Grid>
        </Grid>

        {/* Upload & Map Section */}
        <Grid xs={12}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upload & Analyze Video
            </Typography>
            <UploadVideo />

            <Box mt={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                📍 Camera Location:
              </Typography>
              <Typography variant="body1">Main Street Junction, Kochi</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                🕒 Uploaded: 2 minutes ago
              </Typography>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Camera Locations Map
            </Typography>
            <MapView />
          </Paper>
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
