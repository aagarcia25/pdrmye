import * as React from "react";
import { DataGrid,  esES as gridEsES, esES } from "@mui/x-data-grid";
import { createTheme,ThemeProvider } from "@mui/material";
import { esES as coreEsES } from "@mui/material/locale";

const theme = createTheme(coreEsES, gridEsES);



export default function MUIXDataGridSimple(props: any) {
  return (
      <ThemeProvider theme={theme}>
        <DataGrid
          disableSelectionOnClick 
          rowsPerPageOptions={[5]}
          pageSize={5}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          columns={props.columns}
          rows={props.rows}
          sx={{ fontFamily: "MontserratMedium" }}
        />
      </ThemeProvider>
  );
}