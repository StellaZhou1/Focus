import React from 'react'
import { useDispatch } from 'react-redux'
import { createTask } from '../reducers/taskReducer'
import { TextField, Button, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CategorySelect from './CategorySelect'
const TaskForm = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const addTask = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    const category = event.target.category.value
    dispatch(createTask(content,category))
    event.target.content.value = ''
    event.target.category.value = ''
    setOpen(false)
  }
  return (

    <div>
      <Grid sx={{ py: 4 }} display='flex' justifyContent="flex-end">
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen} sx={{ width:120, textTransform: 'none', fontSize:15 }}>
          Task
        </Button>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a task</DialogTitle>
        <form id="create-task-from" onSubmit={addTask}>
          <DialogContent>
            <CategorySelect/>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Content"
              type="text"
              required
              fullWidth
              variant="standard"
              name="content"
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit' form="create-task-from">Create</Button>
          </DialogActions>
        </form>

      </Dialog>
    </div>
  )
}

export default TaskForm