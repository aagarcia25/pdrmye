import { DataGrid,  esES as gridEsES, esES, GridToolbar,  } from "@mui/x-data-grid";
import { createTheme,  ThemeProvider } from "@mui/material";
import { esES as coreEsES } from "@mui/material/locale";
import { CustomToolbar } from "./menu/CustomToolbar";

const theme = createTheme(coreEsES, gridEsES);



export default function MUIXDataGrid(props: any) {
  return (
    <div style={{ height: "60vh", width: "100%" }}>
      <ThemeProvider theme={theme}>
        <DataGrid
          {...props.rows}
         // localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          columns={props.columns}
          rows={props.rows}
          align
          density="compact"
          rowsPerPageOptions={[10, 25, 50, 100]}
          disableSelectionOnClick 
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          getRowHeight={() => 'auto'}
          components={{ Toolbar: GridToolbar }}
          sx={{ fontFamily: "MontserratMedium" }}
          componentsProps={{
            toolbar: {
              label:"buscar",
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
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