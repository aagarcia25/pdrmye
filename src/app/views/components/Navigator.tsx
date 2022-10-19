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
import { Collapse } from "@mui/material";
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
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
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
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby=""
          >



         {
           
           list.map((item) =>{
              
            return (

                (item?.items?.length !== 0) ?

                <div key={Math.random()}>
                <ListItemButton key={Math.random()}   onClick={handleClick}>
                <ListItemIcon>
                <SendIcon />
                </ListItemIcon>
                <ListItemText key={Math.random()}  primary={item.Menu} />
                {open ? <ExpandLess /> : <ExpandMore />}
                 </ListItemButton>
                 {/* <Divider key={Math.random()} absolute /> */}
                 
                 {
                    item?.items?.map((subitem) =>{
                      return(
                        <Collapse key={Math.random()}   in={open} timeout="auto" unmountOnExit>
                        <List key={Math.random()}  component="div" disablePadding>
                          <ListItemButton  key={Math.random()}  onClick={() => navigate(subitem.Path)}  sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <ArrowForwardIcon />
                            </ListItemIcon>
                            <ListItemText key={Math.random()}  primary={subitem.Menu} />
                          </ListItemButton>
                          <Divider key={Math.random()} absolute />
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
                <ListItemText primary={item.Menu} />
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
