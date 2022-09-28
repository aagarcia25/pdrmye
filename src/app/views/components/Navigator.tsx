import Divider from '@mui/material/Divider';
import Drawer, 
{ DrawerProps } from '@mui/material/Drawer';
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
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import BoyIcon from '@mui/icons-material/Boy';

export const categories = [

 
  {
    id: 'Roles y Privilegios',
    children: [
      { id: 'Usuarios',               icon: <PeopleAlt />,         path: '/inicio/usuario'  },
      { id: 'Roles de Usuario',       icon: <BoyIcon />,           path: '/inicio/roles'    },
      { id: 'Menus',                  icon: <MenuIcon />,          path: '/inicio/menus'    },
      { id: 'Privilegios de Usuario', icon: <PersonAddDisabled />, path: '/inicio/permisos' },

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
      { id: 'Inflación Mes', icon: <Article />, path: '/inicio/catalogos/inflacionMes' },
      { id: 'Inflación Año', icon: <Article />, path: '/inicio/catalogos/inflacionAnio' },
      { id: 'Crecimiento Año', icon: <Article />, path: '/inicio/catalogos/crecimientoAnio' },
      { id: 'Administración de Fondos', icon: <Article />, path: '/inicio/catalogos/fondos' },
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
      { id: 'Anticipo de Participaciones', icon: <Article />, path: '/bienvenido' },
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
    id: 'Organismos Paraestatales',
    children: [
      { id: 'Solicitudes Estatales', icon: <Article />, path: '/inicio/org/solicitudes' },
      { id: 'Solicitudes Federales', icon: <Article />, path: '/inicio/org/solicitudes' },
      { id: 'Pensiones Vitalicias', icon: <Article />, path: '/inicio/pensionesvitalicias' },
    ],
  },


  {
    id: 'Organismos',
    children: [
      { id: 'Solicitudes Estatales', icon: <Article />, path: '/inicio/org/solicitudes' },
    ],
  },


  // MUNICIPIOS
  {
    id: 'Municipios',
    children: [
      { id: 'Mis Cuentas', icon: <Article />, path: '/bienvenido' },
      { id: 'Solicitud de Recursos', icon: <Article />, path: '/bienvenido' },
      { id: 'Recepción de Recursos', icon: <Article />, path: '/bienvenido' },
    ],
  },

  {
    id: 'Contacto',
    children: [
      { id: 'Contacto Municipios', icon: <Article />, path: '/inicio/contactomunicipio' },
      { id: 'Contacto Organismos', icon: <Article />, path: '/inicio/contactoorganismos' },
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

export default function Navigator(props: DrawerProps,logoFijo: any) {



const [openModule, setOpenModule] = React.useState(false);


  const { ...other } = props;
  const navigate = useNavigate();



  return (
 
    
   <Drawer variant="permanent" {...other  }{...logoFijo}>
    <AppBar position="sticky" sx={{bgcolor: 'rgb(255, 255, 255)',  width: "100%" , }}>
      <Toolbar >
      <img src={Logo} style={{ width: '100%' }} />
      </Toolbar>
    </AppBar>
    {categories.map(({ id, children }) => (
 <Box key={id} sx={{ bgcolor: 'rgb(255, 255, 255)',width: '100%', }}>

 </Box>
  
))}
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#111111', bgcolor: '#FFFFFF' }}>

        </ListItem>
     
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: 'rgb(255, 255, 255)', }}>

            <ListItem  sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#555555' }} >{id}</ListItemText>
            
            </ListItem>
              {children.map(({ id: childId, icon, path }) => (
              

              <ListItem disablePadding key={childId}>
                
                <ListItemButton key={childId} sx={item}

                  onClick={(event) => navigate(path)}
                  
                  >

                  <ListItemIcon>{icon}</ListItemIcon>

                  <ListItemText>{childId}</ListItemText>

                </ListItemButton>
              
              </ListItem>
            ))}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}

      </List>
      
    </Drawer>
    
  );
  
}


