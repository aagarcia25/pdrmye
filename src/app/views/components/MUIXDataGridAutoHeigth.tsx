import { ThemeProvider, createTheme } from "@mui/material";
import { esES as coreEsES } from "@mui/material/locale";
import {
  DataGrid,
  GridColumnVisibilityModel,
  GridToolbar,
  GridOverlay,
  esES as gridEsES,
} from "@mui/x-data-grid";
import React from "react";
import { Box, CircularProgress } from "@mui/material";

const theme = createTheme(coreEsES, gridEsES);

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, py: 2 }}>
        <CircularProgress size={28} />
        Cargando...
      </Box>
    </GridOverlay>
  );
}

export default function MUIXDataGridAutoHeigth(props: any) {
  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({
      id: false,
      IdConCheque: false,
      TipoSolicitud: false,
      idbanco: false,
      idestatus: false,
      IdRegistro: false,
      Solicitud: false,
      nombreMunicipio: false,
      Tipo: false,
      idmunicipio: false,
      idMunicipio: false,
    });

  const { rows = [], columns = [], loading = false } = props;

  return (
    <ThemeProvider theme={theme}>
      <DataGrid
        // ❌ QUITADO: {...props.rows}  (eso estaba mal)
        columns={columns}
        rows={rows}
        loading={!!loading}
        components={{
          Toolbar: GridToolbar,
          LoadingOverlay: CustomLoadingOverlay,
        }}
        componentsProps={{
          toolbar: {
            label: "Buscar",
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
            csvOptions: {
              fileName: new Date().getMilliseconds() + "_" + (props.modulo ?? ""),
              utf8WithBom: true,
            },
          },
        }}
        density="compact"
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        rowsPerPageOptions={[10, 25, 50, 100]}
        disableSelectionOnClick
        disableDensitySelector
        getRowId={(row) => (row.Id ? row.Id : row.id)}
        rowHeight={60}
        getRowHeight={() => "auto"}
        sx={{
          fontFamily: "Poppins,sans-serif",
          fontWeight: "600",
          fontSize: "12px",
          "& .super-app.positive": { color: "#000000" },
        }}
        localeText={{
          columnsPanelHideAllButton: "Ocultar todo",
          columnsPanelShowAllButton: "Mostrar todo",
          columnsPanelTextFieldPlaceholder: "",
          columnsPanelTextFieldLabel: "Buscar",
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
          toolbarExportCSV: "Descargar como CSV",
          toolbarExportPrint: "Imprimir",
          checkboxSelectionSelectRow: "Filas seleccionadas",
          checkboxSelectionSelectAllRows: "Seleccionar todas las filas",
          errorOverlayDefaultLabel: "Ha ocurrido un error.",
          footerRowSelected: (count) =>
            count > 1
              ? `${count.toLocaleString()} filas seleccionadas`
              : `${count.toLocaleString()} fila seleccionada`,
          footerTotalRows: "Filas Totales:",
          columnMenuLabel: "Menú",
          columnMenuShowColumns: "Mostrar columnas",
          columnMenuFilter: "Filtro",
          columnMenuHideColumn: "Ocultar",
          columnMenuUnsort: "Desordenar",
          columnMenuSortAsc: "Ordenar ASC",
          columnMenuSortDesc: "Ordenar DESC",
          columnHeaderFiltersTooltipActive: (count) =>
            count > 1 ? `${count} filtros activos` : `${count} filtro activo`,
          columnHeaderFiltersLabel: "Mostrar filtros",
          columnHeaderSortIconLabel: "Ordenar",
          filterPanelColumns: "Columnas",
          filterOperatorContains: "Contiene",
          filterOperatorEquals: "Igual",
          filterOperatorStartsWith: "Comienza Con",
          filterOperatorEndsWith: "Termina Con",
          filterOperatorIsEmpty: "Es Vacio",
          filterOperatorIsNotEmpty: "No Vacio",
          filterOperatorIsAnyOf: "Es Cualquiera de",
          filterPanelInputLabel: "Valor",
          filterPanelInputPlaceholder: "Valor Filtrado",
        }}
      />
    </ThemeProvider>
  );
}
