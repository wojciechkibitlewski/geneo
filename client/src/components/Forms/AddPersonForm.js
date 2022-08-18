import React from "react";
import { useState } from "react";

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

import { days, months } from "../config/functions";


const AddPersonForm = () => {
  const [age, setAge] = useState("");
  const [birthday, setBirthDay] = useState("");
  const [birthmonth, setBirthMonth] = useState("");
  const [age2, setAge2] = useState("");
  const [deathday, setDeathDay] = useState("");
  const [deathmonth, setDeathMonth] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        gender: data.get("gender"),
        name: data.get("name"),
        surname: data.get("surname"),
        surnameMarried: data.get("surnameMarried"),
        nobility: data.get("nobility"),
        profession: data.get("profession"),
        age: data.get("age"),
        birthday: data.get("birthday"),
        birthmonth: data.get("birthmonth"),
        birthyear: data.get("birthyear"),
        birthplace: data.get("birthplace"),
        living: data.get("living"),
        age2: data.get("age2"),
        deathday: data.get("deathday"),
        deathmonth: data.get("deathmonth"),
        deathyear: data.get("deathyear"),
        deathplace: data.get("deathplace"),
        info: data.get("info")      
    });
  };


  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleChange2 = (event) => {
    setAge2(event.target.value);
  };
  const handleChangeBirthDay = (event) => {
    setBirthDay(event.target.value);
  };
  const handleChangeDeathDay = (event) => {
    setDeathDay(event.target.value);
  };
  const handleChangeBirthMonth = (event) => {
    setBirthMonth(event.target.value);
  };
  const handleChangeDeathhMonth = (event) => {
    setDeathMonth(event.target.value);
  };

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
                  required
                  
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                name="name"
                fullWidth
                id="name"
                label="Imię / imiona"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="surname"
                label="Nazwisko"
                name="surname"
                autoComplete="surname"
              />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="surnameMarried"
                label="Nazwisko po ślubie"
                name="surnameMarried"
                autoComplete="surnameMarried"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="nobility"
                name="nobility"
                fullWidth
                id="nobility"
                label="Tytuł"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="profession"
                label="Zawód"
                name="profession"
                autoComplete="profession"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Data</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Age"
                      onChange={handleChange}
                      name="age"
                    >
                      <MenuItem value={1}>Dokładnie</MenuItem>
                      <MenuItem value={2}>Od... do...</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel id="label-day">Dzień</InputLabel>
                    <Select
                      labelId="label-day"
                      id="select-day"
                      value={birthday}
                      label="Dzień"
                      onChange={handleChangeBirthDay}
                      name = "birthday"
                    >
                      {days.map((day,key) => (
                        <MenuItem key={key} value={day}>{day}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel id="label-month">Miesiąc</InputLabel>
                    <Select
                      labelId="label-month"
                      id="select-month"
                      value={birthmonth}
                      label="Miesiąc"
                      onChange={handleChangeBirthMonth}
                      name = "birthmonth"
                    >
                      {months.map((month, key) => (
                        <MenuItem key={month.month} value={month.number}>{month.month}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4} sm={3}>
                  <TextField
                    fullWidth
                    id="birthyear"
                    label="Rok"
                    name="birthyear"
                    autoComplete="birthyear"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="birthplace"
                label="Miejsce urodzenia"
                name="birthplace"
                autoComplete="birthplace"
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              sx={{ borderTop: "solid 1px #aaa", marginTop: "20px" }}
            >
              <FormControl>
                <RadioGroup
                  row
                  defaultValue="false"
                  aria-labelledby="living"
                  name="living"
                >
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="zmarły"
                  />
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="żyjący"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label-2">
                      Data
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label-2"
                      id="demo-simple-select-2"
                      value={age2}
                      label="Age2"
                      onChange={handleChange2}
                      name="age2"
                    >
                      <MenuItem value={1}>Dokładnie</MenuItem>
                      <MenuItem value={2}>Od... do...</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel id="label-death-day">Dzień</InputLabel>
                    <Select
                      labelId="label-death-day"
                      id="select-death-day"
                      value={deathday}
                      label="Dzień"
                      onChange={handleChangeDeathDay}
                      name="deathday"
                    >
                      {days.map((day,key) => (
                        <MenuItem key={key} value={day}>{day}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel id="label-death-month">Miesiąc</InputLabel>
                    <Select
                      labelId="label-death-month"
                      id="select-death-month"
                      value={deathmonth}
                      label="Miesiąc"
                      onChange={handleChangeDeathhMonth}
                      name="deathmonth"
                    >
                      {months.map((month) => (
                        <MenuItem key={month.month}  value={month.number}>{month.month}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4} sm={3}>
                  <TextField
                    fullWidth
                    id="deathyear"
                    label="Rok"
                    name="deathyear"
                    autoComplete="deathyear"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="deathplace"
                label="Miejsce śmierci"
                name="deathplace"
                autoComplete="deathplace"
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              sx={{ borderTop: "solid 1px #aaa", marginTop: "20px" }}
            >
              <TextField
                fullWidth
                id="info"
                label="Dodatkowe informacje"
                multiline
                rows={3}
                defaultValue=""
                name="info"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                borderTop: "solid 1px #aaa",
                marginTop: "20px",
                textAlign: "right"
                
              }}
            >
              <Button variant="outlined" color="error" size="large" >
                Wyczyść
              </Button>

              <Button
                variant="contained"
                type="submit"
                sx={{ backgroundColor: "#263238", marginLeft: "20px"}}
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
