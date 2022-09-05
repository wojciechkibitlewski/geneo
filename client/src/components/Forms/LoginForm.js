import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../api/axios";

import AuthContext from "../../context/AuthProvider";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

//import GoogleIcon from '@mui/icons-material/Google';
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LOGIN_URL = 'auth/';

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&]).{8,24}$/;


const LoginForm = () => {
  const navigate = useNavigate();

  const { setAuth} = useContext(AuthContext);

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  
  const [pwd, setPwd] = useState("");
  const [pwdError, setPwdError] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect( () => {
    emailRef.current.focus();
  },[])

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  
  const handleSubmit =  async (event) => {
    event.preventDefault();


    const v3 = EMAIL_REGEX.test(email);
    if (!v3) {
      setEmailError("Adres e mail jest nieprawidłowy")
      return;
    }
    const v4 = PWD_REGEX.test(pwd);
    if (!v4) {
      setPwdError(
        "Hasło powinno mieć od 4 do 24 znaków. Musi zawierać duże i małe litery, cyfry oraz znaki specjalne"
      );
      return;
    }
    
    await  axios.post(
      LOGIN_URL,
      JSON.stringify({ email, password:pwd })
    , 
      {
      "headers": {
        "content-type": "application/json",
      }
    }).then(function (response) {
      console.log(JSON.stringify(response?.data))
      const accessToken  = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({email, pwd, roles, accessToken} );

      setEmail('');
      setPwd('');
      setEmailError('');
      setPwdError('')

      navigate("/family")
      //console.log(response);
    }).catch(function (err) {
      if (!err?.response) {
        setErrMsg("Błąd. Brak odpowiedzi serwera");
      } else if (err.response?.status === 400) {
        setErrMsg("Konto nie istnieje lub hasło jest nieprawidłowe.");
      } else if (err.response?.status === 401) {
        setErrMsg("Nieautoryzowany dostęp");
      } else {
        setErrMsg("Logowanie nie powiodło się");
      }
      errRef.current.focus();
    }); 

    
  };


  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: "20px",
            borderRadius: "10px",
          }}
      >
         <Typography component="h1" variant="h5">
            Logowanie do serwisu
          </Typography>
          {errMsg ? (
            <Alert ref={errRef} sx={{ width: "100%", mt: 2 }} severity="error" aria-live="assertive">
              {errMsg}
            </Alert>
          ) : (
            ""
          )} 
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                autoFocus
                autoComplete="true"
                error = {emailError ? true : false}
                helperText= {emailError ? emailError : ''}
                fullWidth
                label="Adres e-mail"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                ref={emailRef}
                required
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%", mt:2 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Hasło
                </InputLabel>
                <OutlinedInput
                  aria-describedby="pwdnote"
                  error = {pwdError ? true : false}
                  id="outlined-adornment-password"
                  label="Hasło"
                  name="pwd"
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  value={pwd}
                />
                {pwdError ? 
                <FormHelperText id="pwdnote">
                  Od 4 do 24 znaków. Musi zawierać duże i małe litery,
                  cyfry oraz znaki specjalne
                </FormHelperText>
                : ''}
              </FormControl>
            </Grid>
            </Grid>
            <Button
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              type="submit"
              variant="contained"
            >
              Zaloguj się
            </Button>

            {/* 
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 1, mb: 2 }}
              name="googleauth"
            >
              <GoogleIcon sx={{mr:2}} /> Zaloguj się przez Google
            </Button>
            */}    
            
            
            <Grid container>
              <Grid item xs>
                <Link href="lostpassword" variant="body2">
                  Nie pamiętasz hasła?
                </Link>
              </Grid>
              <Grid item>
                <Link href="register" variant="body2">
                  {"Zarejestruj się"}
                </Link>
              </Grid>
            </Grid>
            
          </Box>
      </Box>

      </Container>

    </React.Fragment>
  )
}

export default LoginForm