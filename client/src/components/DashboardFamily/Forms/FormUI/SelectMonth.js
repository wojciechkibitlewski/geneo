import * as React from 'react';
import { useField, useFormikContext } from 'formik';

import { FormControl,  InputLabel, MenuItem, Select } from '@mui/material';

import {months} from "../../../config/functions"


export default function SelectMonth({ name, ...props }) {
  
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const [birthmonths, setBirthmonths] = React.useState('');
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
   
  const handleChangeBirthMonths = (e) => {
    setBirthmonths(e.target.value);
    setFormValues(e.target.value);
    setFieldValue(name, e.target.value);
   
  };

  //console.log(meta)
  return (
    <>
      <FormControl fullWidth key={formValues.birthmonths}>
      <InputLabel key={birthmonths} id="label-month">Miesiąc</InputLabel>
        <Select
          {...configTextfield}
          id="select-month"
          labelId="labelmonth"
          onChange={(e) => {
            handleChangeBirthMonths(e);
          }}
        >
          {months.map((month, key) => (
            <MenuItem key={month.month} value={month.number}>
              {month.month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </>
  );
}