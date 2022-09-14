import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Logo from '../../assets/img/logo.svg';
import Article from '@mui/icons-material/Article';
import PersonAddDisabled from '@mui/icons-material/PersonAddDisabled';
import PeopleAlt from '@mui/icons-material/PeopleAlt';
import { Reorder } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { flexbox } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import { Collapse } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const categories = [

  {
    id: 'Inicio',
    children: [
      { id: 'Bienvenido', icon: <Article />, path: '/bienvenido' }

    ],
  },


  {
    id: 'Catálogos',
    children: [

      { id: 'Municipios', icon: <Article />, path: '/inicio/catalogos/mun' },
      { id: 'Municipio Póblacion', icon: <Article />, path: '/inicio/catalogos/munpob' },
      { id: 'Municipio Facturación', icon: <Article />, path: '/inicio/catalogos/munfacturacion' },
      { id: 'Municipio Pobreza Moderada', icon: <Article />, path: '/inicio/catalogos/munpobmod' },
      { id: 'Municipio Pobreza Extrema', icon: <Article />, path: '/inicio/catalogos/munpobrezaext' },
      { id: 'Municipio Póblacion Proyección', icon: <Article />, path: '/inicio/catalogos/munproyec' },
      { id: 'Municipio Recaudación', icon: <Article />, path: '/inicio/catalogos/munrecaudacion' },
      { id: 'Municipio Territorio', icon: <Article />, path: '/inicio/catalogos/munterritorio' },
      
      { id: 'Avisos', icon: <Article />, path: '/inicio/catalogos/avisos' },
      { id: 'Eventos', icon: <Article />, path: '/inicio/catalogos/eventos' },
      { id: 'Departamentos', icon: <Article />, path: '/inicio/catalogos/departamentos' },
     
      
      { id: 'Tipo de Fondos', icon: <Article />, path: '/inicio/catalogos/tipoFondo' },
      { id: 'Tasa de Interes', icon: <Article />, path: '/inicio/catalogos/tasa' },
      { id: 'UMAS', icon: <Article />, path: '/inicio/catalogos/umas' },
      { id: 'Coeficientes', icon: <Article />, path: '/inicio/catalogos/coeficientes' },

    ],
  },
  {
    id: 'Articulos',
    children: [
      { id: 'Art. 14 FI ', icon: <Article />, path: '/inicio/articulos/art14f1' },
      { id: 'Art. 14 FII', icon: <Article />, path: '/inicio/articulos/art14f2' },
      { id: 'Art. 14 FIII', icon: <Article />, path: '/inicio/articulos/art14f3' },

    ],
  },
  {
    id: 'Participaciones Estatales',
    children: [
      { id: 'ISN', icon: <Article />, path: '/inicio/participaciones/isn' },
      { id: 'ICV', icon: <Article />, path: '/inicio/participaciones/icv' },

    ],
  },
  {
    id: 'Participaciones Federales',
    children: [
      { id: 'FPG', icon: <Article />, path: '/inicio/participaciones/fpg' },
      { id: 'FFM30', icon: <Article />, path: '/inicio/participaciones/ffm30' },
      { id: 'FFM70', icon: <Article />, path: '/inicio/participaciones/ffm70' },
      { id: 'IEPS', icon: <Article />, path: '/inicio/participaciones/ieps' },
      { id: 'FOFIR', icon: <Article />, path: '/inicio/participaciones/fofir' },
      { id: 'ISAN', icon: <Article />, path: '/inicio/participaciones/isan' },
      { id: 'FEXHI', icon: <Article />, path: '/inicio/participaciones/fexhi' },
      { id: 'COMP ISAN', icon: <Article />, path: '/inicio/participaciones/comp-isan' },
      { id: 'IEPSGyD', icon: <Article />, path: '/inicio/participaciones/iepsgyd' },
      { id: 'ISR', icon: <Article />, path: '/inicio/participaciones/isr' },
      { id: 'FEIEF', icon: <Article />, path: '/inicio/participaciones/feief' },

    ],
  },
  {
    id: 'Aportaciones Estatales',
    children: [
      { id: 'FOULT', icon: <Article />, path: '/inicio/aportaciones/foult' },
      { id: 'FODES', icon: <Article />, path: '/inicio/aportaciones/fodes' },
      { id: 'FOSEGUM', icon: <Article />, path: '/inicio/aportaciones/fosegum' },
      { id: 'FODEM', icon: <Article />, path: '/inicio/aportaciones/fodem' },
    ],
  },
  {
    id: 'Aportaciones Federales',
    children: [
      { id: 'FORTAUM', icon: <Reorder />, path: '/inicio/aportaciones/fortaum' },
      { id: 'FISM', icon: <Reorder />, path: '/inicio/aportaciones/fism' },
    ],
  },
  {
    id: 'SPEIs',
    children: [

    ],
  },
  {
    id: 'Roles y Privilegios',
    children: [
      { id: 'Roles de Usuario', icon: <PeopleAlt />, path: '' },
      { id: 'Privilegios de Usuario', icon: <PersonAddDisabled />, path: '' },

    ],
  },
  {
    id: 'Contacto Municipios',
    children: [
    ],
  },
  {
    id: 'Calendario',
    children: [
      { id: 'Calendario', icon: <Article />, path: '/inicio/calendario' },
    ],
  },
  {
    id: 'Generador de Estadisticas',
    children: [
    ],
  },

  {
    id: 'Organismos Paraestatales',
    children: [
      { id: '3% de ISN', icon: <Article />, path: '/bienvenido' },
      { id: 'Pensiones Vitalicias', icon: <Article />, path: '/bienvenido' },
      { id: 'Pago de 1 y 2 al Millar', icon: <Article />, path: '/bienvenido' },
      { id: 'Gastos Extraordinario con Presupuesto Virtual', icon: <Article />, path: '/bienvenido' },
      { id: 'Pago Virtual ICV', icon: <Article />, path: '/bienvenido' },
    ],
  },

  {
    id: 'Donativos ICV',
    children: [
      { id: 'Cruz Roja', icon: <Article />, path: '/bienvenido' },
      { id: 'Bomberos', icon: <Article />, path: '/bienvenido' },
    ],
  },

  {
    id: 'Ayudas Sociales',
    children: [
      { id: 'Cruz Roja', icon: <Article />, path: '/bienvenido' },
      { id: 'Bomberos', icon: <Article />, path: '/bienvenido' },
    ],
  },


  {
    id: 'Organismos',
    children: [
      { id: 'Servicios Personales', icon: <Article />, path: '/bienvenido' },
      { id: 'Servicios Generales', icon: <Article />, path: '/bienvenido' },
      { id: 'Programa Estatal de Inversion (PEI)', icon: <Article />, path: '/bienvenido' },
      { id: 'Anticipos', icon: <Article />, path: '/bienvenido' },
      { id: 'Gastos Extraodinarios', icon: <Article />, path: '/bienvenido' },
    ],
  },


];
/////////////////////////////////// color de fuente children del menu 
const item = {
  py: '2px',
  px: 3,
  color: '#888888',
  '&:hover, &:focus': {

  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
  bgcolor: '#777777'
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;
  const navigate = useNavigate();


  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };



  return (
 
   
   
   <Drawer variant="permanent" {...other  }>
 <Box>

    <AppBar position="absolute" sx={{bgcolor: 'rgb(255, 255, 255)', zIndex: (theme) => theme.zIndex.drawer + 1, width: "100%"  }}>
      <Toolbar>
      <img src={Logo} style={{ width: '100%' }} />
        
      </Toolbar>

      
    </AppBar>

   
   


      <List disablePadding>
       
       
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#111111', bgcolor: '#FFFFFF' }}>

        </ListItem>



        <ListItem sx={{ ...item, ...itemCategory, color: '#111111', bgcolor: '#FFFFFF' }}>
          <ListItemIcon>

          </ListItemIcon>
          <ListItemText>

         

          </ListItemText>
        </ListItem>





       
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: 'rgb(255, 255, 255)', }}>
            
            
            
            <ListItem  onClick={handleClick} sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#555555' }} >{id}</ListItemText>
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>




            {children.map(({ id: childId, icon, path }) => (
              

              <ListItem disablePadding key={childId}>
                 <Collapse in={open} timeout="auto" unmountOnExit>
                <ListItemButton sx={item}
                  onClick={(event) => navigate(path)}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>

                </Collapse>
              </ListItem>
            ))}






            <Divider sx={{ mt: 2 }} />
          </Box>
          
        ))}
       
      </List>
       </Box>
    </Drawer>
   
  );
}