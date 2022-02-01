import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InterruptForm from './InterruptForm'
import Interrupts from './Interrupts'
import Navbar from './Navbar'
import CategorySelect from './CategorySelect'
import { deleteTask } from '../reducers/taskReducer'
import { initializeTasks } from '../reducers/taskReducer'
import { initializeCategorys } from '../reducers/categoryReducer'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import { useConfirm } from 'material-ui-confirm'
import taskService from '../services/task'
const Task = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeTasks())
    dispatch(initializeCategorys())
  }, [dispatch])
  const user = useSelector(state => state.user)
  const url = new URL(window.location.href)
  const [editVisible, setEditVisible] = useState(false)
  const [content, setContent] = useState('')
  const pathnames = url.pathname.split('/')
  const id = pathnames[2]
  const confirm = useConfirm()

  const tasks = useSelector(state => state.tasks)
  const task = tasks.filter(t => t.id===id)[0]
  useEffect(() => {
    async function fetchData() {
      const t = await taskService.findById(id)
      setContent(t.content)
    }
    fetchData()
  }, [dispatch,id])

  const history = useNavigate()
  const handleDeleteTask = async () => {
    dispatch(deleteTask(task.id))
    history('/tasks')
  }
  const handleEditTask = async () => {
    setEditVisible(true)
  }
  const confirmEditTask = async (event) => {
    event.preventDefault()

    confirm({ description: 'Do you want to edit this task?' })
      .then(async () => {
        const changedTask = await taskService.edit(task.id, event.target.content.value,event.target.category.value)
        dispatch({
          type: 'EDIT_TASK',
          data: changedTask,
        })
        setEditVisible(false)
      })
      .catch(() => {})
  }
  const handleCancelEdit = () => {
    setEditVisible(false)
  }
  const hideWhenEdit = { display: editVisible ? 'none' : '' }
  const showWhenEdit = { display: editVisible ? '' : 'none' }
  if (!task){
    return <div></div>
  }

  return (
    <div>
      <Navbar user={user}/>
      <Container maxWidth="md" direction="row">
        <Grid container maxWidth="md" direction="row" justifyContent="center" alignItems="center"
          sx={{ py:4 }}>

          <Card sx={{ display: 'flex', width:600 }}>

            <CardContent sx={{ flex: 1 }}>
              <Grid container maxWidth="md" direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={6} md={6}>
                  <Typography component="h2" variant="h5" style={hideWhenEdit} sx={{ fontWeight: 'bold', pl:4 }}>
                    {task.content}
                  </Typography>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Button variant="contained" startIcon={<DeleteOutline />} onClick={handleDeleteTask}
                    sx={{ width:100, height:35, textTransform: 'none', fontSize:15 }} style={hideWhenEdit}>
                  Delete
                  </Button>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Button variant="contained" startIcon={<EditIcon />} sx={{ width:100, height:35, textTransform: 'none', fontSize:15 }}
                    onClick={handleEditTask} style={hideWhenEdit}>
                  Edit
                  </Button>
                </Grid>
                <Grid item xs={12} md={12} sx={{ pb:1 }}>
                  <Typography variant="subtitle1" color="text.secondary" style={hideWhenEdit} sx={{ pl:4, height:30 }}>
                    {task.category}
                  </Typography>

                </Grid>
              </Grid>
              <form onSubmit={confirmEditTask} style={showWhenEdit}>
                <Grid container maxWidth="md" sx={{ pl:4 }}>
                  <Grid item xs={12} md={12} sx={{ pb:1 }}>
                    <TextField
                      hiddenLabel
                      required
                      variant="standard"
                      label="content"
                      size="small"
                      name="content"
                      value={content}
                      onChange={(e) => {setContent(e.target.value)}}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ pb:1 }}>
                    <CategorySelect defaultValue={task.category}/>
                  </Grid>
                  <Grid item xs={4} md={3} sx={{ pb:1 }}>
                    <Button variant="contained" type="submit" sx={{ width:100, height:35, textTransform: 'none', fontSize:15 }}>
                    Confirm
                    </Button>
                  </Grid>
                  <Grid item xs={4} md={3} sx={{ pb:1 }}>
                    <Button variant="contained" onClick={handleCancelEdit} sx={{ width:100, height:35, textTransform: 'none', fontSize:15 }}>
                    Cancel
                    </Button>
                  </Grid>
                </Grid>
              </form>

              <Divider style={{ width:'100%' }}/>

              <Interrupts interrupts={task.interrupts} task={task}/>
              <InterruptForm task={task}/>


            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>

  )
}



export default Task
