import Navbar from '../components/Navbar';
import { Typography, Container, Paper, Box, Button } from '@mui/material';
import Livefeed from '../components/Livefeed';
import { useNavigate } from 'react-router-dom';

function LiveFeedPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Live Feed
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <Livefeed />
        </Paper>

        <Box sx={{ mt: 3 }}>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Go Back
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default LiveFeedPage;
