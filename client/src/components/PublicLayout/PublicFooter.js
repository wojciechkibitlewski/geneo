import React from 'react'
import Box from '@mui/material/Box';

const PublicFooter = () => {
  return (
    <React.Fragment>
      <footer>
      <Box
      component="div"
      sx={{ p: 2, backgroundColor: '#263238', color: "#fff" }}
      noValidate
      autoComplete="off"
    >
      2022. Korzenie24.pl. Wyszukiwarka osób urodzonych w Filipowie i okolicach w latach 1808 - 1920.
    </Box>
      
      </footer>
    </React.Fragment>
    
  )
}

export default PublicFooter