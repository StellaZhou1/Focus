

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import interruptService from '../services/interrupt'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

export const Interrupt = ({ interrupt,task }) => {
  const dispatch = useDispatch()
  const [interruptObj,setInterruptObj] = useState()
  const handleDeleteInterrupt = async () => {
    await interruptService.remove(interruptObj.task,interrupt)

    let newInterrupts = task.interrupts.filter(i => i!==interrupt)
    const newTask = {
      ...task,
      interrupts:newInterrupts
    }
    dispatch({
      type: 'DELETE_INTERRUPT',
      data: newTask
    })

  }
  useEffect(() => {
    async function fetchInterrupt() {
      try {
        const obj = await interruptService.getInterruptById(interrupt)
        setInterruptObj(obj)
      } catch (err) {
        console.error(err)
      }
    }
    fetchInterrupt()
  }, [interrupt,dispatch])
  if(interruptObj){
    return (
      <Grid container justify="flex-end" sx={{ pl:4 }}>
        <Grid item sx={{ width:'auto',pt:1 }}>
          {interruptObj.successful?<CheckIcon sx={{ fontSize: 18,my:'auto' }}/>:<ClearIcon sx={{ fontSize: 18,my:'auto' }}/>}
        </Grid>
        <Grid item sx={{ width:'auto',pt:0.4 }}>
          <Typography component="h2" variant="subtitle1">{interruptObj.reason}</Typography>
        </Grid>
        <Grid item xs={1} md={1} >
          <IconButton aria-label="Example" onClick={handleDeleteInterrupt}>
            <DeleteOutlineIcon sx={{ fontSize: 18,my:'auto' }}/>
          </IconButton>
        </Grid>
      </Grid>
    )
  }
  return (<div></div>)
}

const Interrupts = ({ interrupts,task }) => {
  if(interrupts)
    return (
      <>
        {interrupts.map(interrupt => <Interrupt key={interrupt} interrupt={interrupt} task={task}/>)}
      </>
    )
  return <div></div>
}
export default Interrupts