import { Backdrop, Box, CircularProgress, Fab, Typography } from '@mui/material'
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
    <div>
      <Backdrop
        sx={{ color: "rgb(175, 140, 85)", zIndex: 2000 }}
        open={open}
      >
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <Box alignItems={"center"} sx={{ m: 1, position: 'relative' }}>
            <CircularProgress
              size={200}
              sx={{
                color: COLOR.doradoNL,
              }}
            />
          </Box>
             <Typography variant='h4' className=''>
              {"Obteniendo Video..."}
            </Typography>
        </Box>
      </Backdrop>
    </div>
  )
}

export default SliderProgress
