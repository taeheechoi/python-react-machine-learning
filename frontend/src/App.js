import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from "axios";



export default function App() {

  const [weight, setWeight] = useState(null)
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)

    axios({
      url: "http://127.0.0.1:8000/v1/api/weight/",
      method: "POST",
      data: {
        gender: data.get('gender'),
        height: parseFloat(data.get('height'))
      }
    })
      .then(res => {
         setWeight(res.data.weight)
      }
      )
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Weight Prediction
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl sx={{ m: 3 }} variant="standard">
            <FormLabel id="gender-group-label">Select your gender:</FormLabel>
            <RadioGroup
              aria-labelledby="gender-group-label"
              name="gender"
              defaultValue="female"
              required
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />

            </RadioGroup>

            <FormLabel id="height-label">Enter your height:</FormLabel>
            <Input
              id="height"
              name="height"
              endAdornment={<InputAdornment position="end">cm</InputAdornment>}
              inputProps={{
                'aria-label': 'height',
              }}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Prediction
            </Button>
          </FormControl>

        </Box>
        <FormLabel id="height-label">Weight Predicted: {weight} kg</FormLabel>
      </Box>

    </Container>
  )
}
