import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navigator from './Navigator';
import Header from './Header';
import { ReactNode } from 'react';
import { getUser } from '../../services/localStorage';
import { RESPONSE, UserInfo } from '../../interfaces/user/UserInfo';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {new Date().getFullYear()}.

      {'   Aviso de Privacidad Contacto'}
            
    </Typography>
  );
}


 let theme = createTheme({
   palette: {
     primary: {
       light: '#63ccff',
       main: '#011115',
       dark: '#000003',
     },
   },
   typography: {
     h5: {
       fontWeight: 500,
       fontSize: 26,
       letterSpacing: 0.5,
     },
   },
   shape: {
     borderRadius: 8,
   },
   components: {
     MuiTab: {
       defaultProps: {
         disableRipple: true,
       },
     },
   },
   mixins: {
     toolbar: {
       minHeight: 48,
     },
   },
 });

 theme = {
   ...theme,
   components: {
     MuiDrawer: {
       styleOverrides: {
         paper: {
           backgroundColor: '#ffffff',
         },
       },
     },
     MuiButton: {
       styleOverrides: {
         root: {
           textTransform: 'none',
         },
         contained: {
           boxShadow: 'none',
           '&:active': {
             boxShadow: 'none',
           },
         },
       },
     },
     MuiTabs: {
       styleOverrides: {
         root: {
           marginLeft: theme.spacing(1),
         },
         indicator: {
           height: 3,
           borderTopLeftRadius: 3,
           borderTopRightRadius: 3,
           backgroundColor: theme.palette.common.white,
         },
       },
     },
     MuiTab: {
       styleOverrides: {
         root: {
           textTransform: 'none',
           margin: '0 16px',
           minWidth: 0,
           padding: 0,
           [theme.breakpoints.up('md')]: {
             padding: 0,
             minWidth: 0,
           },
         },
       },
     },
     MuiIconButton: {
       styleOverrides: {
         root: {
           padding: theme.spacing(1),
         },
       },
     },
     MuiTooltip: {
       styleOverrides: {
         tooltip: {
           borderRadius: 4,
         },
       },
     },
     MuiDivider: {
       styleOverrides: {
         root: {
           backgroundColor: 'rgb(255,255,255,0.15)',
         },
       },
     },
     MuiListItemButton: {
       styleOverrides: {
         root: {
           '&.Mui-selected': {
             color: '#rgb(255,255,255,0.15)',
           },
         },
       },
     },
     MuiListItemText: {
       styleOverrides: {
         primary: {
           fontSize: 14,
           fontWeight: theme.typography.fontWeightMedium,
         },
       },
     },
     MuiListItemIcon: {
       styleOverrides: {
         root: {
           color: 'inherit',
           minWidth: 'auto',
           marginRight: theme.spacing(2),
           '& svg': {
             fontSize: 20,
           },
         },
       },
     },
     MuiAvatar: {
       styleOverrides: {
         root: {
           width: 32,
           height: 32,
         },
       },
     },
   },
 };



interface Props {
  children?: ReactNode;
  user:RESPONSE;
}


const drawerWidth = 300;





export default function Inicio({ children,user,  }: Props ) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
     <ThemeProvider theme={theme}>
     
     
     <Box sx={{ display: 'flex', minHeight: '100vh' ,}}>
       
       
       
        <CssBaseline />
        <Box 
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } ,}}
         >
          
          
     
                 <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                
                  variant="temporary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}  />
                            
           
            <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } ,}}
            
          /> 
        </Box>
   


        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column',}}>
          <Header onDrawerToggle={handleDrawerToggle} name={user.Nombre + ' ' + user.ApellidoPaterno + ' '+ user.ApellidoMaterno} id={1}/>
          <Box component="main"           sx={{ flex: 1, py: 6, px: 4, bgcolor: 'rgb(255, 255, 255)' }}>
            {children}
          </Box>
          
        </Box>
      </Box>
     </ThemeProvider>




  );
}