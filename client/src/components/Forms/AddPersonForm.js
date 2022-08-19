import React from "react";
import Axios from "axios";
import debounce from "lodash.debounce";

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

const URL = process.env.REACT_APP_API_BASE_URL;
const URL_AUTOCOMPLETE = process.env.REACT_APP_API_AUTOCOMPLETE_URL;

const AddPersonForm = () => {
  const [isAge, setAge] = useState("");
  const [isBirthday, setBirthDay] = useState("");
  const [isBirthmonth, setBirthMonth] = useState("");
  
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");
  const [listOfPersons, setListOfPersons] = useState([]);

  /// autocomplete
  const handleChangeAutocomplete = (e) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    if (query.length > 2) {
      const debouncedFilter = debounce(() => {
        //console.log("====>", query);
        let l = `${URL_AUTOCOMPLETE}${query}`;
        const fetchHandler = async () => {
          return await Axios.get(l).then((res) => res.data);
        };
        fetchHandler().then((data) => setListOfPersons(data));
        console.log(listOfPersons);

      }, 600);
      debouncedFilter();
    } else {
      setSuggestionsActive(false);
    }
  };


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
    birthyeartwo: Yup.number()
      .integer()
      .min(1000, "Nieprawidłowy rok")
      .max(2100, "Nieprawidłowy rok")
      .moreThan(Yup.ref("birthyear"), "Data jest późniejsza niż pierwsza data"),

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
    },
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      console.log(values);
      /* 
      await  Axios.post(`${URL}persons`, values, {
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
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Kobieta"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Mężczyzna"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Nieznany"
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
                autoComplete="name"
                name="name"
                fullWidth
                id="name"
                label="Imię / imiona"
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
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
                autoComplete="surname"
                onChange={handleChange}
                onBlur={handleBlur}
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
                autoComplete="surnameMarried"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.surnameMarried && errors.surnameMarried ? (
                <Alert sx={{ width: "100%" }} severity="error">
                  {errors.surnameMarried}
                </Alert>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="nobility"
                name="nobility"
                fullWidth
                id="nobility"
                label="Tytuł"
                onChange={handleChange}
                onBlur={handleBlur}
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
                autoComplete="profession"
                onChange={handleChange}
                onBlur={handleBlur}
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
                textAlign: "right",
                marginLeft: "16px",
                marginBottom: "0px",
                paddingBottom: "0px",
              }}
            ></Grid>

            <Grid item xs={12} sm={6}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id="du-select-label">Data urodzenia</InputLabel>
                    <Select
                      labelId="du-select-label"
                      id="du-simple-select"
                      value={isAge}
                      label="Age"
                      name="age"
                      onChange={(e) => {
                        handleChangeAge(e);
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
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
                        id="birthyear"
                        label="Rok"
                        name="birthyear"
                        autoComplete="birthyear"
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
                          labelId="label-day"
                          id="select-day"
                          label="Dzień"
                          name="birthday"
                          value={isBirthday}
                          onChange={(e) => {
                            handleChangeBirthDay(e);
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
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
                          labelId="label-month"
                          id="select-month"
                          value={isBirthmonth}
                          label="Miesiąc"
                          name="birthmonth"
                          onChange={(e) => {
                            handleChangeBirthMonth(e);
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
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
                        autoComplete="birthyear"
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
                    autoComplete="birthplace"
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    autoComplete="birthpar"
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                textAlign: "right",
                marginLeft: "16px",
                marginBottom: "0px",
                paddingBottom: "0px",
              }}
            ></Grid>          

            <Grid item xs={12} sm={6}>
              <TextField
                name="fatherName"
                fullWidth
                id="fatherName"
                label="Imię i nazwisko ojca"
                onChange={(e) => {
                  handleChange(e);
                  handleChangeAutocomplete(e);
                }}
                onBlur={handleBlur}
              />
              
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
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
                textAlign: "right",
                marginLeft: "16px",
                marginBottom: "0px",
                paddingBottom: "0px",
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
