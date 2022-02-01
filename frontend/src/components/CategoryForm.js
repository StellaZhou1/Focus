import React from 'react'
import { useDispatch } from 'react-redux'
import { createCategory } from '../reducers/categoryReducer'
import { TextField, Button, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
const CategoryForm = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const addCategory = async (event) => {
    event.preventDefault()
    const name = event.target.name.value
    dispatch(createCategory(name))
    event.target.name.value = ''
    setOpen(false)
    alert(`Category ${name} created successfully!`)
  }
  return (
    <div>
      <Grid sx={{ py: 4 }} display='flex' justifyContent="flex-end">
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen} sx={{ width:120,textTransform: 'none', fontSize:15 }}>
          Category
        </Button>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a category</DialogTitle>
        <form id="create-category-from" onSubmit={addCategory}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              required
              fullWidth
              variant="standard"
              name="name"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit' form="create-category-from">Create</Button>
          </DialogActions>
        </form>

      </Dialog>
    </div>
  )
}

export default CategoryForm