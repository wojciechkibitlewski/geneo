import React from 'react'
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FamilyHeader from "./FamilyHeader";

const Welcome = () => {
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
          <FamilyHeader title="Dzień dobry {Wojtek}" bc0={{link: "/", title: "Start"}} bc1={{link: "/family", title: "Strona główna"}}/>
            
          </Grid>
        </Grid>
      </Container>
    </main>

  )
}

export default Welcome