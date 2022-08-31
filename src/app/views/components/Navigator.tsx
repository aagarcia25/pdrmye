import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import leon from '../../assets/img/leon1.png';
import ArticleIcon from '@mui/icons-material/Article';
import Article from '@mui/icons-material/Article';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import PersonAddDisabled from '@mui/icons-material/PersonAddDisabled';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PeopleAlt from '@mui/icons-material/PeopleAlt';
import ReorderIcon from '@mui/icons-material/Reorder';
import { Reorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const categories = [
  {
    id: 'Catálogos',
    children: [
      { id: 'UMA', icon: <Article /> , path:'' }
     
    ],
  },
  
  {
    id: 'Articulos',
    children: [
      { id: 'Art. 14 Fracc I', icon: <Article /> , path:'' },
      { id: 'Art. 14 Fracc II', icon: <Article /> , path:''},
      { id: 'Art. 14 Fracc III', icon: <Article /> , path:''},
    ],
  },
  {
    id: 'Participaciones Estatales',
    children: [
      { id: 'ISN', icon: <Article />,  path:'/inicio/isn'},
      { id: 'ICV', icon: <Article />, path:'/inicio/icv'},
              ],
  },
  {
    id: 'Participaciones Federales',
    children: [  
      { id: 'ISN', icon: <Article />,  path:'/inicio/isn'},
      { id: 'ISN', icon: <Article />,  path:'/inicio/isn'},
      { id: 'ISN', icon: <Article />,  path:'/inicio/isn'},
      { id: 'ISN', icon: <Article />,  path:'/inicio/isn'},
      { id: 'ISN', icon: <Article />,  path:'/inicio/isn'},
      { id: 'ISN', icon: <Article />,  path:'/inicio/isn'},
      { id: 'ISN', icon: <Article />,  path:'/inicio/isn'},
      { id: 'ISN', icon: <Article />,  path:'/inicio/isn'},
      { id: 'ISN', icon: <Article />,  path:'/inicio/isn'},
      { id: 'ISN', icon: <Article />,  path:'/inicio/isn'},
      { id: 'ISN', icon: <Article />,  path:'/inicio/isn'},
      { id: 'ISN', icon: <Article />,  path:'/inicio/isn'},  
              ],
  },
  {
    id: 'Aportaciones Estatales',
    children: [
      { id: 'ISN', icon: <Article />,  path:'/inicio/isn'},  
      { id: 'ISN', icon: <Article />,  path:'/inicio/isn'},  
      { id: 'ISN', icon: <Article />,  path:'/inicio/isn'},  
      { id: 'ISN', icon: <Article />,  path:'/inicio/isn'},  
    ],
  },
  {
    id: 'Aportaciones Federales',
    children: [
      { id: 'FORTAMUN', icon: <Reorder /> , path:'' },
      { id: 'FISM', icon: <Reorder /> , path:''},
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
      { id: 'Roles de Usuario', icon: <PeopleAlt /> , path:''},
      { id: 'Privilegios de Usuario', icon: <PersonAddDisabled />, path:'' },
     
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
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
   // bgcolor: 'rgba(255, 255, 255, 0.08)',
    //bgcolor: '#707070'
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
  bgcolor: '#606060'
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;
  const navigate = useNavigate();
  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#909090' ,bgcolor: '#606060'}}>
        <img src={leon} style={{ width: "1.5vw" }} />
        <h3> {"  "+" "} PDRMyE</h3>
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            {/*<HomeIcon />*/}
          </ListItemIcon>
          <ListItemText>
            <h3>MENU</h3>
            
            </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#606060', }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#101010' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, path }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton  sx={item}
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