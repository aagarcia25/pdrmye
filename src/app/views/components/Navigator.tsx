import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Logo from "../../assets/img/logo.svg";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Collapse, Typography } from "@mui/material";
import { getMenus } from "../../services/localStorage";
import { menus } from "../../interfaces/menu/menu";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';



export default function Navigator(props: DrawerProps, logoFijo: any) {
  const { ...other } = props;
  const navigate = useNavigate();
 
  const list: menus[] = JSON.parse(String(getMenus()));
  const [open, setOpen] = React.useState(0);
  const handleClick = (x:number) => {
    setOpen(x);
  };


  return (
    <Drawer variant="permanent" {...other} {...logoFijo}>
      <AppBar
        position="sticky"
        sx={{ bgcolor: "rgb(255, 255, 255)", width: "100%" }}
      >
        <Toolbar>
          <img src={Logo} style={{ width: "100%" }} />
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          overflow: "auto",
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
                <ListItemButton key={indexx}   onClick={()=>handleClick(indexx)}>
                <ListItemIcon>
                <SendIcon />
                </ListItemIcon>
               
                <ListItemText key={indexx}  primary={
                   <Typography variant="button" sx={{ fontFamily: "MontserratMedium" }} gutterBottom>
                  {item.Menu}
                  </Typography>
                  } />
               
                {open ? <ExpandLess /> : <ExpandMore />}
                 </ListItemButton>
                 {/* <Divider key={Math.random()} absolute /> */}
                 
                 {
                    item?.items?.map((subitem,index) =>{
                      return(
                        <Collapse key={index}   in={open===indexx} timeout="auto" unmountOnExit>
                        <List key={index}  component="div" disablePadding>
                          <Divider/>
                          <ListItemButton  key={index}  onClick={() => navigate(subitem.Path)}  sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <ArrowForwardIcon />
                            </ListItemIcon>
                               <ListItemText key={index}  primary={
                                <Typography variant="caption" sx={{ fontFamily: "MontserratMedium" }} gutterBottom>
                                {  subitem.Menu}
                                </Typography>
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
                                <Typography variant="caption" sx={{ fontFamily: "MontserratMedium" }} gutterBottom>
                                {  item.Menu}
                                </Typography>
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
