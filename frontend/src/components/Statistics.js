import React from 'react'
import CategorySelect from './CategorySelect'
import Navbar from './Navbar'
import TimeSelect from './TimeSelect'
import CustomizedChart from './CustomizedChart'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import taskService from '../services/task'
import categoryService from '../services/category'
import { setUser } from '../reducers/userReducer'
import { initializeTasks } from '../reducers/taskReducer'
import { initializeCategorys } from '../reducers/categoryReducer'

const Statistics = () => {
  const [categoryToDisplay,setCategoryToDisplay] = useState('Default')
  const [timeScale,setTimeScale] = useState('Day')
  const dispatch = useDispatch()
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const parsedUser = JSON.parse(loggedInUserJSON)
      taskService.setToken(parsedUser.token)
      categoryService.setToken(parsedUser.token)
      dispatch(setUser(parsedUser))
    }
  }, [dispatch])
  useEffect(() => {
    dispatch(initializeTasks())
    dispatch(initializeCategorys())
  },[dispatch])
  const user = useSelector(state => state.user)
  return (
    <div>
      <Navbar user={user}/>
      <Container sx={{ pt: 1 }} maxWidth="md" direction="row">
        <Grid container spacing={2} maxWidth="md" direction="row" justifyContent="center" alignItems="center"
          sx={{ py:4 }}>
          <Grid item xs={6} md={4}>
            <CategorySelect setCategoryToDisplay={setCategoryToDisplay}/>
          </Grid>
          <Grid item xs={6} md={4}>
            <TimeSelect setTimeScale={setTimeScale}/>
          </Grid>
          <Grid item xs={8} md={8}>
            <CustomizedChart categoryToDisplay={categoryToDisplay} timeScale={timeScale}/>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
export default Statistics