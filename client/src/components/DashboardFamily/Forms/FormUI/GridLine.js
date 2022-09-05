import React from 'react'
import {Grid} from '@mui/material';
const GridLine = () => {
  return (
    <>
    <Grid item xs={12} sm={12}
    sx={{
        borderTop: "solid 1px #aaa",
        marginLeft: "0px",
        marginBottom: "20px",
        paddingBottom: "0px",
        textAlign: "right",
    }}
    ></Grid>
    </>
  )
}

export default GridLine