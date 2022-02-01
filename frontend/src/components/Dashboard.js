import React from 'react'
import Tasks from './Tasks'
import TaskForm from './TaskForm'
import CategoryForm from './CategoryForm'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Filter from './Filter'
import Container from '@mui/material/Container'
import { Grid } from '@mui/material'
import CategorySelect from './CategorySelect'
import { initializeTasks } from '../reducers/taskReducer'
import { initializeCategorys } from '../reducers/categoryReducer'

const Dashboard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeTasks())
    dispatch(initializeCategorys())
  }, [dispatch])
  const user = useSelector(state => state.user)
  const [text, setText] = useState('')
  const [categoryToDisplay,setCategoryToDisplay] = useState('Default')
  return (<div>
    <Navbar user={user}/>
    <Container sx={{ pt: 1 }} maxWidth="md" direction="row" >
      <Grid container spacing={2} maxWidth="md" direction="row" justifyContent="center"
        alignItems="center" >
        <Grid item xs={6} md={4}>
          <Filter setText={setText}/>
        </Grid>
        <Grid item xs={6} md={4}>
          <CategorySelect setCategoryToDisplay={setCategoryToDisplay}/>
        </Grid>
        <Grid item xs={6} md={2}>
          <CategoryForm />
        </Grid>
        <Grid item xs={6} md={2}>
          <TaskForm />
        </Grid>
      </Grid>
    </Container>
    <Tasks text={text} categoryToDisplay={categoryToDisplay}/>
  </div>)
}

export default Dashboard