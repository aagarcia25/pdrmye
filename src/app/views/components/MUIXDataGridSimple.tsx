import * as React from "react";
import { DataGrid, esES as gridEsES, esES, GridCellParams, GridToolbar, GridToolbarFilterButton } from "@mui/x-data-grid";
import { createTheme, Grid, ThemeProvider } from "@mui/material";
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
            rowsPerPageOptions={[12]}
            components={{ Toolbar: GridToolbar }}
            pageSize={20}
            columns={props.columns}
            rows={props.rows}
            sx={{ fontFamily: "sans-serif",  }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
                csvOptions:{  fileName: 'Export',
                  utf8WithBom: true,
                 }
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

  );
}