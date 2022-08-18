import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

export default function PublicAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="primary" sx={{ backgroundColor: '#263238'}}>
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
                color="inherit"
                noWrap
                key="korzenie24.pl"
                variant="body3"
                href="/"
                sx={{ p: 1, flexShrink: 0, textDecoration: 'none' }}
            >
                korzenie24.pl
            </Link>
          </Typography>
          <Button variant="outlined" href="/login" sx={{ backgroundColor: "#fff"}}>
            Zaloguj się
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}