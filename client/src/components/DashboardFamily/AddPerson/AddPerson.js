import React from 'react'
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import AddPersonForm from '../../Forms/AddPersonForm';
import FamilyHeader from "../FamilyHeader";

const AddPerson = () => {
  
  return (
    <main>
      <div className="tlo"></div>
      <Container
          maxWidth="lg"
          sx={{
            textAlign: "left",
            justifyContent: "space-between",
            marginTop: "100px"
          }}
        >
          
          <Grid
            container
            spacing={2}
            sx={{
              alignItems: "flex-end",
            }}
          >
            <Grid item xs={12} md={12}>
              <FamilyHeader title="Dodawanie nowej osoby" bc0={{link: "/", title: "Start"}} bc1={{link: "/family", title: "Strona główna"}} bc2={{link: "family/addperson", title: "Dodaj osobę do bazy"}} />
            
            </Grid>
            <Grid item xs={12} md={8}>
              <AddPersonForm />
            </Grid>
            <Grid item xs={12} md={4} sx={{ padding: "10px" }}>
              <Typography
                component="p"
                sx={{ }}
              >
                <b>WAŻNE!</b> Staraj się wpisywać jak najdokładniejsze dane. Jeśli masz wątpliwości, nie możesz rozczytać aktu urodzenia lub śmierci danej osoby - skontaktuj się z nami. <br/><br/>

              </Typography>
            </Grid>
          </Grid>


        </Container>

    </main>
  )
}

export default AddPerson