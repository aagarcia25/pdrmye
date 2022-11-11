import { Grid, Tooltip, Typography } from '@mui/material'

const Title = ({
titulo,
tooltip
}:{
titulo:string
tooltip:string
}) => {
  return (
    <Grid container sx={{ justifyContent: "center" }}>
    <Grid item xs={10} sx={{ textAlign: "center" }}>
    <Typography sx={{ fontFamily: "MontserratMedium" }}>
        <Tooltip title={tooltip}>
        <h1>{titulo}</h1>
        </Tooltip>
      </Typography>
    </Grid>
  </Grid>
  )
}

export default Title
