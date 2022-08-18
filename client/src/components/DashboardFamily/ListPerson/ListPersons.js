import React from 'react'
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FamilyHeader from "../FamilyHeader";

const ListPersons = () => {
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
        <FamilyHeader title="Spis osób dodanych przez Ciebie" bc0={{link: "/", title: "Start"}} bc1={{link: "/family", title: "Strona główna"}} bc2={{link: "family/listperson", title: "Twoje odkrycia"}} />
              
        </Grid>
      </Grid>
    </Container>
  </main>
  )
}

export default ListPersons