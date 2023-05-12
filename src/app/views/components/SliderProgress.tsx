import { Backdrop, Box, CircularProgress, Dialog, Fab, Grid, Typography } from '@mui/material'
import * as React from 'react';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import { COLOR } from '../../styles/colors';


const SliderProgress = ({
  open,
}: {
  open: boolean
}) => {

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };




  return (
    <Dialog fullScreen
      className='ContainerSliderProgress'
      sx={{ zIndex: 2000 }}
      open={open}
    >
      <Grid className='container' container direction="column"
        justifyContent="center"
        alignItems="center"  >
        <Grid item >
          <CircularProgress
            size={200}
            sx={{
              color: COLOR.negro,
            }}
          />
          <Typography variant='h4' className='Cargando'>
            {"Cargando .."}
          </Typography>
        </ Grid>
      </Grid>

    </Dialog>
  )
}

export default SliderProgress
