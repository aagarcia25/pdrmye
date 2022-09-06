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


export const categories = [

  {
    id: 'Catálogos',
    children: [
      { id: 'Bienvenido', icon: <Article />, path: '/bienvenido' }

    ],
  },


  {
    id: 'Catálogos',
    children: [
      { id: 'UMA', icon: <Article />, path: '' },
      { id: 'Municipio Póblacion', icon: <Article />, path: '/inicio/catalogos/munpob' }

    ],
  },
  {
    id: 'Articulos',
    children: [
      { id: 'Art. 14 ', icon: <Article />, path: '/inicio/articulos/art14' },

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


];

const item = {
  py: '2px',
  px: 3,
  color: '#B08C55',
  '&:hover, &:focus': {

  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
  bgcolor: '#B08C55'
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;
  const navigate = useNavigate();
  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#111111', bgcolor: '#FFFFFF' }}>

        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory, color: '#111111', bgcolor: '#FFFFFF' }}>
          <ListItemIcon>

          </ListItemIcon>
          <ListItemText>

            <Box sx={{ bgcolor: 'rgb(255, 255, 255)', }}>

              <img src={Logo} style={{ width: "10vw" }} />
            </Box>

          </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: 'rgb(255, 255, 255)', }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#777777' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, path }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton sx={item}
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