import {
  createTheme,
  Grid,
  IconButton,
  TextField,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import React, { useEffect, useState } from "react";
import SelectValues from "../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../services/catalogosServices";
import SelectFrag from "../Fragmentos/SelectFrag";
import { Moneda, } from "../menu/CustomToolbar";
import { PERMISO, RESPONSE } from "../../../interfaces/user/UserInfo";
import { getPermisos, getUser } from "../../../services/localStorage";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import AddSharpIcon from '@mui/icons-material/AddSharp';
import Slider from "../Slider";
import {
  DataGrid,
  GridSelectionModel,
  GridToolbar,
  esES as gridEsES,
} from "@mui/x-data-grid";
import { esES as coreEsES } from "@mui/material/locale";
import ModalForm from "../componentes/ModalForm";
import AddIcon from "@mui/icons-material/Add";
import { ORGDetail } from "./ORGDetail";

export const ORGHeader = ({
  idrow,
}: {
  idrow: string;
}) => {
const theme = createTheme(coreEsES, gridEsES);
const user: RESPONSE = JSON.parse(String(getUser()));
const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
const [openSlider, setOpenSlider] = useState(true);
//Constantes para llenar los select
const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
const [sumaTotal, setSumaTotal] = useState<Number>();
const [ures, setURes] = useState<SelectValues[]>([]);
const [provedores, setProvedores] = useState<SelectValues[]>([]);
const [conceptosCheque, setConceptosCheque] = useState<SelectValues[]>([]);
const [openModalDetalle, setOpenModalDetalle] = useState<boolean>(false);
const [vrows, setVrows] = useState<{}>("");
const [proyecto, setProyecto] = useState<string>('');
const [numCuenta, setNumCuenta] = useState<string>('');

const [HDetalle, setHDetalle] = useState<boolean>(true);
const [HHeader, setHHeader]   = useState<boolean>(true);
const [HCancel,setHCancel]    = useState<boolean>(true);
const [HSave,setHSave]        = useState<boolean>(true);
const [HAdd,setHAdd]          = useState<boolean>(false);
const [HEdit,setHEdit]        = useState<boolean>(true);




// Constantes para los campos
const [idUResp, setidUResp] = useState("");
const [idProveedor, setidProveedor] = useState("");
const [claveCheque,setClaveCheque] = useState("");


//Constantes para las columnas
const [data, setData] = useState([]);

const handleEditar=()=>{
  setHHeader(false);
  setHDetalle(true);
  setHCancel(false);
  setHSave(false);

}



const handleFilterChange1 = (v: string) => {
  setidUResp(v);
};

const handleFilterChange2 = (v: string) => {
  setidUResp(v);
};

const handleFilterChange3 = (v: string) => {
  setClaveCheque(v);
};


const handleClose = () => {
  setOpenModalDetalle(false);
};

const handleDetalle = (data: any) => {
  setVrows(data);
  setOpenModalDetalle(true);
};

const handleAdd = () => {
  setHHeader(false);
  setHDetalle(true);
  setHCancel(false);
  setHSave(false);
  setHEdit(true);
  setHAdd(true);
};

const handleCancel = () => {
  setHHeader(true);
  setHDetalle(true);
  setHCancel(true);
  setHSave(true);
  setHAdd(false);
  setHEdit(true);
};


const columnsParticipaciones = [
  { field: "id", hide: true },
  {
    field: "renglon",
    headerName: "Renglón",
    width: 100,
    description: "Renglón",
  },
  {
    field: "cveegreso",
    headerName: "Cve. Egreso",
    width: 100,
    description: "Cve. Egreso",
  },
  {
    field: "importe",
    headerName: "Importe",
    width: 140,
    description: "Importe",
    ...Moneda,
  },
  {
    field: "ClaveProyecto",
    headerName: "Clave Proyecto",
    width: 150,
    description: "Clave Proyecto",
  },
  {
    field: "uresp",
    headerName: "U. Resp",
    width: 150,
    description: "U. Resp",
  }

];


const loadFilter = (tipo: number) => {
  let data = { NUMOPERACION: tipo };
  CatalogosServices.SelectIndex(data).then((res) => {
    if (tipo === 26) {
      setURes(res.RESPONSE);
    } else if (tipo === 27){
      setProvedores(res.RESPONSE);
      setOpenSlider(false);
    } else if (tipo === 29){
      setConceptosCheque(res.RESPONSE);
    }
  });
};


useEffect(() => {
  loadFilter(29);
  loadFilter(26);
  loadFilter(27);
}, []);

return (
  <div>
  <Slider open={openSlider}></Slider>

  {openModalDetalle ? (
    <ModalForm title={"Detalle de Solicitud"} handleClose={handleClose}>
      <ORGDetail idrow={""}           />
    </ModalForm>
  ) : (
    ""
  )}  



  <Grid container  >

  <Grid container  >
  <Grid item xs={12} sm={12} md={12} lg={12}>
        
        

        <Tooltip title="Agregar Registro">
            <IconButton   onClick={() => handleAdd()} color= {!HAdd ? "success":"inherit" }  disabled={HAdd} >
              <AddSharpIcon />
            </IconButton >
          </Tooltip>
          <Tooltip title="Editar Registro">
            <IconButton   onClick={() => handleEditar()} color= {!HEdit ? "info":"inherit" } disabled={HEdit} >
              <ModeEditOutlineIcon />
            </IconButton >
          </Tooltip>
          <Tooltip title="Grabar Cambios">
            <IconButton   onClick={() => handleAdd()}    color= {!HSave ? "success":"inherit" } disabled={HSave} >
              <CheckBoxIcon />
            </IconButton >
          </Tooltip>
          <Tooltip title="Cancelar Cambios">
            <IconButton  onClick={() => handleCancel()} color= {!HCancel ? "error":"inherit" } disabled={HCancel} >
              <CancelPresentationIcon />
            </IconButton >
          </Tooltip>
        
  </Grid>
  </Grid>  



  <Grid container  spacing={1}>


   <Grid item xs={2} sm={2} md={2} lg={2}>
   <Typography sx={{ fontFamily: "sans-serif" }}>U.Resp:</Typography>
          <SelectFrag
            value={idUResp}
            options={ures}
            onInputChange={handleFilterChange1}
            placeholder={"Seleccione U.Resp"}
            label={""}
            disabled={HHeader}
          />
    </Grid> 



   <Grid item xs={2} sm={2} md={2} lg={2}>
          <Typography sx={{ fontFamily: "sans-serif" }}>Proveedor:</Typography>
          <SelectFrag
            value={idProveedor}
            options={provedores}
            onInputChange={handleFilterChange2}
            placeholder={"Seleccione Proveedor"}
            label={""}
            disabled={HHeader}
          />
    </Grid> 

    <Grid item xs={2} sm={2} md={2} lg={2}>
          <Typography sx={{ fontFamily: "sans-serif" }}>Proyecto:</Typography>
          <TextField
                    required
                    value={proyecto}
                    variant="standard"
                    onChange={(v) => setProyecto(v.target.value)}
                    disabled={HHeader}
                  />
    </Grid> 


    <Grid item xs={2} sm={2} md={2} lg={2}>
          <Typography sx={{ fontFamily: "sans-serif" }}>No. de Cuenta:</Typography>
          <TextField
                    required
                    value={numCuenta}
                    variant="standard"
                    onChange={(v) => setNumCuenta(v.target.value)}
                    disabled={HHeader}
                  />
    </Grid> 

    <Grid item xs={2} sm={2} md={2} lg={2}>
          <Typography sx={{ fontFamily: "sans-serif" }}>Concepto:</Typography>
          <SelectFrag
            value={claveCheque}
            options={conceptosCheque}
            onInputChange={handleFilterChange3}
            placeholder={"Seleccione Concepto"}
            label={""}
            disabled={HHeader}
          />
    </Grid> 


  </Grid>  




  <Grid container  >
  <Grid item xs={12} sm={12} md={12} lg={12}>
      <ToggleButtonGroup color="primary" exclusive aria-label="Platform"  disabled={HHeader}>
        <Tooltip title="Agregar Detalle">
          <ToggleButton value="check" onClick={() => handleDetalle({})} >
            <AddIcon />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
  </Grid>
  </Grid>


  <Grid container  >
  <Grid item xs={12} sm={12} md={12} lg={12}>
      <div
        style={{
          height: "58vh",
          width: "100%",
        }}
      >
        <ThemeProvider theme={theme}>
          <DataGrid
            columns={columnsParticipaciones}
            rows={data}
            density="compact"
            rowsPerPageOptions={[10, 25, 50, 100, 200, 300, 400]}
            disableSelectionOnClick
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            getRowHeight={() => "auto"}
            components={{ Toolbar: GridToolbar }}
            sx={{
              fontFamily: "Poppins,sans-serif",
              fontWeight: "600",
              "& .super-app.negative": {
                color: "rgb(84, 3, 3)",
                backgroundColor: "rgb(196, 40, 40, 0.384)",
              },
              "& .super-app.positive": {
                backgroundColor: "rgb(16, 145, 80, 0.567)",
              },
            }}
            componentsProps={{
              toolbar: {
                label: "buscar",
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            checkboxSelection
            onSelectionModelChange={(newSelectionModel: any) => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
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
            }}
          />
        </ThemeProvider> 
      </div>
  </Grid>
  </Grid>

  </Grid>



</div>
)
}