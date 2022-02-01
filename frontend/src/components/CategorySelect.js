import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useSelector } from 'react-redux'

const CategorySelect = ({ setCategoryToDisplay, defaultValue }) => {
  const items = useSelector(state => state.categories)
  const defaultCategory = defaultValue ? defaultValue: 'Default'
  const [category, setCategory] = React.useState(defaultCategory)

  const handleChange = (event) => {
    setCategory(event.target.value)
    if(setCategoryToDisplay){
      setCategoryToDisplay(event.target.value)
    }
  }
  if(items.length>0){
    return (
      <FormControl sx={{ minWidth: 240 }} size="small">
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
          name='category'
        >
          <MenuItem key={'Default'} value={'Default'}>Default</MenuItem>
          {items.map(item => <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>)}
        </Select>
      </FormControl>
    )
  }
  return (
    <FormControl sx={{ minWidth: 240 }} size="small">
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
        id="demo-simple-select"
        value={category}
        label="Category"
        onChange={handleChange}
        name='category'
      >
        <MenuItem key={'Default'} value={'Default'}>Default</MenuItem>
      </Select>
    </FormControl>
  )

}
export default CategorySelect