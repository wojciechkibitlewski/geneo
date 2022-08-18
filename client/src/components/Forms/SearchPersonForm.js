import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const SearchPersonForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      surname: data.get("surname"),
      birthyear: data.get("birthyear"),
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        mt: 1,
        backgroundColor: "#fff",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Imię"
            name="name"
            autoFocus
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            margin="normal"
            fullWidth
            id="surname"
            label="Nazwisko"
            name="surname"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            margin="normal"
            fullWidth
            id="birthyear"
            label="Rok urodzenia"
            name="birthyear"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 2, mb: 0, pt: 2, pb: 1 }}
          >
            Szukaj
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchPersonForm;
