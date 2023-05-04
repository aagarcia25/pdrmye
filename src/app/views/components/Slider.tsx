import { Backdrop, CircularProgress } from '@mui/material'




const Slider = ({
    open,
}:{
    open:boolean
}) => {
  return (
    <div>
        <Backdrop
        sx={{ color: "rgb(175, 140, 85)", zIndex: 2000 }}
        open={open}
         >
        <CircularProgress color="inherit" /> 
      </Backdrop>
    </div>
  )
}

export default Slider
