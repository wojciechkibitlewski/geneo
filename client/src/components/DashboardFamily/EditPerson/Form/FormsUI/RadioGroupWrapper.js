import React from 'react'
import { useField, useFormikContext } from 'formik';
import { useState } from "react";


import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Alert from "@mui/material/Alert";


const RadioGroupWrapper = ({name, props}) => {
    const [isValue, setIsValue] = useState("");
    const { setFieldValue } = useFormikContext();
    const [field] = useField(name);

    const handleChange = (e)=> {
        setFieldValue(name, e.target.value);
        setIsValue(e.target.value)
    };
    const configRadioGroup = {
        ...field,
        onChange: handleChange
      };
    
  return (
    <>
    <FormControl >
        <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            row
            
            {...configRadioGroup}  
            value={isValue}
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
    {props.touched.gender && props.errors.gender ? (
        <Alert sx={{ width: "100%" }} severity="error">
          {props.errors.gender}
        </Alert>
      ) : null}
    </>
  )
}

export default RadioGroupWrapper