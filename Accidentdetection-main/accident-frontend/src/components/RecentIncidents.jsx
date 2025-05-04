import { useEffect, useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';

export default function RecentIncidents() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/incidents')
      .then((res) => res.json())
      .then((data) => setIncidents(data))
      .catch((err) => console.error('Error fetching incidents:', err));
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Recent Incidents
      </Typography>

      <TableContainer component={Paper} sx={{ backgroundColor: '#1e1e1e' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#2c2c2c' }}>
              <TableCell sx={{ color: '#ccc' }}>Time</TableCell>
              <TableCell sx={{ color: '#ccc' }}>Location</TableCell>
              <TableCell sx={{ color: '#ccc' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incidents.map((incident, index) => (
              <TableRow key={index}>
<TableCell sx={{ color: '#eee' }}>{new Date(incident.timestamp).toLocaleString()}</TableCell>
                <TableCell sx={{ color: '#eee' }}>{incident.location}</TableCell>
                <TableCell>
                  <Chip
                    label={incident.status}
                    color={incident.status === 'Critical' ? 'error' : 'success'}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
