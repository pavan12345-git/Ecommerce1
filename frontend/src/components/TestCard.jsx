import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TestCard = () => {
  return (
    <Card sx={{ minWidth: 275, border: '2px solid green', margin: 2 }}>
      <CardContent>
        <Typography variant="h5">Material-UI Test</Typography>
        <Typography>If you see this, MUI is working</Typography>
      </CardContent>
    </Card>
  );
};

export default TestCard; // This is crucial