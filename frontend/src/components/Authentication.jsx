import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { AuthContext } from '../context/AuthContext';
import { Snackbar } from '@mui/material';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function Authentication() {
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [usernameError, setUsernameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("")
  const [error, setError] = React.useState("")

  const[formData, setFormData] = React.useState({
    username:"",
    email:"",
    password:""
  });

  const [registerState, setRegisterState]  = React.useState("signin")


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handlingButton = () => {
    if(registerState==='signin'){
        return setRegisterState('signup');
    }else{
       return setRegisterState('signin');
    }
  }

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const username = document.getElementById('username');

    let isValid = true;

    if(registerState==="signup"){
      if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
        setEmailError(true);
        setEmailErrorMessage('Please enter a valid email address.');
        isValid = false;

      } else {
        setEmailError(false);
        setEmailErrorMessage('');
      }
    }

     if (!username.value) {
      setUsernameError(true);
      setUsernameErrorMessage('Please enter a valid username.');
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
      
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handlingchange = (e) => {
   setFormData((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    });
  };

  const {handleRegister, handleLogin} = React.useContext(AuthContext)

  const handleSubmit = async(event) => {
      event.preventDefault();

  try {
      
    if(registerState === "signup"){
        if (usernameError || emailError || passwordError) {
            return;
        }

        const result = await handleRegister(formData.username,formData.email, formData.password);
        setMessage(result);
        setOpen(true);
        
        setFormData(prev => {
          return {...prev, username:"", email:"", password:""}
        });
    }else{
         if (usernameError || passwordError) {
            return;
        }
       const result = await handleLogin(formData.username, formData.password)
        setMessage(result)
        setOpen(true);
        setFormData(prev => {
          return {...prev, username:"", password:""}
        });

    }
  } catch (e) {
        let message = e.response.data.message; 
        console.log(message)
        setError(message);
        setMessage(message)   
        setOpen(true)
     }
  };

  return (
    <Card className='card' variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        {registerState==='signin'?"Sign in":"Sign up"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <TextField
            error={usernameError}
            helperText={usernameErrorMessage}
            id="username"
            type="username"
            name="username"
            value={formData.username}
            placeholder="your username"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={usernameError ? 'error' : 'primary'}
            onChange={handlingchange}
          />
        </FormControl>
        {
            registerState==='signup' &&  <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            value={formData.email}
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? 'error' : 'primary'}
            onChange={handlingchange}
          />
        </FormControl>  
        }
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">Password</FormLabel>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            value={formData.password}
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
            onChange={handlingchange}
          />
        </FormControl>

          {error && <p className='error'>{error}</p>}
        
     
        <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
          {registerState==='signin'?"sign In":"sign Up"}
        </Button>

        <Typography sx={{ textAlign: 'center' }}>
          {registerState==="signin"? "Don't you have an account? " : "Do you have an account? "}
          
          <button type='button' onClick={handlingButton}>
            {registerState==='signin'?"Sign Up":"Sign In"}
          </button>
        </Typography>
      </Box>   
                  <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    message={message}
                  />   
    </Card>
  );
}