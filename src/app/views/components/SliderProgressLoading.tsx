import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { COLOR } from '../../styles/colors';


const SliderProgressLoading = ({
}: {
  }) => {
  return (
    <>

      <Grid className='containerLoading' container direction="column"
        justifyContent="center">
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
          <LinearProgress />
          <LinearProgress />
        </Box>
        <Grid item >
          <Typography variant='h4' className='Cargando'>
            {"Cargando..."}
          </Typography>
        </ Grid>
      </Grid>

    </>
  )
}

export default SliderProgressLoading
