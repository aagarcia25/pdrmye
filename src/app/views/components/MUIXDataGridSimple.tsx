import * as React from "react";
import { DataGrid,  esES as gridEsES, esES, GridCellParams, GridToolbar } from "@mui/x-data-grid";
import { createTheme,ThemeProvider } from "@mui/material";
import { esES as coreEsES } from "@mui/material/locale";

const theme = createTheme(coreEsES, gridEsES);

export default function MUIXDataGridSimple(props: any) {

  return (
      <ThemeProvider theme={theme}>
        <DataGrid
          {...props.rows}
          density="compact"
          
          disableSelectionOnClick 
          disableColumnFilter
          disableIgnoreModificationsIfProcessingProps	
          disableColumnSelector
          disableDensitySelector
          rowsPerPageOptions={[6]}
          components={{ Toolbar: GridToolbar }}
          pageSize={5}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          columns={props.columns}
          rows={props.rows}
          sx={{ fontFamily: "MontserratMedium" }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </ThemeProvider>
  );
}