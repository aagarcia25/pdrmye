import React from "react";
import { DataGrid,  esES as gridEsES, esES, GridToolbar, GridSelectionModel,  } from "@mui/x-data-grid";
import { createTheme,  ThemeProvider } from "@mui/material";
import { esES as coreEsES } from "@mui/material/locale";
import { CustomToolbar } from "./menu/CustomToolbar";


const theme = createTheme(coreEsES, gridEsES);
const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);


const MUIXDataGridMun = ({
    handleBorrar,
    columns,
    rows
  }: {
    handleBorrar: Function,
    columns: any,
    rows: any

  }) => {





  return (
    <div style={{height: 600, width: "100%" }}>
      <ThemeProvider theme={theme}>
        <DataGrid
          columns={columns}
          rows={rows}
          density="compact"
          rowsPerPageOptions={[10, 25, 50, 100]}
          disableSelectionOnClick 
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          getRowHeight={() => 'auto'}
          components={{ Toolbar: GridToolbar }}
          sx={{ fontFamily: "Poppins,sans-serif"}}
          componentsProps={{
            toolbar: {
              label:"Buscar",
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
         // checkboxSelection={checkboxSelection}
          onSelectionModelChange={(newSelectionModel: any) => {
            setSelectionModel(newSelectionModel);
          }}
          localeText={{
            noRowsLabel: "No se ha encontrado datos.",
            noResultsOverlayLabel: "No se ha encontrado ningún resultado",
            toolbarColumns: "Columnas",
            toolbarExport:"Exportar",
            toolbarColumnsLabel: "Seleccionar columnas",
            toolbarFilters: "Filtros",
            toolbarFiltersLabel: "Ver filtros",
            toolbarFiltersTooltipHide: "Quitar filtros",
            toolbarFiltersTooltipShow: "Ver filtros",
            toolbarQuickFilterPlaceholder:"Buscar",
            
        }}
         
        />
      </ThemeProvider>
    </div>
  );
}
export default MUIXDataGridMun;