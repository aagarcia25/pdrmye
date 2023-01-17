import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Logo from "../../assets/img/logo.svg";
import { Collapse, Grid, Tooltip, Typography } from "@mui/material";
import { getMenus } from "../../services/localStorage";
import { menus } from "../../interfaces/menu/menu";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";



export default function Navigator(props: DrawerProps, logoFijo: any) {
  const { ...other } = props;
  const navigate = useNavigate();
 
  const list: menus[] = JSON.parse(String(getMenus()));
  const [open, setOpen] = useState(-1);
  const handleClick = (x:number) => {
    open===x?setOpen(-1):setOpen(x);
    
  };


  return (
    <Drawer variant="permanent"  {...other} {...logoFijo}>

      <Grid container 
        position="sticky"
        alignContent="center"
        sx={{ bgcolor: "rgb(255, 255, 255)", width: "100%" }}>
        <Grid item sx={{ width:"auto",higth:"5%" }}>
        <img src={Logo} style={{ width: "100%"  }} onClick={() => navigate("/")} />
        </Grid>
        <Grid item sx={{width:"auto", textAlign:"center", paddingLeft:"3%"}}>
          <Typography variant="h6" sx={{ fontWeight: '550' }}> DISTRIBUCIÓN DE RECURSOS </Typography>
          <Typography variant="subtitle1" > Ambiente:  { localStorage.getItem('Ambiente')} </Typography>
        </Grid> 
      </Grid>


      <Box
        sx={{
          // overflow: "auto",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <div>
          <List >



         {
           
           list.map((item,indexx) =>{
              
            return (

                (item?.items?.length !== 0) ?
                
                <div key={indexx}>
                <ListItemButton key={indexx}   onClick={()=>handleClick(indexx)} >
                <ListItemIcon>
                {/* <SendIcon /> */}
                </ListItemIcon>
               
                <ListItemText key={indexx}  primary={
                   <Tooltip title={item.Descripcion}>
                   <Typography variant="caption" sx={{ fontFamily: "sans-serif" ,fontWeight: '600' }} gutterBottom>
                    {item.Menu}
                  </Typography>
                  </Tooltip>
                  } />
               
               {open===indexx? <ExpandLess /> : <ExpandMore />}
                 </ListItemButton>
                 
                 {
                    item?.items?.map((subitem,index) =>{
                      return(
                        <Collapse key={index}   in={open===indexx} timeout="auto" unmountOnExit>
                        <List key={index}  component="div" disablePadding>
                          <Divider/>
                          <ListItemButton  key={index}  onClick={() => navigate(subitem.Path)}  sx={{ pl: 4 }}>
                            {/* <ListItemIcon>
                              <ArrowForwardIcon />
                            </ListItemIcon> */}
                               <ListItemText key={index}  primary={
                                <Tooltip title={subitem.Descripcion}>
                                <Typography className="menu-Typography" variant="caption" sx={{ fontFamily: "sans-serif" ,fontWeight: '550' }} gutterBottom>
                                {  subitem.Menu}
                                </Typography>
                                </Tooltip>
                                } />
                          </ListItemButton>
                          <Divider/>
                        </List>
                      </Collapse>
                      );
                    })
                 }            


                </div>
                
                :
                // SOLO IMPRIME EL BOTON CUANDO NO TIENE HIJOS RELACIONADOS
                <div key={Math.random()}>
                <ListItemButton   onClick={() => navigate(item.Path)}  >
                <ListItemIcon>
                <SendIcon />
                </ListItemIcon>
                <ListItemText key={Math.random()}  primary={
                                <Tooltip title={item.Descripcion}>
                                <Typography className="menu-Typography" variant="h4" component="h2" sx={{ fontFamily: "sans-serif"}} gutterBottom>
                                {  item.Menu}
                                </Typography>
                                </Tooltip>
                                } />
                </ListItemButton>
                <Divider key={Math.random()} absolute />
                </div>
            );

        })
            
        }

          </List>
        </div>
      </Box>
    </Drawer>
  );
}
