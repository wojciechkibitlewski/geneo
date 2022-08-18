import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

const FamilyHeader = (props) => {
  let brc0; let brc1; let brc2;
  if(props.bc0){
    brc0= <Link underline="hover" color="inherit" href={props.bc0.link}>
    {props.bc0.title}
    </Link>
  }
  if(props.bc1){
    brc1= <Link underline="hover" color="inherit" href={props.bc1.link}>
    {props.bc1.title}
    </Link>
  }
  if(props.bc2){
    brc2= <Typography color="text.primary">{props.bc2.title}</Typography>
  }
  


  return (
    <>
      <Stack spacing={2}>
        <div role="presentation"></div>
        <Breadcrumbs aria-label="breadcrumb" sx={{borderBottom: "1px solid #ccc"}}>
            {brc0}
            {brc1}
            {brc2}            
          </Breadcrumbs>
      </Stack>
      <Typography variant="h4" gutterBottom component="div" sx={{marginTop:"20px"}}>
        {props.title}
      </Typography>
    </>
  );
};

export default FamilyHeader;
