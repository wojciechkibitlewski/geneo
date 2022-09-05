import React from 'react'

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import {Box, Container, Grid } from '@mui/material';
import { FormPerson } from '../Forms/FormPerson';

import FamilyHeader from "../FamilyHeader";

const URL = process.env.REACT_APP_API_BASE_URL;

const EditPerson = (props) => {
  let { id } = useParams();
  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    surnameMarried: "",
    nobility: "",
    profession: "",
    age: "",
    birthyear :"", 
    birthyeartwo: "",
    birthday: "",
    birthmonth: "",
    birthplace: "",
    birthpar: "",
    father: "",
    fatherName: "",
    nFatherName: "",
    mother: "",
    motherName: "",
    nMotherName: "",
    link:"",
    info:""
  });
  
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);
    //console.log(values);
    /* 
    let fullname = values.name.concat(' ', values.surname);
    
    let fullnameMarried = '';
    if(values.surnameMarried !=='') {
      fullnameMarried = values.name.concat(' ', values.surnameMarried);
      fullname = values.name.concat(' ', values.surnameMarried);
      
    }
    const father = values.father.match(/^[0-9a-fA-F]{24}$/)
    const mother = values.mother.match(/^[0-9a-fA-F]{24}$/)
    const birthyear = !values.birthyearone ? values.birthyear : values.birthyearone 

    
    await  axios.put(`${URL}persons`, {
        id: values.id,
        gender: values.gender,
        name: values.name,
        surname: values.surname,
        surnameMarried: values.surnameMarried,
        fullname: fullname,
        fullnameMarried: fullnameMarried,
        nobility: values.nobility,
        profession: values.profession,
        age: values.age,
        birthday: values.birthday,
        birthmonth: values.birthmonth,
        birthyear: birthyear,
        birthyeartwo: values.birthyeartwo,
        birthplace: values.birthplace,
        birthpar: values.birthpar,
        fatherName: values.fatherName,
        father: father,
        motherName: values.motherName,
        mother: mother,
        link: values.link,
        info: values.info,
    }, 
      {
      "headers": {
        "content-type": "application/json",
      }
    }).then(function (response) {
      //navigate("/family/listpersons")
      console.log(response);
    }).catch(function (error) {
      console.log(error.response);
    }); 
    */

  }


  useEffect(() => {
    axios
      .get(
        `${URL}persons/` 
        + id
      )
      .then((res) => {
        let { name, surname, surnameMarried, nobility, profession, age, birthyear, birthyeartwo, birthday, birthmonth, birthplace, birthpar, father, fatherName, mother, motherName, link, info } = res.data;
        if(name == null) name='';
        if(surname == null) surname='';
        if(surnameMarried == null) surnameMarried='';
        if(nobility == null) nobility='';
        if(profession == null) profession='';
        if(birthyear == null) birthyear='';
        if(birthyeartwo == null) birthyeartwo='';
        if(birthday == null) birthday='';
        if(birthmonth == null) birthmonth='';
        if(birthplace == null) birthplace='';
        if(birthpar == null) birthpar='';
        

        if(father !== null) father = father._id;
        if(father == null) father='';
        if(fatherName == null) fatherName='';        
        let nFatherName = fatherName;
        
        if(mother !== null) mother = mother._id;
        if(mother == null) mother='';
        if(motherName == null) motherName='';  
        let nMotherName = motherName;
        
        if(link == null) link='';
        if(info == null) info='';

        setFormValues({ name, surname, surnameMarried, nobility, profession, age, birthyear, birthyeartwo, birthday, birthmonth, birthplace, birthpar, father, fatherName, nFatherName, mother, motherName, nMotherName, link, info });
      })
      .catch((err) => console.log(err));
  }, [id]);
  //console.log(formValues)

  return (
    <main>
      <div className="tlo"></div>
      <Container maxWidth="lg"
        sx={{
          textAlign: "left",
          justifyContent: "space-between",
          marginTop: "100px"
        }}
      >
        <Grid container spacing={2} sx={{ alignItems: "flex-end" }}>
          <Grid item xs={12} md={12}>
            <FamilyHeader title="Edytowanie danych" bc0={{link: "/", title: "Start"}} bc1={{link: "/family", title: "Strona główna"}} bc2={{link: "family/listperson", title: "Twoje odkrycia"}} />
          </Grid>
          <Grid item xs={12} md={8}>    
              
            <Box sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#ffffff",
              padding: "10px",
              borderRadius: "10px",
              border: "solid 1px #aaa",
            }}
            > 
              <FormPerson 
              initialValues={formValues}
              onSubmit={onSubmit}
              enableReinitialize
              />
          
            </Box>
          </Grid>
        </Grid>
      </Container>
    </main>
  )
}

export default EditPerson