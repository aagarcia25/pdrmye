import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'




const Slider = ({
    open,
}:{
    open:boolean
}) => {
  return (
    <div>
        <Backdrop
        sx={{ color: '#fff', zIndex: 2000 }}
        open={open}
         >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default Slider
