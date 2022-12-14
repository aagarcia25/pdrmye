import { DataGrid, esES as gridEsES, GridToolbar, } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material";
import { esES as coreEsES } from "@mui/material/locale";


const theme = createTheme(coreEsES, gridEsES);

const MUIXDataGridMun = ({
  modulo,
  handleBorrar,
  columns,
  rows,
  borrar
}: {
  modulo: string
  handleBorrar: Function,
  columns: any,
  rows: any,
  borrar: boolean

}
) => {
  return (
    <div style={{ height: 600, width: "100%" }}>
      <ThemeProvider theme={theme}>
        <DataGrid
          columns={columns}
          rows={rows}
          error={rows.value<0 }
          density="compact"
          rowsPerPageOptions={[10, 25, 50, 100]}
          disableSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          getRowHeight={() => 'auto'}
          components={{ Toolbar: GridToolbar }}
          sx={{ fontFamily: "Poppins,sans-serif" ,  fontWeight: '600',
          '& .super-app-theme--cell': {
            backgroundColor: 'rgba(224, 183, 60, 0.55)',
            color: '#1a3e72',
          },
          '& .super-app.negative': {
            color: "rgb(84, 3, 3)",
            backgroundColor: "rgb(196, 40, 40, 0.384)",
          },
          '& .super-app.positive': {
            color: '#000000',
          }, }}
          componentsProps={{
            toolbar: {
              label: "Buscar",
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
              csvOptions: {
                fileName: modulo,
                utf8WithBom: true,

              }
            },
          }}
          checkboxSelection={borrar}
          onSelectionModelChange={(newSelectionModel: any) => { handleBorrar(newSelectionModel); }}
          localeText={{
            noRowsLabel: "No se ha encontrado datos.",
            noResultsOverlayLabel: "No se ha encontrado ningún resultado",
            toolbarColumns: "Columnas",
            toolbarExport: "Exportar",
            toolbarColumnsLabel: "Seleccionar columnas",
            toolbarFilters: "Filtros",
            toolbarFiltersLabel: "Ver filtros",
            toolbarFiltersTooltipHide: "Quitar filtros",
            toolbarFiltersTooltipShow: "Ver filtros",
            toolbarQuickFilterPlaceholder: "Buscar",
            toolbarExportLabel: 'Exportar',
            toolbarExportCSV: 'Enviar a  CSV',
            toolbarExportPrint: 'Imprimir',
            columnMenuUnsort: 'Sin Orden',
            columnMenuSortAsc: 'Ordenar Ascendente',
            columnMenuSortDesc: 'Ordenar Descendente',
            columnHeaderSortIconLabel: 'Ordenar',
            
            // columnMenuFilter:'Menú'

          }}

        />
      </ThemeProvider>
    </div>
  );
}
export default MUIXDataGridMun;