import React from 'react'
import { useField } from 'formik';

import TextField from "@mui/material/TextField";

const TextfieldWrapper = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  
  const configTextfield = {
    ...field,
    ...props,
    fullWidth: true
    
    
  };
  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }
  return (
    <TextField {...configTextfield} 
    InputLabelProps={{
      shrink: true,
    }}  />
  )
}

export default TextfieldWrapper