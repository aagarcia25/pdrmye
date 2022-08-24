import React from "react";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

type ThemeProp = {
  children: JSX.Element;
};

export enum themePalette {
  BG = "#grey",
  LIME = "#ff4400",
  FONT_GLOBAL = "'JetBrains Mono', monospace",
  BG_B = "#666",
}

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: themePalette.BG,
    },
    primary: {
      main: themePalette.BG_B,
    },
  },
  typography: {
    fontFamily: themePalette.FONT_GLOBAL,
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: {
          textTransform: "none",
          
        },
      },
    },
  },
});

export const ThemeConfig: React.FC<ThemeProp> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
