// src/pages/StatsPage.jsx
import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import Navbar from '../components/Navbar';

// Dummy Data
const dailyIncidents = [
  { date: 'Apr 1', incidents: 3 },
  { date: 'Apr 2', incidents: 5 },
  { date: 'Apr 3', incidents: 2 },
  { date: 'Apr 4', incidents: 4 },
  { date: 'Apr 5', incidents: 6 },
  { date: 'Apr 6', incidents: 3 },
  { date: 'Apr 7', incidents: 7 },
];

const severityDistribution = [
  { name: 'High', value: 6 },
  { name: 'Medium', value: 9 },
  { name: 'Low', value: 4 },
];

const COLORS = ['#e53935', '#fbc02d', '#43a047'];

const StatsPage = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom color="primary">
          Detection Statistics
        </Typography>

        <Grid container spacing={4}>
          {/* Line Chart: Daily Incidents */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Daily Incident Count
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyIncidents}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="incidents" stroke="#1976d2" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Pie Chart: Severity Distribution */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Incident Severity
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={severityDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {severityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Back Button */}
        <Box mt={3}>
          <Button variant="outlined" color="primary" href="/">
            ⬅ Go Back to Dashboard
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default StatsPage;
