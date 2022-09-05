import * as React from 'react';
import { useField, useFormikContext } from 'formik';

import { FormControl,  InputLabel, MenuItem, Select } from '@mui/material';

export default function SelectAge({ name, ...props }) {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const [age, setAge] = React.useState('');
  const [formValues, setFormValues] = React.useState('');
  
  const configTextfield = {
    ...field,
    ...props,
    fullWidth: true
    
  };
  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  };
   
  const handleChangeAge = (e) => {
    setAge(e.target.value);
    setFormValues(e.target.value);
    setFieldValue(name, e.target.value);
    props.onChange(e.target.value);
   
  };

  //console.log(meta)
  return (
    <>
      <FormControl fullWidth key={formValues.age}>
        <InputLabel id="du-select-label" key={age}>Data urodzenia</InputLabel>
        <Select
          {...configTextfield}
          id="du-simple-select"
          labelId="du-select-label"
          onChange={(e) => {
          handleChangeAge(e);
          }}
        >
          <MenuItem value={1}>Dokładnie</MenuItem>
          <MenuItem value={2}>Od... do...</MenuItem>
        </Select>
      </FormControl>

    </>
  );
}