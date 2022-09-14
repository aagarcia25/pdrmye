import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Logo from './logo.svg';


function HideOnScroll(props:any) {


  return (
    <Slide  in={true}>
    {props.children}
    </Slide>
  );
}

export  function  Pruebascroll  (props: any) {

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props  }>
    <AppBar position="absolute" sx={{bgcolor: 'rgb(255, 255, 255)', zIndex: (theme) => theme.zIndex.drawer + 1, width: "100%"  }}>
      <Toolbar>

      {/* <img src={Logo} style={{ width: '100%' }} /> */}
        
      </Toolbar>

    </AppBar>

  </HideOnScroll>
      <Toolbar />
      <Container>
        <Box sx={{ my: 2 }}>
          {[...new Array(50)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            )
            .join('\n')}
        </Box>
      </Container>
    </React.Fragment>
  );
}
