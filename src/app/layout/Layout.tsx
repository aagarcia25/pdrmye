import React, { ReactNode } from "react";
import { Box } from "@mui/system";
import NavBar from "../component/NavBar";

import { Toolbar } from "@mui/material";
import { colores } from "../component/styles";

interface Props {
  children?: ReactNode;
}

const drawerWidth = 0;

const Layout = ({ children, ...props }: Props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar drawerWidth={drawerWidth} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor:colores.grisdetalle }}>
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};

export default Layout;
