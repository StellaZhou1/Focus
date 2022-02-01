import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/register'
import { Paper,
  TextField,
  Button,
  Grid,
  Box
} from '@mui/material'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorText,setErrorText] = useState('')
  const history = useNavigate()
  const handleRegister = async (event) => {
    event.preventDefault()
    if(password!==confirmPassword){
      setErrorText('Please repeat password!')
      setPassword('')
      setConfirmPassword('')
      return
    }
    else if(password.length<3){
      setErrorText('Password length should not be less than 3!')
      setPassword('')
      setConfirmPassword('')
      return
    }
    else {
      const registerResult = await register(username,password)
      if (registerResult.error==='Username already used!'){
        setErrorText('This username has been used!')
        setUsername('')
        return
      }
      else{
        alert('Register successful, redirect to login page!')
        history('/login')
      }
    }
  }
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Paper sx={{ width:400 }} display='flex'>
        <form onSubmit={handleRegister}>
          <Box
            sx={{
              py: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TextField
              margin="normal"
              required
              sx={{ width:3/4 }}
              id="username"
              label="Username"
              name="username"
              value={username}
              onChange={event => setUsername(event.target.value)}
              autoFocus

            />
            <TextField
              margin="normal"
              required
              sx={{ width:3/4 }}
              type='password'
              id="password"
              label="Password"
              name="password"
              helperText={errorText}
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              sx={{ width:3/4,pb:2 }}
              type='password'
              id="confirm-password"
              label="Confirm-Password"
              name="confirm-password"
              value={confirmPassword}
              onChange={event => setConfirmPassword(event.target.value)}
            />
            <Button variant="contained" type="submit" id='register-button' sx={{ width:110,textTransform: 'none', fontSize:15 }}>
                Register
            </Button>
          </Box>
        </form>
      </Paper>
    </Grid>
  )
}

export default Register