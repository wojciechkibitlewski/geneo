import React from 'react'
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

//import GoogleIcon from '@mui/icons-material/Google';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const NAME_REGEX = /^([a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ]\s*)+$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'register/';

const RegisterForm = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    

    const [surname, setSurname] = useState('');
    const [validSurname, setValidSurname] = useState(false);
    
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showPwdMatch, setShowPwdMatch] = useState(false);


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(NAME_REGEX.test(name));
    }, [name])
    useEffect(() => {
        setValidSurname(NAME_REGEX.test(surname));
    }, [surname])
    
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [name, surname, email, pwd, matchPwd])

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };
    const handleClickShowPwdMatch = () => {
        setShowPwdMatch(!showPwdMatch)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseDownPwdMatch = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        const v1 = NAME_REGEX.test(name);
        if (!v1) {
            setErrMsg("Czy to imię jest prawidłowe?");
            return;
        }
        const v2 = NAME_REGEX.test(surname);
        if (!v2) {
            setErrMsg("Czy to nazwisko jest prawidłowe?");
            return;
        }
        const v3 = EMAIL_REGEX.test(email);
        if (!v3) {
            setErrMsg("Adres e mail jest nieprawidłowy");
            return;
        }
        const v4 = PWD_REGEX.test(pwd);
        if (!v4) {
            setErrMsg("Hasło powinno mieć od 4 do 24 znaków. Musi zawierać duże i małe litery, cyfry oraz znaki specjalne");
            return;
        }
        if (pwd !== matchPwd) {
            setErrMsg("Hasła nie są takie same");
            return;
        }

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ name, surname, email, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            
            setName('');
            setSurname('');
            setEmail('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Błąd. Brak odpowiedzi serwera');
            } else if (err.response?.status === 409) {
                setErrMsg('Taki adres e-mail jest już w serwisie. Nie pamiętasz hasła? Skorzystaj z opcji Przypomnij hasło.');
            } else {
                setErrMsg('Rejestracja nie powiodła się')
            }
            errRef.current.focus();
        }
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
                Zarejestruj się w serwisie
            </Typography>
            {success ? (
                <Alert sx={{ width:"100%", mt:2}} severity="success">Twoje konto jest już utworzone. <a href="/login">Zaloguj się</a></Alert>
            ) : (
            <>
            {errMsg ? <Alert sx={{ width:"100%", mt:2}} severity="error">{errMsg}</Alert> : '' }
    
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="off"
                    autoFocus
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    fullWidth
                    label="Imię"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    ref={userRef}
                    required
                    value={name}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="off"
                    autoFocus
                    aria-invalid={validSurname ? "false" : "true"}
                    aria-describedby="uidnote"
                    fullWidth
                    label="Nazwisko"
                    name="surname"
                    onChange={(e) => setSurname(e.target.value)}
                    ref={userRef}
                    required
                    value={surname}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    autoComplete="off"
                    autoFocus
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="uidnote"
                    fullWidth
                    label="Adres e-mail"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    ref={userRef}
                    required
                    value={email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Hasło</InputLabel>
                        <OutlinedInput
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            id="outlined-adornment-password"
                            label="Hasło"
                            name="pwd"
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            value={pwd}    
                        />
                        <FormHelperText>Od 4 do 24 znaków. Musi zawierać duże i małe litery, cyfry oraz znaki specjalne</FormHelperText>
                        

                    </FormControl>

                </Grid>
                <Grid item xs={12}>
                    <TextField
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    fullWidth
                    label="Powtórz hasło"
                    name="matchPwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    type="password"
                    value={matchPwd}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPwdMatch}
                            onMouseDown={handleMouseDownPwdMatch}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" sx={{ backgroundColor: "#fff"}} />}
                    label="Chcę otrzymywać informacje o nowościach w serwisie"
                    name="newslatter"
                    />
                </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Zarejestruj się 
                </Button>
                {/* 
                <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 1, mb: 2 }}
                name="googleauth"
                >
                <GoogleIcon sx={{mr:2}} /> Rejestracja z kontem Google
                </Button>
                 */}
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="login" variant="body2">
                    Masz już konto? Zaloguj się
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </>
            )}
            </Box>
        </Container>


    </React.Fragment>
  )
}

export default RegisterForm