import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  Button,
  Avatar,
} from '@mui/material';
import Navbar from '../components/Navbar';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const IncidentsPage = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      const snapshot = await getDocs(collection(db, "incidents"));
      const uploadedData = snapshot.docs.map(doc => ({
        id: doc.id,
        uploaded: true,
        ...doc.data()
      }));

      // Dummy incident history
      const dummyData = [
        {
          id: "dummy1",
          timestamp: "2025-04-09T12:45:00",
          location: "Kakkanad, Kochi",
          camera: "Cam 12",
          severity: "High",
          status: "Pending",
          filename: "cam1_footage.mp4",
          confidence: 0.87,
          screenshot_path: "",
          uploaded: false
        },
        {
          id: "dummy2",
          timestamp: "2025-04-09T09:12:00",
          location: "Palarivattom, Kochi",
          camera: "Cam 05",
          severity: "Low",
          status: "Resolved",
          filename: "traffic_east_zone.mp4",
          confidence: 0.41,
          screenshot_path: "",
          uploaded: false
        },
      ];

      const allData = [...uploadedData, ...dummyData].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );

      setIncidents(allData);
    };

    fetchIncidents();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'Resolved':
        return 'success';
      case 'In Progress':
        return 'info';
      default:
        return 'default';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom color="primary">
          Incident History
        </Typography>

        <Paper elevation={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Screenshot</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Camera</TableCell>
                  <TableCell>Filename</TableCell>
                  <TableCell>Confidence</TableCell>
                  <TableCell>Severity</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incidents.map((incident, index) => (
                  <TableRow key={incident.id || index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {incident.screenshot_path ? (
                        <Avatar
                          variant="rounded"
                          src={`http://localhost:8000/${incident.screenshot_path}`}
                          alt="screenshot"
                          sx={{ width: 56, height: 56 }}
                        />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>{new Date(incident.timestamp).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(incident.timestamp).toLocaleTimeString()}</TableCell>
                    <TableCell>{incident.location || "-"}</TableCell>
                    <TableCell>{incident.camera || "-"}</TableCell>
                    <TableCell>{incident.filename || "-"}</TableCell>
                    <TableCell>
                      {incident.confidence ? `${(incident.confidence * 100).toFixed(1)}%` : "-"}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={incident.severity || "Unknown"}
                        color={getSeverityColor(incident.severity)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={incident.status || "Unknown"}
                        color={getStatusColor(incident.status)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Box mt={3}>
          <Button variant="outlined" color="primary" href="/">
            ⬅ Go Back to Dashboard
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default IncidentsPage;
