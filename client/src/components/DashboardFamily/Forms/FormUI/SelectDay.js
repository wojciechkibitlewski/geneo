import * as React from 'react';
import { useField, useFormikContext } from 'formik';

import { FormControl,  InputLabel, MenuItem, Select } from '@mui/material';

import { days } from "../../../config/functions"


export default function SelectDay({ name, ...props }) {
  
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const [birthday, setBirthday] = React.useState('');
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
   
  const handleChangeBirthDay = (e) => {
    setBirthday(e.target.value);
    setFormValues(e.target.value);
    setFieldValue(name, e.target.value);
   
  };

  //console.log(meta)
  return (
    <>
      <FormControl fullWidth key={formValues.birthday}>
      <InputLabel key={birthday} id="label-day">Dzień</InputLabel>
        <Select
          {...configTextfield}
          id="select-day"
          labelId="label-day"
          onChange={(e) => {
            handleChangeBirthDay(e);
          }}
        >
          
          {days.map((day, key) => (
            <MenuItem key={key} value={day}>
                {day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </>
  );
}