import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const TimeSelect = ({ setTimeScale }) => {
  const [time, setTime] = React.useState('Day')
  const timeScale = ['Day','Week','Month']
  const handleChange = (event) => {
    setTime(event.target.value)
    if(setTimeScale){
      setTimeScale(event.target.value)
    }
  }

  return (
    <FormControl sx={{ minWidth: 240 }} size="small">
      <InputLabel id="demo-simple-select-label">Time</InputLabel>
      <Select
        id="demo-simple-select"
        value={time}
        label="Time"
        onChange={handleChange}
        name='time'
      >
        {timeScale.map(scale => <MenuItem key={scale} value={scale}>{scale}</MenuItem>)}

      </Select>
    </FormControl>
  )
}
export default TimeSelect