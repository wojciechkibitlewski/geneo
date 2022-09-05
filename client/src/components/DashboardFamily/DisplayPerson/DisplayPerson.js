import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import FamilyHeader from "../FamilyHeader";
import CardPerson from "./CardPerson";

const URL = process.env.REACT_APP_API_BASE_URL;
 
  
  const fetchHandler = async (id) => {
    return await Axios.get(`${URL}persons/${id}`,{
      responseType: "json"
    }).then((res) => res.data);
  };

const DisplayPerson = () => {
  
  const navigate = useNavigate();
  const [listPerson, setListPerson] = useState([]);
  let { id } = useParams();
  

  useEffect(() => {
    fetchHandler(id).then((data) => setListPerson(data));
  }, [id]);
  
  //console.log(listPerson);
  //console.log(listPerson.name);


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
            <FamilyHeader
              title="Szczegóły profilu"
              bc0={{ link: "/", title: "Start" }}
              bc1={{ link: "/family", title: "Strona główna" }}
              bc2={{ link: "family/searchpersons", title: "Szukaj osób" }}
            />
            <Button onClick={() => navigate(-1)}>
              {" "}
              <KeyboardBackspaceIcon /> Wróć do listy
            </Button>
              <Grid container spacing={2} >
                <Grid item xs={12} sm={9}>
                  <CardPerson data={listPerson} />
                </Grid>
                <Grid item xs={12} sm={3}>
                 
                </Grid>
              </Grid>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default DisplayPerson;
