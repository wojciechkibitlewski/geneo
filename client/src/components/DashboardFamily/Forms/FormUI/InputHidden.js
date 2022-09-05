import React from 'react'
import { useField } from 'formik';

const InputHidden = ({ name, ...props }) => {
    const [field, meta] = useField(name);
  
  const configTextfield = {
    ...field,
    ...props,
    
  };
  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }
  //console.log(meta)

  return (
    <input 
    {...configTextfield}
    type="text"     
    hidden readOnly />
  )
}

export default InputHidden