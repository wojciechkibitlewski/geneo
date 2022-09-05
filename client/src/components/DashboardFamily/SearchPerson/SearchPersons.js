import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import SearchPersonForm from "../../Forms/SearchPersonForm";
import Persons from "./Persons";
import FamilyHeader from "../FamilyHeader";

const SearchPersons = () => {
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
            <FamilyHeader title="Wyszukaj osoby w bazie" bc0={{link: "/", title: "Start"}} bc1={{link: "/family", title: "Strona główna"}} bc2={{link: "family/searchpersons", title: "Szukaj osób"}} />
            <SearchPersonForm />
            <Persons />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default SearchPersons;

