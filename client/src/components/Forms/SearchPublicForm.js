import React from 'react'

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const SearchPublicForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      surname: data.get('surname'),
      birthyear: data.get('birthyear'),
    });
  };

  return (
    <React.Fragment>
      <Container component="main">
      <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: "20px",
            borderRadius: "10px",
          }}
      >
         <Typography component="h1" variant="h6">
         Szukaj krewnych pochodzących z Filipowa i okolic
          </Typography> 
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Imię"
              name="name"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="surname"
              label="Nazwisko"
              name="surname"
            />
            <TextField
              margin="normal"
              fullWidth
              id="birthyear"
              label="Rok urodzenia"
              name="birthyear"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              Szukaj
            </Button>
            
          </Box>
      </Box>

      </Container>

    </React.Fragment>
  )
}

export default SearchPublicForm
