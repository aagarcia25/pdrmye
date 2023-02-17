import {
  Button,
  ButtonGroup,
  createTheme,
  Grid,
  IconButton,
  InputAdornment,
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
import Swal from "sweetalert2";
import { red } from "@mui/material/colors";
import MUIXDataGridMun from "../MUIXDataGridMun";
import { Toast } from "../../../helpers/Toast";
import { AlertS } from "../../../helpers/AlertS";
import { DAMOPServices } from "../../../services/DAMOPServices";
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import { indexCabecera } from "../../../interfaces/Damop/ResponseDAMOP";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
export const ORGHeader = ({
  dataCabecera,
  modo,
  handleClose
}: {
  dataCabecera: any;
  modo: string;
  handleClose: Function;


}) => {
  var setFalse: false;
  const dataCab: indexCabecera = dataCabecera?.row;
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
  const [totalHeader, setTotalHeader] = useState<string>("0");

  const [numCuenta, setNumCuenta] = useState<string>('');
  const [observaciones, setObservaciones] = useState<string>('');


  const [HDetalle, setHDetalle] = useState<boolean>(true);
  const [HHeader, setHHeader] = useState<boolean>(true);
  const [HCancel, setHCancel] = useState<boolean>(true);
  const [HSave, setHSave] = useState<boolean>(true);
  const [HAdd, setHAdd] = useState<boolean>(false);
  const [HEdit, setHEdit] = useState<boolean>(true);


  //////////////////////////

  const [listConceptos, setListConceptos] = useState<SelectValues[]>([]);
  const [descripcion, setDescripcion] = useState<string>();
  const [importe, setImporte] = useState<string>();
  const [claveConcepto, setClaveConcepto] = useState<string>("");


  ////////////////////// banderas de steps
  const [agregarDetalle, setAgregarDetalle] = useState<boolean>(false);
  const [limpiar, setLimpiar] = useState<boolean>(false);
  const [regGuardado, SetRegGuardado] = useState<boolean>(false);
  const [openDetalles, SetOpenDetalles] = useState<boolean>(false);
  const [openAgregarDetalle, setOpenAgregarDetalle] = useState<boolean>(false);






  // Constantes para los campos
  const [idUResp, setidUResp] = useState('');
  const [idProveedor, setidProveedor] = useState("");
  const [conCheque, setConCheque] = useState("");


  //Constantes para las columnas
  const [data, setData] = useState([]);

  const handleEditar = () => {
    setHHeader(false);
    setHDetalle(true);
    setHCancel(false);
    setHSave(false);

  }



  const handleFilterChange1 = (v: string) => {
    setidUResp(v);
  };

  const handleFilterChange2 = (v: string) => {
    setidProveedor(v);
  };

  const handleFilterChange3 = (v: string) => {
    setConCheque(v);
  };

  const handleDetalle = (data: any) => {
    setAgregarDetalle(true);
  };


  const handleAdd = () => {
    setAgregarDetalle(true);
  };
  const handleCloseHeader = () => {
    SetOpenDetalles(false);
  };



  const handleGuardarSolicitud = () => {

    let data = {
      // IDREG: idReg,
      NUMOPERACION: 1,
      CHUSER: user.id,
      IDORGANISMO: idProveedor,
      // IDSTATUS:        ,
      CONCHEQUE: conCheque,
      OBSERVACIONES: observaciones,
      NUMPROYECTO: proyecto,
      IDURESP: idUResp,
      CUENTA: numCuenta,
    }

    Swal.fire({
      icon: "warning",
      title: "Guardar cambios de registro actual",
      text: "",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        DAMOPServices.indexCabecera(data).then((res) => {
          if (res.SUCCESS) {
            // setTotalRetenciones((totalRetenciones) + (importe));
            // setDescRet("");
            // setValRet("");
            // setIdRetencion("")
            // setImporte(0)
            // consulta("add");
            // setOpenModalDes(false)
            // setNumOperacion("");
            // setClaveRet("");
            // setEditar(false);

            SetRegGuardado(true);
            handleClose();
            Toast.fire({
              icon: "success",
              title: "Cabecera Agregada!",
            });
          } else {
            AlertS.fire({
              title: "Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });
      }
    });

  };

  const handleAdminDetalles = () => {
    // SetOpenDetalles(true);
    setOpenAgregarDetalle(true);


  };


  const handleCloseAñadirDetalle = () => {
    // SetOpenDetalles(true);
    setOpenAgregarDetalle(false);

  };

  const handleCancel = () => {
    if (modo === "Nuevo") {
      setidUResp('');
      setidProveedor("");
      setProyecto("");
      setNumCuenta("");
      setConCheque("");
      setAgregarDetalle(false);
      setLimpiar(false)

    }
    else {

      setHHeader(true);
      setHDetalle(true);
      setHCancel(true);
      setHSave(true);
      setHAdd(false);
      setHEdit(true);
    }
    // handleFilterChange1();


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
      } else if (tipo === 27) {
        setProvedores(res.RESPONSE);
        setOpenSlider(false);
      } else if (tipo === 29) {
        setConceptosCheque(res.RESPONSE);
      }
    });
  };


  useEffect(() => {

    if (modo === "Nuevo") {
      setLimpiar(true);
      setHHeader(false);
      setHDetalle(true);
      setHCancel(false);
      setHSave(false);
      setHEdit(true);
      setHAdd(true);
    }
    if (modo === "Ver") {


      setidUResp(dataCab.IdUres);
      setidProveedor(dataCab.IdOrg);
      setProyecto(dataCab.NumProyecto);
      setNumCuenta(dataCab.Cuenta);
      setObservaciones(dataCab.Observaciones);
      setTotalHeader(dataCab.total);


    }

    loadFilter(29);
    loadFilter(26);
    loadFilter(27);
  }, [agregarDetalle]);


  return (
    <div>

      {openDetalles ?
        <ORGDetail idrow={""} handleClose={handleCloseHeader} />
        :
        ""
      }

      <ModalForm title={"Cabecera de Aportaciones"} handleClose={handleClose}>
        <Slider open={openSlider}></Slider>
        <Grid container  >

          <Grid container paddingBottom={1} >
            <Grid item xs={12} sm={12} md={12} lg={12}>

              <ButtonGroup size="large">
                <Tooltip title="Editar Registro">
                  <Button onClick={() => handleEditar()} color={!HEdit ? "info" : "inherit"} disabled={HEdit} >
                    <ModeEditOutlineIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Grabar Cambios">
                  <Button onClick={() => handleGuardarSolicitud()} color={!HSave
                    ? "success" : "inherit"} disabled={
                      regGuardado
                      || HSave
                      || idUResp === ""
                      || idUResp === "false"
                      || idProveedor === ""
                      || idProveedor === "false"
                      || proyecto === ""
                      || String(Number(proyecto)) === "NaN"
                      || numCuenta === ""
                      || String(Number(numCuenta)) === "NaN"
                      || conCheque === ""
                      || conCheque === "false"
                      || agregarDetalle
                    } >
                    <CheckBoxIcon />
                  </Button  >
                </Tooltip>
                <Tooltip title="Cancelar Cambios">
                  <Button onClick={() => handleCancel()} color={!HCancel ? "error" : "inherit"} disabled={HCancel || regGuardado} >
                    <CancelPresentationIcon />
                  </Button  >
                </Tooltip>
              </ButtonGroup>


            </Grid>
          </Grid>

          <Grid container justifyContent="space-between"
            sx={{ bgcolor: (!regGuardado || !agregarDetalle ? "rgb(255, 255, 255) " : "rgba(225, 225, 225, 0.264) "), }}>

            <Grid item xs={12} sm={12} md={5.8} lg={2.9}>
              <label className="textoNormal">U.Resp:</label>

              <SelectFrag
                value={idUResp}
                options={ures}
                onInputChange={handleFilterChange1}
                placeholder={"Seleccione U.Resp"}
                label={""}
                disabled={HHeader || agregarDetalle || regGuardado}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={5.8} lg={2.9}>
              <label className="textoNormal">Proveedor:</label>

              <SelectFrag
                value={idProveedor}
                options={provedores}
                onInputChange={handleFilterChange2}
                placeholder={"Seleccione Proveedor"}
                label={""}
                disabled={HHeader || agregarDetalle || regGuardado} />
            </Grid>

            <Grid item xs={12} sm={5.5} md={5.8} lg={2}>
              <label className="textoNormal">Proyecto:</label>

              <TextField
                required
                value={proyecto}
                fullWidth
                variant="outlined"
                type="text"
                onChange={(v) => setProyecto(v.target.value)}
                disabled={HHeader || agregarDetalle || regGuardado}
                inputProps={{ maxLength: 7 }}
                error={String(Number(proyecto)) === "NaN"}


              />
            </Grid>


            <Grid item xs={12} sm={5.5} md={5.8} lg={2}>
              <label className="textoNormal">No. de Cuenta:</label>
              <TextField
                required
                value={numCuenta}
                variant="outlined"
                fullWidth
                onChange={(v) => setNumCuenta(v.target.value)}
                disabled={HHeader || agregarDetalle || regGuardado}
                inputProps={{ maxLength: 18 }}
                error={String(Number(numCuenta)) === "NaN"}
              />
            </Grid>

            <Grid item xs={12} sm={5.5} md={5.8} lg={2}>
              <label className="textoNormal">Total:</label>
              <TextField
                required
                value={"$ " + totalHeader}
                fullWidth
                variant="outlined"
                type="text"
                disabled
                inputProps={{ maxLength: 7 }}

              />
            </Grid>

            <Grid item xs={12} sm={5.5} md={5.8} lg={3}>
              <label className="textoNormal">Concepto:</label>
              <SelectFrag
                value={conCheque}
                options={conceptosCheque}
                onInputChange={handleFilterChange3}
                placeholder={"Seleccione Concepto"}
                label={""}
                disabled={HHeader || agregarDetalle || regGuardado}
              />
            </Grid>
            {dataCab?.Anio && dataCab?.Mes ?
              <Grid item xs={12} sm={5.5} lg={1} paddingTop={3} paddingBottom={3} >
                <label className="textoNormal">{"Año: " + dataCab?.Anio}</label>
                <br />
                <label className="textoNormal">{"Mes: " + dataCab?.Mes}</label>
              </Grid>
              : ""
            }


            <Grid item xs={12} lg={7.7} >
              <label className="textoNormal">Observaciones:</label>

              <TextField
                required
                value={observaciones}
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                onChange={(v) => setObservaciones(v.target.value)}
                disabled={HHeader || agregarDetalle || regGuardado}
                inputProps={{ maxLength: 300 }}
              />
            </Grid>

          </Grid>

          {modo === "Ver" ?
            <Grid container  >

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div
                  style={{
                    height: "58vh",
                    width: "100%",
                  }}
                >

                  <Grid item container direction="row" justifyContent="space-between" xs={12} paddingTop={3}>
                    <Tooltip title="Agregar detalle">
                      <ToggleButton disabled={openAgregarDetalle} className="guardar" value="check" onClick={() => handleAdminDetalles()}>
                        <AddIcon />
                      </ToggleButton>
                    </Tooltip>

                    <Tooltip title="Agregar detalle">
                      <ToggleButton disabled={!openAgregarDetalle} className="cerrar" value="check" onClick={() => handleCloseAñadirDetalle()}>
                        <CloseOutlinedIcon />
                      </ToggleButton>
                    </Tooltip>
                  </Grid>

                  {!openAgregarDetalle ?
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
                    </ThemeProvider> :

                    <div>
                      <Slider open={openSlider}></Slider>
                      <Grid container spacing={1} padding={0} paddingTop={6}>
                        <Grid container justifyContent="space-around">
                          <Grid item xs={6} sm={4} md={2} lg={2}>
                            <Typography sx={{ fontFamily: "sans-serif" }}>
                              Cpto de egreso:
                            </Typography>
                            <SelectFrag
                              value={claveConcepto}
                              options={listConceptos}
                              onInputChange={handleFilterChange2}
                              placeholder={"Seleccione Cpto de"}
                              label={""} disabled={false} />

                            <Typography sx={{ fontFamily: "sans-serif" }} paddingTop={2}>
                              Parcial a Pagar:
                            </Typography>
                            <TextField
                              required
                              value={importe}
                              variant="outlined"
                              onChange={(v) => setImporte(v.target.value)}
                              InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,

                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={12} md={8} lg={8}>
                            <Typography sx={{ fontFamily: "sans-serif" }}>
                              Descripción:
                            </Typography>
                            <TextField
                              required
                              fullWidth
                              spellCheck="true"
                              rows={5}
                              multiline
                              onChange={(v) => setDescripcion(v.target.value)}
                              style={{ width: "100%" }}

                            />
                          </Grid>
                        </Grid>
                        <Typography sx={{ fontFamily: "sans-serif" }}>
                          Clasificadores:
                        </Typography>

                        <Grid container spacing={1} paddingBottom={5}>
                          <Grid item xs={1} sm={1} md={1} lg={1}>
                            <TextField
                              hiddenLabel
                              id="Clasificador01"
                              variant="outlined"
                              size="small"
                              label="Administrativo"

                            />
                          </Grid>
                          <Grid item xs={1} sm={1} md={1} lg={1}>
                            <TextField
                              hiddenLabel
                              id="Clasificador02"
                              variant="outlined"
                              size="small"
                              label="Funcional"

                            />
                          </Grid>
                          <Grid item xs={1} sm={1} md={1} lg={1}>
                            <TextField
                              hiddenLabel
                              id="Clasificador03"
                              variant="outlined"
                              size="small"
                              label="Programatico"

                            />
                          </Grid>
                          <Grid item xs={1} sm={1} md={1} lg={1}>
                            <TextField
                              hiddenLabel
                              id="Clasificador04"
                              variant="outlined"
                              size="small"
                              label="Objeto del Gasto"

                            />
                          </Grid>
                          <Grid item xs={1} sm={1} md={1} lg={1}>
                            <TextField
                              hiddenLabel
                              id="Clasificador05"
                              variant="outlined"
                              size="small"
                              label="Tipo de Gasto"

                            />
                          </Grid>
                          <Grid item xs={1} sm={1} md={1} lg={1}>
                            <TextField
                              hiddenLabel
                              id="Clasificador06"
                              variant="outlined"
                              size="small"
                              label="fuente de finmanciamiento"

                            />
                          </Grid>
                          <Grid item xs={1} sm={1} md={1} lg={1}>
                            <TextField
                              hiddenLabel
                              id="Clasificador07"
                              variant="outlined"
                              size="small"
                              label="ramo"
                            />
                          </Grid>
                          <Grid item xs={1} sm={1} md={1} lg={1}>
                            <TextField
                              hiddenLabel
                              id="Clasificador08"
                              variant="outlined"
                              size="small"
                              label="Año"

                            />
                          </Grid>
                          <Grid item xs={1} sm={1} md={1} lg={1}>
                            <TextField
                              hiddenLabel
                              id="Clasificador09"
                              variant="outlined"
                              size="small"
                              label="Control Interno"

                            />
                          </Grid>
                          <Grid item xs={1} sm={1} md={1} lg={1}>
                            <TextField
                              hiddenLabel
                              id="Clasificador10"
                              variant="outlined"
                              size="small"
                              label="Área Geografica"

                            />
                          </Grid>
                          <Grid item xs={1} sm={1} md={1} lg={1}>
                            <TextField
                              hiddenLabel
                              id="Clasificador11"
                              variant="outlined"
                              size="small"
                              label="Proy / Programa"

                            />
                          </Grid>
                          <Grid item xs={1} sm={1} md={1} lg={1}>

                          </Grid>


                        </Grid>

                        <Grid paddingTop={6}
                          item container justifyContent="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
                          <Tooltip title="Guardar Detalle">
                            <Button value="check" onClick={() => handleDetalle({})} className={"guardar"}>
                              Guardar
                            </Button>
                          </Tooltip>
                        </Grid>
                      </Grid>

                    </div>

                  }


                </div>
              </Grid>
            </Grid>
            :
            ""}

        </Grid>
      </ModalForm>

    </div>
  )
}