import * as React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import SearchPublicForm from "../Forms/SearchPublicForm";

const Public = () => {
  return (
    <main>
      <div className="splash">
        <Container
          maxWidth="lg"
          sx={{
            textAlign: "left",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              alignItems: "flex-end",
            }}
          >
            <Grid item xs={12} md={6}>
              <SearchPublicForm />
            </Grid>
            <Grid item xs={12} md={6} sx={{ padding: "20px" }}>
              <Typography
                component="p"
                variant="h5"
                sx={{ color: "#fff", marginLeft: "20px" }}
              >
                Znajdź swojch przodków urodzonych i mieszkających w parafii
                Filipów. Dane pochodzą z archiwów parafialnych z lat 1808-1920.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>

      <Container
        maxWidth="lg"
        sx={{
          textAlign: "left",
          justifyContent: "space-between",
          marginBottom:'30px',
        }}
      >
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          <Grid item xs={12} md={6}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography component="p">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default Public;
