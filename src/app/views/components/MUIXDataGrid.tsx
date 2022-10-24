import * as React from "react";
import { DataGrid,  esES as gridEsES, esES, GridToolbar } from "@mui/x-data-grid";
import { createTheme, LinearProgress, ThemeProvider } from "@mui/material";
import { esES as coreEsES } from "@mui/material/locale";
import { CustomNoRowsOverlay } from "./menu/CustomNoRowsOverlay";
import { CustomToolbar } from "./menu/CustomToolbar";

const theme = createTheme(coreEsES, gridEsES);



export default function MUIXDataGrid(props: any) {
  return (
    <div style={{ height: "60vh", width: "100%" }}>
      <ThemeProvider theme={theme}>
        <DataGrid
          {...props.rows}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          columns={props.columns}
          rows={props.rows}
          align
          density="compact"
          rowsPerPageOptions={[10, 25, 50, 100]}
          disableSelectionOnClick 
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          sx={{ fontFamily: "MontserratMedium" }}
          components={{ Toolbar: GridToolbar }}
          /*components={{
            Toolbar: CustomToolbar,
            LoadingOverlay: LinearProgress,
            NoRowsOverlay: CustomNoRowsOverlay,            
          }}*/

          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
         
        />
      </ThemeProvider>
    </div>
  );
}