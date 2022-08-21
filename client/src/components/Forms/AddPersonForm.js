import React from "react";
import Axios from "axios";

import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import * as Yup from "yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/material/Alert";

import { days, months } from "../config/functions";
import {TextFieldAutocompleteFather, TextFieldAutocompleteMother} from "./TextFieldAutocomplete"

const URL = process.env.REACT_APP_API_BASE_URL;

const AddPersonForm = () => {
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

  ///validate
  const schema = Yup.object({
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
      .matches(
        /^([a-zA-Z0-9ęółśążźćńĘÓŁŚĄŻŹĆŃ.]\s*)+$/,
        "Czy to poprawne dane?"
      )
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
      .moreThan(Yup.ref("birthyearone"), "Data jest późniejsza niż pierwsza data"),

    birthplace: Yup.string()
      .matches(/^([a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ]\s*)+$/, "Czy to prawidłowa nazwa?")
      .max(60, "Maksymalnie 60 znaków"),
    birthpar: Yup.string()
      .matches(/^([a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ]\s*)+$/, "Czy to prawidłowa nazwa?")
      .max(60, "Maksymalnie 60 znaków"),
  });

  const navigate = useNavigate();

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched, // use this if you want controlled components
    errors,
  } = useFormik({
    initialValues: {
      gender: "",
      name: "",
      surname: "",
      surnameMarried: "",
      nobility: "",
      profession: "",
      age: 1,
      birthday: "",
      birthmonth: "",
      birthyear: "",
      birthyeartwo: "",
      birthplace: "",
      birthpar: "",
      fatherName: "",
      father: "",
      motherName: "",
      mother:"",
    },
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      console.log(values);
      
      const fullname = `${values.name} ${values.surname}`
      let fullnameMarried;
      values.surnameMarried ? fullnameMarried = `${values.name} ${values.surnameMarried}` : fullnameMarried = `${values.name} ${values.surname}`
      
      /*   
      await  Axios.post(`${URL}persons`, {
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
        birthyear: values.birthyear,
        birthyeartwo: values.birthyeartwo,
        birthplace: values.birthplace,
        birthpar: values.birthpar,
        fatherName: values.fatherName,
        father: values.father,
        motherName: values.motherName,
        mother: values.mother,
      }, {
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
    },
  });

  return (
    <React.Fragment>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          border: "solid 1px #aaa",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel
                    control={<Radio />}
                    label="Kobieta"
                    value="female"
                  />
                  <FormControlLabel
                    control={<Radio />}
                    label="Mężczyzna"
                    value="male"
                  />
                  <FormControlLabel
                    control={<Radio />}
                    label="Nieznany"
                    value="other"
                  />
                </RadioGroup>
              </FormControl>
              {touched.gender && errors.gender ? (
                <Alert sx={{ width: "100%" }} severity="error">
                  {errors.gender}
                </Alert>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                fullWidth
                id="name"
                label="Imię / imiona"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.name && errors.name ? (
                <Alert sx={{ width: "100%" }} severity="error">
                  {errors.name}
                </Alert>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="surname"
                label="Nazwisko"
                name="surname"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.surname && errors.surname ? (
                <Alert sx={{ width: "100%" }} severity="error">
                  {errors.surname}
                </Alert>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="surnameMarried"
                label="Nazwisko po ślubie"
                name="surnameMarried"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.surnameMarried && errors.surnameMarried ? (
                <Alert sx={{ width: "100%" }} severity="error">
                  {errors.surnameMarried}
                </Alert>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="nobility"
                label="Tytuł"
                name="nobility"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.nobility && errors.nobility ? (
                <Alert sx={{ width: "100%" }} severity="error">
                  {errors.nobility}
                </Alert>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="profession"
                label="Zawód"
                name="profession"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.profession && errors.profession ? (
                <Alert sx={{ width: "100%" }} severity="error">
                  {errors.profession}
                </Alert>
              ) : null}
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{marginTop: "20px"}}
          >
            <Grid item xs={12} sm={12}
              sx={{
                borderTop: "solid 1px #aaa",
                marginLeft: "16px",
                marginBottom: "0px",
                paddingBottom: "0px",
                textAlign: "right",
              }}
            ></Grid>

            <Grid item xs={12} sm={6}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id="du-select-label">Data urodzenia</InputLabel>
                    <Select
                      id="du-simple-select"
                      labelId="du-select-label"
                      label="Age"
                      name="age"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChangeAge(e);
                        handleChange(e);
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
                      <TextField
                        fullWidth
                        id="birthyearone"
                        label="Rok"
                        name="birthyearone"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        fullWidth
                        id="birthyeartwo"
                        label="Rok"
                        name="birthyeartwo"
                        onChange={handleChange}
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
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChangeBirthDay(e);
                            handleChange(e);
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
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChangeBirthMonth(e);
                            handleChange(e);
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
                      <TextField
                        fullWidth
                        id="birthyear"
                        label="Rok"
                        name="birthyear"
                        onChange={handleChange}
                      />
                    </Grid>
                  </>
                )}
                {touched.birthyear && errors.birthyear ? (
                  <Alert
                    sx={{ width: "100%", marginTop: "10px" }}
                    severity="error"
                  >
                    {errors.birthyear}
                  </Alert>
                ) : null}

                {touched.birthyearone && errors.birthyearone ? (
                  <Alert
                    sx={{ width: "100%", marginTop: "10px" }}
                    severity="error"
                  >
                    {errors.birthyearone}
                  </Alert>
                ) : null}
                {touched.birthyeartwo && errors.birthyeartwo ? (
                  <Alert
                    sx={{ width: "100%", marginTop: "10px" }}
                    severity="error"
                  >
                    {errors.birthyeartwo}
                  </Alert>
                ) : null}
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    id="birthplace"
                    label="Miejsce urodzenia"
                    name="birthplace"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.birthplace && errors.birthplace ? (
                    <Alert sx={{ width: "100%" }} severity="error">
                      {errors.birthplace}
                    </Alert>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    id="birthpar"
                    label="Parafia"
                    name="birthpar"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.birthpar && errors.birthpar ? (
                    <Alert sx={{ width: "100%" }} severity="error">
                      {errors.birthpar}
                    </Alert>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{marginTop: "20px"}}
          >
            <Grid item xs={12} sm={12}
              sx={{
                borderTop: "solid 1px #aaa",
                marginLeft: "16px",
                marginBottom: "0px",
                paddingBottom: "0px",
                textAlign: "right",
              }}
            ></Grid>          

            <Grid item xs={12} sm={6}>
              <TextFieldAutocompleteFather
                apiLink = {URL}
                id="fatherName"
                label="Imię i nazwisko ojca"
                name="fatherName"
                onBlur= {handleBlur}
                onChange={ handleChange}
               />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldAutocompleteMother
                apiLink = {URL}
                id="motherName"
                label="Imię i nazwisko matki"
                name="motherName"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            
            </Grid>
          </Grid>
          
          
          <Grid
            container
            spacing={2}
            sx={{marginTop: "20px"}}
          >
            <Grid item xs={12} sm={12}
              sx={{
                borderTop: "solid 1px #aaa",
                marginLeft: "16px",
                marginBottom: "0px",
                paddingBottom: "0px",
                textAlign: "right",
              }}
            ></Grid> 
            <Grid
              item
              xs={12}
              sm={12} sx={{textAlign:"right"}}>
              <Button variant="outlined" color="error" size="large">
                Wyczyść
              </Button>

              <Button
                variant="contained"
                type="submit"
                sx={{ backgroundColor: "#263238", marginLeft: "20px" }}
                size="large"
              >
                Zapisz dane
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default AddPersonForm;
