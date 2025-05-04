import { Box, Typography } from '@mui/material';

export default function Livefeed({ title, src }) {
  const isOnline = true; // Later, you can pass this dynamically

  return (
    <Box sx={{ mb: 2, position: 'relative' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
        {title}{' '}
        <span style={{ color: isOnline ? 'green' : 'red', fontSize: '0.75rem' }}>
          ● {isOnline ? 'Online' : 'Offline'}
        </span>
      </Typography>

      <Box sx={{ position: 'relative' }}>
        <Box
          component="video"
          controls
          autoPlay
          loop
          muted
          src={src}
          sx={{
            width: '100%',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'grey.700',
            outline: 'none',
          }}
        />

        {/* Timestamp Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: 'white',
            px: 1,
            borderRadius: 1,
            fontSize: '0.75rem',
          }}
        >
          9:41 PM
        </Box>
      </Box>
    </Box>
  );
}
