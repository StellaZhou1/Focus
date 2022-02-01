import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask } from '../reducers/taskReducer'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { Card, CardContent, Typography } from '@mui/material'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
const formatTime = (time) => {
  if(time<10){
    return `0${time}`
  }
  return `${time}`
}
const getTime = (time) => {
  const startTime = new Date(time)
  //const months=['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.']
  const date = formatTime(startTime.getDate())
  const month = formatTime(startTime.getMonth()+1)
  return `${date}/${month}/${startTime.getFullYear()}`
}

const Tasks = ({ text,categoryToDisplay }) => {
  const allTasks = useSelector(state => state.tasks)
  const categoryTasks = (categoryToDisplay ==='Default') ? allTasks:allTasks.filter(t => t.category===categoryToDisplay)
  const tasks = categoryTasks.filter(t => t.content.includes(text))
  const dispatch = useDispatch()
  const history = useNavigate()

  return(
    <Container sx={{ py: 1 }} maxWidth="md">
      <Grid container spacing={2}>
        {tasks.map(task => {
          const handleDeleteTask = async () => {
            dispatch(deleteTask(task.id))
          }
          const handleEditTask = () => {
            history(`/tasks/${task.id}`)
          }
          return (
            <Grid item xs={8} sm={6} md={4} key={task.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Grid container justify="flex-end">
                      <CategoryOutlinedIcon sx={{ fontSize: 18,my:'auto' }} color="action"/>
                      <Typography variant="subtitle1" color="text.secondary" >
                        {task.category}
                      </Typography>
                    </Grid>
                    <Grid container justify="flex-end">
                      <AccessTimeIcon sx={{ fontSize: 18,my:'auto' }} color="action"/>
                      <Typography variant="subtitle1" color="text.secondary" >
                        {getTime(task.startTime)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography component="h2" variant="h6">
                    {task.content}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {task.interrupts.length} {task.interrupts.length>1?'interrupts':'interrupt'}
                  </Typography>
                  <Grid display="flex" justifyContent="flex-end">

                    <IconButton aria-label="Example" onClick={handleEditTask}>
                      <EditIcon sx={{ fontSize: 18,my:'auto' }}/>
                    </IconButton>
                    <IconButton aria-label="Example" onClick={handleDeleteTask}>
                      <DeleteOutlineIcon sx={{ fontSize: 18,my:'auto' }}/>
                    </IconButton>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

    </Container>
  )
}

export default Tasks