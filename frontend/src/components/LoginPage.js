import React, { useState } from 'react'
import * as loginService from '../services/login'
import taskService from '../services/task'
import categoryService from '../services/category'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { Paper,
  TextField,
  Button,
  Grid,
  Box,
  Link
} from '@mui/material'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useNavigate()
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    taskService.setToken(user.token)
    categoryService.setToken(user.token)
    dispatch(setUser(user))
    setUsername('')
    setPassword('')
    history('/tasks')
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
        <form onSubmit={handleLogin}>
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
              sx={{ width:3/4,pb:2 }}
              type='password'
              id="password"
              label="Password"
              name="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            <Button variant="contained" type="submit" id='login-button' sx={{ width:110,textTransform: 'none', fontSize:15 }}>
                Login
            </Button>
            <Link href="/register" underline="always" sx={{ pt:2 }}>
                No account? Sign up here
            </Link>
          </Box>
        </form>
      </Paper>
    </Grid>
  )
}

export default LoginPage