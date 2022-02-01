import * as React from 'react'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { Grid } from '@mui/material'

const Filter = ({ setText }) => {

  return (
    <Grid sx={{ py: 2 }} display='flex' justifyContent="flex-end">
      <Box
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 240, height:40 , border:1, borderRadius: 1,
          borderColor: 'grey.400' }}
      >
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" disabled>
          <SearchIcon />
        </IconButton>
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search by title" onChange={e => setText(e.target.value)}/>
      </Box>
    </Grid>
  )
}
export default Filter