import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Axios from "axios";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import FamilyHeader from "../FamilyHeader";
import EditPersonForm from './Form/EditPersonForm';

const URL = process.env.REACT_APP_API_BASE_URL;

const EditPerson = (props) => {
  let { id } = useParams();

  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    birthplace: "",
  });
  
  const onSubmit = async (values, actions) => {

  }
  
  useEffect(() => {
    Axios
    .get(`${URL}persons/` 
        + id
      )
      .then((res) => {
        const { gender, name, surname, surnameMarried, nobility, profession, age, 
          birthday, birthmonth, birthyear, birthyeartwo, birthplace, birthpar, fatherName, father, 
          motherName, mother, link, info} = res.data;
        setFormValues({ gender, name, surname, surnameMarried, nobility, profession, age, 
          birthday, birthmonth, birthyear, birthyeartwo, birthplace, birthpar, fatherName, father, 
          motherName, mother, link, info });
      })
      .catch((err) => console.log(err));
  }, [id]);

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
              <FamilyHeader title="Edytowanie danych" bc0={{link: "/", title: "Start"}} bc1={{link: "/family", title: "Strona główna"}} bc2={{link: "family/listperson", title: "Twoje odkrycia"}} />
            
            </Grid>
            <Grid item xs={12} md={8}>
              
            <EditPersonForm 
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize
            />


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

export default EditPerson