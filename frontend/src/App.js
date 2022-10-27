import React from 'react';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import WeightPrediction from './WeightPrediction';
import OCR from './OCR';

export default function App() {
  return (
    <Container component="main" maxWidth="xs">
      <WeightPrediction/>
      <Divider/>
      <OCR/>
    </Container>
  )
}
