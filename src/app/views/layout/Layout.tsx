import React, { ReactNode } from "react";
import { Box } from "@mui/system";

import { Toolbar } from "@mui/material";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

interface Props {
  children?: ReactNode;
}

const drawerWidth = 160;

const Layout = ({ children, ...props }: Props) => {
  return (
    <Box sx={{ display: "flex" }}>
    
    <NavBar drawerWidth={ drawerWidth } />
    <SideBar drawerWidth={ drawerWidth } />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};

export default Layout;
