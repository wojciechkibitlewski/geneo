import React from "react";
import { useState} from "react";

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import TextfieldWrapper from './FormsUI/TextfieldWrapper';
import RadioGroupWrapper from "./FormsUI/RadioGroupWrapper";
import { TextFieldAutocompleteFather, TextFieldAutocompleteMother } from "./TextFieldAutocomplete";

import { days, months } from "../../../config/functions"

const AddPersonForm = (props) => {

  const validationSchema = Yup.object().shape({
    gender: Yup.string().required("Pole wymagane"),
    name: Yup.string()
      .matches(/^([a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ]\s*)+$/, "Czy to prawidłowe imię?")
      .max(60, "Maksymalnie 60 znaków"),
    surname: Yup.string()
      .matches(
        /^([a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ]\s*)+$/,
        "Czy to prawidłowe nazwisko?"
      )
      .max(60, "Maksymalnie 60 znaków"),
    surnameMarried: Yup.string()
      .matches(
        /^([a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ]\s*)+$/,
        "Czy to prawidłowe nazwisko?"
      )
      .max(60, "Maksymalnie 60 znaków"),
    nobility: Yup.string()
      .matches(/^([a-zA-Z0-9ęółśążźćńĘÓŁŚĄŻŹĆŃ.]\s*)+$/, "Czy to poprawne dane?")
      .max(40, "Maksymalnie 40 znaków"),
    profession: Yup.string()
      .matches(/^([a-zA-Z0-9ęółśążźćńĘÓŁŚĄŻŹĆŃ]\s*)+$/, "Czy to poprawne dane?")
      .max(40, "Maksymalnie 40 znaków"),
    birthyear: Yup.number()
      .integer()
      .min(1000, "Nieprawidłowy rok")
      .max(2100, "Nieprawidłowy rok"),
    birthyearone: Yup.number()
      .integer()
      .min(1000, "Nieprawidłowy rok")
      .max(2100, "Nieprawidłowy rok"),
    birthyeartwo: Yup.number()
      .integer()
      .min(1000, "Nieprawidłowy rok")
      .max(2100, "Nieprawidłowy rok")
      .moreThan(
        Yup.ref("birthyearone"),
        "Data jest późniejsza niż pierwsza data"
      ),
    birthplace: Yup.string()
      .matches(/^([a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ]\s*)+$/, "Czy to prawidłowa nazwa?")
      .max(60, "Maksymalnie 60 znaków"),
    birthpar: Yup.string()
      .matches(/^([a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ]\s*)+$/, "Czy to prawidłowa nazwa?")
      .max(60, "Maksymalnie 60 znaków"),
  });

  const [isAge, setAge] = useState("");
  const [isBirthday, setBirthDay] = useState("");
  const [isBirthmonth, setBirthMonth] = useState("");

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };
  const handleChangeBirthDay = (event) => {
    setBirthDay(event.target.value);
  };
  const handleChangeBirthMonth = (event) => {
    setBirthMonth(event.target.value);
  };

  return (
    <Box
        sx={{
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
     <Formik
       enableReinitialize={true}
       {...props} validationSchema={validationSchema}
     >
       {props => (
         <Form onSubmit={props.handleSubmit} >
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12}  sx={{padding: "10px"}}>
                <RadioGroupWrapper name="gender" props={props} />
              </Grid>
              <Grid item xs={12} sm={6}  sx={{padding: "10px"}}>
                <TextfieldWrapper 
                  label="Imię / imiona"
                  name="name"
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}  sx={{padding: "10px"}}>
                <TextfieldWrapper 
                  label="Nazwisko"
                  name="surname"
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{padding: "10px"}}></Grid>
              <Grid item xs={12} sm={6} sx={{padding: "10px"}}>
                <TextfieldWrapper 
                  label="Nazwisko po ślubie"
                  name="surnameMarried"
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{padding: "10px"}}>
                <TextfieldWrapper 
                  label="Tytuł"
                  name="nobility"
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{padding: "10px"}}>
                <TextfieldWrapper 
                  label="Zawód"
                  name="profession"
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={0}
              sx={{marginTop: "20px", paddingBottom: '10px', backgroundColor: "#f6fff8"}}
            >
              <Grid item xs={12} sm={12}
                sx={{
                  borderTop: "solid 1px #aaa",
                  marginLeft: "0px",
                  marginBottom: "20px",
                  paddingBottom: "0px",
                  textAlign: "right",
                }}
              ></Grid>
              <Grid item xs={12} sm={6} sx={{padding: "10px"}}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} >
                    <FormControl fullWidth>
                      <InputLabel id="du-select-label">Data urodzenia</InputLabel>
                      <Select
                        id="du-simple-select"
                        labelId="du-select-label"
                        label="Age"
                        name="age"
                        onChange={(e) => {
                          handleChangeAge(e);
                          props.handleChange(e);
                        }}
                        value={isAge}
                      >
                        <MenuItem value={1}>Dokładnie</MenuItem>
                        <MenuItem value={2}>Od... do...</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {isAge === 2 ? (
                    <>
                      <Grid item xs={6} sm={6}>
                        <TextfieldWrapper 
                          label="Rok"
                          name="birthyearone"
                        />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextfieldWrapper 
                            label="Rok"
                            name="birthyeartwo"
                          />
                      </Grid>
                    </>
                  ) : (
                    <>
                    <Grid item xs={4} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel id="label-day">Dzień</InputLabel>
                        <Select
                          id="select-day"
                          labelId="label-day"
                          label="Dzień"
                          name="birthday"
                          onChange={(e) => {
                            handleChangeBirthDay(e);
                            props.handleChange(e);
                          }}
                          value={isBirthday}
                        >
                          {days.map((day, key) => (
                            <MenuItem key={key} value={day}>
                              {day}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel id="label-month">Miesiąc</InputLabel>
                        <Select
                          id="select-month"
                          labelId="label-month"
                          label="Miesiąc"
                          name="birthmonth"
                          onChange={(e) => {
                            handleChangeBirthMonth(e);
                            props.handleChange(e);
                          }}
                          value={isBirthmonth}
                        >
                          {months.map((month, key) => (
                            <MenuItem key={month.month} value={month.number}>
                              {month.month}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <TextfieldWrapper 
                        label="Rok"
                        name="birthyear"
                      />

                    </Grid>

                    </>  
                  )}
                  {props.touched.birthyear && props.errors.birthyear ? (
                    <Alert
                      sx={{ width: "100%", marginTop: "10px" }}
                      severity="error"
                    >
                      {props.errors.birthyear}
                    </Alert>
                  ) : null}

                  {props.touched.birthyearone && props.errors.birthyearone ? (
                    <Alert
                      sx={{ width: "100%", marginTop: "10px" }}
                      severity="error"
                    >
                      {props.errors.birthyearone}
                    </Alert>
                  ) : null}
                  {props.touched.birthyeartwo && props.errors.birthyeartwo ? (
                    <Alert
                      sx={{ width: "100%", marginTop: "10px" }}
                      severity="error"
                    >
                      {props.errors.birthyeartwo}
                    </Alert>
                  ) : null}
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6}  sx={{padding: "10px"}}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12}>
                    <TextfieldWrapper 
                     label="Miejsce urodzenia"
                     name="birthplace"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextfieldWrapper 
                     label="Parafia"
                     name="birthpar"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={0} sx={{marginTop: "0px"}} >
              <Grid item xs={12} sm={12}sx={{ borderTop: "solid 1px #aaa", marginLeft: "0px", 
              marginBottom: "20px", paddingBottom: "0px", textAlign: "right", }}>
              </Grid>
                
              <Grid item xs={12} sm={6}  sx={{padding: "10px"}}>
                <TextFieldAutocompleteFather 
                label="Imię i nazwisko ojca"
                name="fatherNameTmp"
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{padding: "10px"}}>
                <TextFieldAutocompleteMother 
                label="Imię i nazwisko matki"
                name="motherNameTmp"
                />
              </Grid>

            </Grid>
            <Grid container spacing={0} sx={{marginTop: "20px", paddingBottom: '10px', backgroundColor: "#f6fff8"}} >
              <Grid item xs={12} sm={12} 
              sx={{ borderTop: "solid 1px #aaa", marginLeft: "0px", marginBottom: "10px", paddingBottom: "0px", textAlign: "right", }}>
              </Grid>
              <Grid item xs={12} sm={12}  sx={{padding: "10px"}}>
                <TextfieldWrapper 
                  label="Link do aktu urodzenia"
                  name="link"
                />
              </Grid>
              <Grid item xs={12} sm={12}  sx={{padding: "10px"}}>
                <TextfieldWrapper 
                  multiline
                  rows={4}
                  label="Dodatkowe informacje"
                  name="info"
                />
              </Grid>

            </Grid>  
            <Grid item xs={12} sm={12}
                sx={{
                  borderTop: "solid 1px #aaa",
                  marginLeft: "0px",
                  marginTop: "0px",
                  paddingTop: "20px",
                  marginBottom: "0px",
                  paddingBottom: "0px",
                  textAlign: "right",
                }}
              ></Grid>
              <Grid item xs={12} sm={12} sx={{textAlign:"right", padding: "10px"}} >
                <Button variant="outlined" color="error" size="large">
                  Wyczyść
                </Button>

                <Button variant="contained" type="submit" sx={{ backgroundColor: "#263238", marginLeft: "20px" }} size="large" >
                  Zapisz dane
                </Button>
              </Grid>
            
           
           
           
         </Form>
       )}
     </Formik>
   </Box>
    
  );
};

export default AddPersonForm;
