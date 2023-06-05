import { createTheme, ThemeProvider } from "@mui/material";
import { esES as coreEsES } from "@mui/material/locale";
import { DataGrid, GridColumnVisibilityModel, esES as gridEsES, GridToolbar, } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { PERMISO } from "../../interfaces/user/UserInfo";
import { getPermisos } from "../../services/localStorage";



const theme = createTheme(coreEsES, gridEsES);

const MUIXDataGridMun = ({
  modulo,
  handleBorrar,
  columns,
  rows,
  controlInterno
}: {
  modulo: string
  handleBorrar: Function,
  columns: any,
  rows: any,
  controlInterno: string

}
) => {
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [elimasiva, setelimasiva] = useState<boolean>(false);

  const [columnVisibilityModel, setColumnVisibilityModel] =
  React.useState<GridColumnVisibilityModel>({
    id: false,
    IdConCheque:false,
    TipoSolicitud:false,
    idmunicipio:false,
    IdRegistro:false,
    deleted:false,
    ModificadoPor:false,
    CreadoPor:false,
    Destinatario:false,
    Comentarios:false
  });

  useEffect(() => {

    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === controlInterno) {

        if (String(item.Referencia) === "ELIMMAS") {
          setelimasiva(true);
        }
      }
    });
  }, []);
  return (
    <div style={{ height: 600, width: "100%" }}>
      <ThemeProvider theme={theme}>
        <DataGrid
          columns={columns}
          rows={rows}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
          error={rows.value < 0}
          density="compact"
          rowsPerPageOptions={[10, 25, 50, 100]}
          disableSelectionOnClick
         // disableColumnFilter
         // disableColumnSelector
          disableDensitySelector
          getRowHeight={() => 'auto'}
          components={{ Toolbar: GridToolbar }}
          sx={{
            fontFamily: "Poppins,sans-serif", fontWeight: '500',
            fontSize:"12px",
            '& .super-app-theme--cell': {
              backgroundColor: 'rgba(224, 183, 60, 0.55)',
              color: '#1a3e72',
            },
            '& .super-app.negative': {
              color: "rgb(84, 3, 3)",
              backgroundColor: "rgb(196, 40, 40, 0.384)",
            },
            '& .super-app.positive': {
              color: '#002200',
              backgroundColor: "rgb(0, 40, 0, 0.384)",
            },
          }}
          componentsProps={{
            toolbar: {
              label: "Buscar",
              showQuickFilter: true,

              quickFilterProps: { debounceMs: 500, },

              csvOptions: {
                fileName: modulo,
                utf8WithBom: true,

              }
            },
          }}
          checkboxSelection={elimasiva}
          onSelectionModelChange={(newSelectionModel: any) => { handleBorrar(newSelectionModel); }}
          localeText={{
            columnsPanelHideAllButton:"Ocultar todo",
            columnsPanelShowAllButton:"Mostrar todo",
            columnsPanelTextFieldPlaceholder:"",
            columnsPanelTextFieldLabel:"Buscar",
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
            toolbarExportCSV: 'Descargar como CSV',
            toolbarExportPrint: 'Imprimir',
            checkboxSelectionSelectRow: "Filas seleccionadas",
            checkboxSelectionSelectAllRows: 'Seleccionar todas las filas',
            errorOverlayDefaultLabel: 'Ha ocurrido un error.',
            footerRowSelected: (count) =>
              count > 1 ?
                `${count.toLocaleString()} filas seleccionadas`
                :
                `${count.toLocaleString()} fila seleccionada`,
            footerTotalRows: 'Filas Totales:',
            columnMenuLabel: 'Menú',
            columnMenuShowColumns: 'Mostrar columnas',
            columnMenuFilter: 'Filtro',
            columnMenuHideColumn: 'Ocultar',
            columnMenuUnsort: 'Desordenar',
            columnMenuSortAsc: 'Ordenar ASC',
            columnMenuSortDesc: 'Ordenar DESC',
            columnHeaderFiltersTooltipActive: (count) =>
              count > 1 ? `${count} filtros activos` : `${count} filtro activo`,
            columnHeaderFiltersLabel: 'Mostrar filtros',
            columnHeaderSortIconLabel: 'Ordenar',
            filterPanelColumns: 'Columnas',
            filterOperatorContains: 'Contiene',
            filterOperatorEquals: 'Igual',
            filterOperatorStartsWith: 'Comienza Con',
            filterOperatorEndsWith: 'Termina Con',
            filterOperatorIsEmpty: 'Es Vacio',
            filterOperatorIsNotEmpty: 'No Vacio',
            filterOperatorIsAnyOf:'Es Cualquiera de',
            filterPanelInputLabel: 'Valor',
            filterPanelInputPlaceholder: 'Valor Filtrado',
          }}
        />
      </ThemeProvider>
    </div>
  );
}
export default MUIXDataGridMun;