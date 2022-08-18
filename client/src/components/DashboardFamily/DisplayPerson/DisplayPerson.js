import React from 'react'
import {useNavigate} from 'react-router-dom';

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import FamilyHeader from "../FamilyHeader";

const DisplayPerson = () => {
    const navigate = useNavigate();

  return (
    <main>
    <div className="tlo"></div>
    <Container maxWidth="lg" sx={{ marginTop: "100px" }}>
      <Grid
        container
        spacing={2}
        sx={{
          alignItems: "flex-end",
        }}
      >
        <Grid item xs={12} md={12}>
        <FamilyHeader title="Szczegóły profilu" bc0={{link: "/", title: "Start"}} bc1={{link: "/family", title: "Strona główna"}} bc2={{link: "family/searchpersons", title: "Szukaj osób"}} />
        <Button onClick={() => navigate(-1)}> <KeyboardBackspaceIcon /> Wróć do listy</Button>
        </Grid>
      </Grid>
    </Container>
  </main>
  )
}

export default DisplayPerson