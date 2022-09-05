import React, {useState} from 'react'
import * as Yup from "yup";
import { Formik, Form } from "formik";

import {Button, Grid } from '@mui/material';
import GridLine from './FormUI/GridLine';
import TextfieldWrapper from './FormUI/TextfieldWrapper';
import SelectAge from './FormUI/SelectAge';
import SelectDay from './FormUI/SelectDay'
import SelectMonth from './FormUI/SelectMonth';
import { TextFieldAutocompleteFather, TextFieldAutocompleteMother } from './Autocomplete/TextFieldAutocomplete';
import InputHidden from './FormUI/InputHidden';


export const FormPerson = (props) => {
    
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
    
    const [isAge, setAge] = useState('');

    let g = props.initialValues.age;
    g = g.toString();

    let r;
    !isAge ? r = g : r = isAge

    const addAge = (a) =>{
        setAge(a.toString());

    }

  return (
    <Formik 
    {...props} 
    validationSchema={validationSchema} 
    >
    <Form onSubmit={props.onSubmit}>
        <Grid container spacing={0}>
            <Grid data-name="gender" item xs={12} sm={12}  sx={{padding: "10px"}}>

            </Grid>
            <Grid data-name="name" item xs={12} sm={6}  sx={{padding: "10px"}}>
                <TextfieldWrapper 
                  autoFocus
                  label="Imię / imiona"
                  name="name"
                />
                
            </Grid>
            <Grid data-name="surname" item xs={12} sm={6}  sx={{padding: "10px"}}>
                <TextfieldWrapper 
                  label="Nazwisko"
                  name="surname"
                />
            </Grid>
            <Grid item xs={12} sm={6} sx={{padding: "10px"}}></Grid>
            <Grid data-name="surnameMarried" item xs={12} sm={6}  sx={{padding: "10px"}}>
                <TextfieldWrapper 
                  label="Nazwisko po ślubie"
                  name="surnameMarried"
                />
            </Grid>
            <Grid data-name="nobility" item xs={12} sm={6} sx={{padding: "10px"}}>
                <TextfieldWrapper 
                  label="Tytuł"
                  name="nobility"
                />
            </Grid>
            <Grid data-name="profession" item xs={12} sm={6} sx={{padding: "10px"}}>
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
            <GridLine />
            <Grid item xs={12} sm={6} sx={{padding: "10px"}}>
                <Grid container spacing={1}>
                    
                    <Grid data-name="age" item xs={12} sm={12} >
                        <SelectAge
                        label="Age"
                        name="age"
                        onChange={addAge}
                        />
                    </Grid>
                    {r === "2"  ? (
                    <>
                    <Grid data-name="birthyearone" item xs={6} sm={6}>
                        <TextfieldWrapper 
                          label="Rok"
                          name="birthyear"
                        />
                    </Grid>
                    <Grid data-name="birthyeartwo" item xs={6} sm={6}>
                        
                        <TextfieldWrapper 
                            label="Rok"
                            name="birthyeartwo"
                        />
                         
                    </Grid>
                    </>
                    ) : (
                    <>
                    <Grid data-name="birthday" item xs={4} sm={4}>
                       <SelectDay
                       label="Dzień"
                       name="birthday"
                       />
                    </Grid>
                    <Grid data-name="birthmonth" item xs={4} sm={4}>
                        <SelectMonth
                        label="Miesiąc"
                        name="birthmonth"
                        />
                    </Grid>
                    <Grid data-name="birthyear" item xs={4} sm={4}>
                        <TextfieldWrapper 
                          label="Rok"
                          name="birthyear"
                        />
                    </Grid>
                    </>
                    )}
                </Grid>
            </Grid>

            <Grid item xs={12} sm={6}  sx={{padding: "10px"}}>
                <Grid container spacing={1}>
                    <Grid data-name="birthplace" item xs={12} sm={12}>
                        <TextfieldWrapper 
                        label="Miejsce urodzenia"
                        name="birthplace"
                        />
                    </Grid>
                    <Grid data-name="birthpar" item xs={12} sm={12}>
                        <TextfieldWrapper 
                        label="Parafia"
                        name="birthpar"
                        />
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
        
        <Grid container spacing={0} sx={{marginTop: "0px"}} >
            <GridLine />
            <Grid data-name="father" item xs={12} sm={6}  sx={{padding: "10px"}}>
                 
                <TextFieldAutocompleteFather 
                label="Imię i nazwisko ojca"
                name="fatherName"
                />
                 
                <InputHidden 
                name="father"
                />
                <InputHidden 
                name="nFatherName"
                />
                

            </Grid>
            <Grid data-name="mother" item xs={12} sm={6}  sx={{padding: "10px"}}>
                 
                <TextFieldAutocompleteMother 
                label="Imię i nazwisko matki"
                name="motherName"
                />
                <InputHidden 
                name="mother"
                />
                <InputHidden 
                name="nMotherName"
                />
                
            </Grid>

        </Grid>
        <Grid container spacing={0} sx={{marginTop: "20px", paddingBottom: '10px', backgroundColor: "#f6fff8"}} >
            <GridLine />
            <Grid data-name="birthlink" item xs={12} sm={12}  sx={{padding: "10px"}}>
                <TextfieldWrapper 
                  label="Link do aktu urodzenia"
                  name="link"
                />
            </Grid>
            <Grid data-name="info" item xs={12} sm={12}  sx={{padding: "10px"}}>
                <TextfieldWrapper 
                  multiline
                  rows={4}
                  label="Dodatkowe informacje"
                  name="info"
                />
            </Grid>
        </Grid>
        <Grid item xs={12} sm={12} sx={{textAlign:"right", padding: "10px"}} >
            <GridLine />
            <Button variant="outlined" color="error" size="large">
                Wyczyść
            </Button>

            <Button variant="contained" type="submit" sx={{ backgroundColor: "#263238", marginLeft: "20px" }} size="large" >
                Zapisz dane
            </Button>
        </Grid>
    </Form>
    </Formik>
  )
}
