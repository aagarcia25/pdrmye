import {
  Box,
  Button,
  Checkbox,
  createTheme,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  ThemeProvider,
  ToggleButton,
  Tooltip,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import SelectValues from "../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../services/catalogosServices";
import SelectFrag from "../Fragmentos/SelectFrag";
import SendIcon from "@mui/icons-material/Send";
import { AlertS } from "../../../helpers/AlertS";
import { Moneda } from "../menu/CustomToolbar";
import { PERMISO, RESPONSE } from "../../../interfaces/user/UserInfo";
import { getPermisos, getToken, getUser } from "../../../services/localStorage";
import { DPCPServices } from "../../../services/DPCPServices";
import { Toast } from "../../../helpers/Toast";
import Slider from "../Slider";
import {
  DataGrid,
  GridSelectionModel,
  GridToolbar,
  esES as gridEsES,
} from "@mui/x-data-grid";
import { esES as coreEsES } from "@mui/material/locale";
import SpeisAdmin from "./SpeisAdmin";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ApprovalIcon from "@mui/icons-material/Approval";
import { ModalCheque } from "../componentes/ModalCheque";
import SelectFragMulti from "../Fragmentos/SelectFragMulti";
import { fmeses } from "../../../share/loadMeses";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import InsightsIcon from "@mui/icons-material/Insights";
import TrazabilidadSolicitud from "../TrazabilidadSolicitud";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Swal from "sweetalert2";
import { DAFServices } from "../../../services/DAFServices";
import axios from "axios";
import { CleaningServices } from "@mui/icons-material";

const AsigPago = () => {
  const theme = createTheme(coreEsES, gridEsES);
  const [slideropen, setslideropen] = useState(false);
  //MODAL
  //Constantes para llenar los select
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const [meses, setMeses] = useState<SelectValues[]>([]);
  const [mes, setMes] = useState<string>("");
  const [fondos, setFondos] = useState<[]>([]);
  const [municipio, setMunicipios] = useState<SelectValues[]>([]);
  const [tipos, setTipos] = useState<SelectValues[]>([]);
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [checked, setChecked] = React.useState(false);
  const [vrows, setVrows] = useState<{}>("");
  //Constantes de los filtros
  const [idtipo, setIdTipo] = useState("");
  const [idFondo, setIdFondo] = useState("");
  const [idMunicipio, setidMunicipio] = useState("");
  const [idestatus, setIdEstatus] = useState("");
  const [nombreMes, setNombreMes] = useState("");
  const [numOrdenPago, setNumOrdenPago] = useState("");
  //Constantes para las columnas
  const [data, setData] = useState([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  /// Permisos
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  ///// Modal de Administración de Speis
  const [openSpeis, setOpenSpeis] = useState(false);
  const [openCheque, setOpenCheque] = useState(false);
  const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
  const [agregarPoliza, setAgregarPoliza] = useState<boolean>(false);
  const [subirSpeis, setSubirSpeis] = useState<boolean>(false);

  /// trazabilidad

  const [openTraz, setOpenTraz] = useState(false);
  const [idSolicitud, setIdSolicitud] = useState<string>();

  const handleSpeis = (data: any) => {
    setOpenSpeis(true);
    setVrows(data);
  };

  const handlecheque = (data: any) => {
    setOpenCheque(true);
    setVrows(data);
  };
  const handleVerTazabilidad = (v: any) => {
    setOpenTraz(true);
    setIdSolicitud(v.row.NumOrdenPago);
  };
  const handleChangeMostrarTodo = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChecked(event.target.checked);
  };

  const handleclose = (data: any) => {
    handleClick();
    setOpenSpeis(false);
    setOpenCheque(false);
    setOpenTraz(false);
  };

  const handleAccion = (data: any) => {};

  const columnsParticipaciones = [
    { field: "id", hide: true },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Administración de SPEI´S">
              <IconButton onClick={() => handleSpeis(v)}>
                <FolderOpenIcon />
              </IconButton>
            </Tooltip>

            {agregarPoliza ? (
              String(v.row.NumCheque) === "null" ? (
                <Tooltip title="Agregar Póliza de Pago">
                  <IconButton onClick={() => handlecheque(v)}>
                    <ApprovalIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            {verTrazabilidad ? (
              <Tooltip title={"Ver Trazabilidad"}>
                <IconButton
                  value="check"
                  onClick={() => handleVerTazabilidad(v)}
                >
                  <InsightsIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
          </Box>
        );
      },
    },
    { field: "a2", headerName: "Estatus", width: 150, description: "Estatus" },
    {
      field: "a3",
      headerName: "Solicitud de Pago",
      width: 200,
      description: "Solicitud de Pago",
    },
    {
      field: "a4",
      headerName: "Póliza de Pago",
      width: 200,
      description: "Póliza de Pago",
    },
    {
      field: "a5",
      headerName: "Importe Total",
      width: 150,
      description: "Importe Total = Total Neto - (Retenciones + Descuentos)",
      ...Moneda,
    },
    {
      field: "a6",
      headerName: "Ejercicio",
      width: 80,
      description: "Ejercicio",
    },
    { field: "a7", headerName: "Mes", width: 100, description: "Mes" },
    //  {field: "ClaveEstado",      headerName: "Clave Estado",      width: 100,      description: "Clave Estado",    },
    {
      field: "a8",
      headerName: "Proveedor",
      width: 150,
      description: "Proveedor",
    },
    {
      field: "a9",
      headerName: "Descripción",
      width: 250,
      description: "Descripción",
    },
    {
      field: "a10",
      headerName: "Total Neto",
      width: 150,
      description: "Total Neto",
      ...Moneda,
    },
    {
      field: "a11",
      headerName: "Retenciones",
      width: 150,
      description: "Retenciones",
      ...Moneda,
    },
    {
      field: "a12",
      headerName: "Descuentos",
      width: 150,
      description: "Descuentos",
      ...Moneda,
    },
  ];

  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion === 31) {
        setFondos(res.RESPONSE);
      } else if (operacion === 32) {
        setMunicipios(res.RESPONSE);
      } else if (operacion === 17) {
        setTipos(res.RESPONSE);
      }
    });
  };

  const handleFilterChange1 = (v: string) => {
    setIdTipo(v);
  };

  const handleFilterChange2 = (v: string) => {
    setIdFondo(v);
  };

  const handleFilterChange3 = (v: string) => {
    setidMunicipio(v);
  };

  const handleSelectMes = (data: any) => {
    setNombreMes(
      meses.find(({ value }) => value === data)?.label === undefined
        ? ""
        : String(meses.find(({ value }) => value === data)?.label)
    );

    setMes(data);
  };

  const ProcesaSPeis = (event: React.ChangeEvent<HTMLInputElement>) => {
    let encontrados: any[] = [];
    let noencontrados: any[] = [];
    let fueradesstatus: any[] = [];
    let rows = data;

    if (rows.length === 0) {
      AlertS.fire({
        title: "Error!",
        text: "Favor de realizar la búsqueda de Registros, primero",
        icon: "error",
      });
    } else {
      let counfiles = event?.target?.files?.length;
      //Recorremos los registros de la busqueda

     
        rows.map((item: any, index) => {
          //      console.log(item.a3 + 'index' + index);

          for (let i = 0; i < Number(counfiles); i++) {
            let file = event?.target?.files?.[i] || "";
            let namefile = event?.target?.files?.[i].name || "";
            
          if (item.a2.includes("Pendiente de Spei")) {
            if (namefile.includes(item.a3)) {
              rows = rows.filter((items) => !item);
              encontrados.push({ Archivo: file, Registro: item });
            } else {
              noencontrados.push(item.a3);
            }
          } else {
            fueradesstatus.push(item.a3);
          }

        }

        });


     

      

      let a2 = noencontrados.filter((elemento, index) => {
        return noencontrados.indexOf(elemento) === index;
      });

      let a1 = encontrados.filter((elemento, index) => {
        return encontrados.indexOf(elemento) === index;
      });
      let html = "";
      if (a1.length === 0) {
        AlertS.fire({
          title: "Error!",
          text: "No se encontraron registros",
          icon: "error",
        });
      } else {
        html =
          "Archivos Encontrados <b>" + a1.length + " de  " + counfiles + "</b>";
        html = html + "<br>";
        //html =
        //html + "Registros con el mismo numero de solicitud: <b>" + 0 + "</b>";
        //html = html + "<br>";
        html = html + "¿Desea procesarlos?";
        let count = 0;
        Swal.fire({
          icon: "info",
          title: "Infomación",
          footer: "Esta operación puede demorar un poco",
          html: html,
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            setslideropen(true);
            let peticiones: any[] = [];
            encontrados.map((item: any) => {
              const formData = new FormData();
              formData.append("SPEI", item.Archivo);
              formData.append("NUMOPERACION", "1");
              formData.append("IDPROV", item.Registro.id);
              formData.append("CHUSER", user.id);
              formData.append("TPROV", item.Registro.a17);
              formData.append("TOKEN", JSON.parse(String(getToken())));
              let p = axios.post(
                process.env.REACT_APP_APPLICATION_BASE_URL +
                  "SpeiAdministracion",
                formData,
                {
                  headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "Access-Control-Allow-Origin": "*",
                  },
                }
              );
              peticiones.push(p);
            });

            axios.all(peticiones).then((resposeArr) => {
              resposeArr.map((item) => {
                if (item.data.SUCCESS) {
                  count++;
                } else {
                  count--;
                }
              });

              Swal.fire({
                icon: "success",
                title: "Información",
                text: "registros procesados " + count,
                confirmButtonText: "Ok",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleClick();
                }
              });
            });
          } else {
            AlertS.fire({
              title: "Información",
              text: "Operación Cancelada",
              icon: "error",
            });
          }
        });
      }
    }
  };

  const handleClick = () => {
    setslideropen(true);
    let data = {
      TIPO: 4,
      P_FONDO: idFondo.length > 0 ? idFondo : "",
      P_IDMUNICIPIO: idMunicipio === "false" ? "" : idMunicipio,
      P_IDESTATUS: idestatus === "false" ? "" : idestatus,
      P_IDMES: mes === "false" ? "" : mes,
      P_SOLICITUDPAGO: numOrdenPago ? numOrdenPago : "",
      P_MOSTRARTODOS: checked,
    };
    DPCPServices.GetParticipaciones(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setData(res.RESPONSE);
        setslideropen(false);
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
        setslideropen(false);
      }
    });
  };

  useEffect(() => {
    setMeses(fmeses());
    loadFilter(31);
    loadFilter(32);
    loadFilter(17);
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "DAFADMINPAG") {
        if (String(item.Referencia) === "TRAZASPEIDAF") {
          setVerTrazabilidad(true);
          // setAnchoAcciones(anchoAcciones+50)
        }
        if (String(item.Referencia) === "POLIZASPEIDAF") {
          setAgregarPoliza(true);
          // setAnchoAcciones(anchoAcciones+50)
        }

        if (String(item.Referencia) === "DAFSUBIRSPEI") {
          setSubirSpeis(true);
          // setAnchoAcciones(anchoAcciones+50)
        }
      }
    });
  }, []);

  return (
    <>
      <Slider open={slideropen}></Slider>
      <div>
        <Grid container spacing={1} padding={2}>
          <Grid container item spacing={1}  xs={12} sm={12} md={12} lg={12}>
            <Grid container sx={{ justifyContent: "center" }}>
              <Grid container item xs={10} sx={{ textAlign: "center" }}>
                <Typography variant="h4" paddingBottom={2}>
                  Módulo de Administración Financiera
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Solicitud de Pago:
              </Typography>
              <FormControl sx={{ width: "100%" }}>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={"text"}
                  size="small"
                  fullWidth
                  placeholder="Solicitud de Pago"
                  onChange={(v) => setNumOrdenPago(v.target.value.trim())}
                  value={numOrdenPago}
                  inputProps={{ maxLength: 10 }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Tooltip title={"Limpiar campo"}>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setNumOrdenPago("")}
                          edge="end"
                          disabled={!numOrdenPago}
                        >
                          <ClearOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  }
                  error={String(Number(numOrdenPago)) === "NaN"}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={2}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Proveedor:
              </Typography>
              <SelectFrag
                value={idMunicipio}
                options={municipio}
                onInputChange={handleFilterChange3}
                placeholder={"Seleccione Proveedor"}
                label={""}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Fondo:</Typography>
              <SelectFragMulti
                options={fondos}
                onInputChange={handleFilterChange2}
                placeholder={"Seleccione Fondo(s)"}
                label={""}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Mes :</Typography>
              <SelectFrag
                value={mes}
                options={meses}
                onInputChange={handleSelectMes}
                placeholder={"Seleccione Mes"}
                label={""}
                disabled={false}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
            <Grid item xs={2} sm={2} md={2} lg={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChangeMostrarTodo}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Mostrar Todo"
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} paddingBottom={2}>
            <Button
              onClick={handleClick}
              variant="contained"
              color="success"
              endIcon={<SendIcon sx={{ color: "white" }} />}
            >
              <Typography sx={{ color: "white" }}> Buscar </Typography>
            </Button>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} paddingBottom={2}>
            {subirSpeis ? (
              <Tooltip title={"Cargar SPEI's"}>
                <ToggleButton value="check">
                  <IconButton
                    color="primary"
                    aria-label="upload documento"
                    component="label"
                    size="small"
                  >
                    <input
                      multiple
                      hidden
                      accept=".pdf"
                      type="file"
                      value=""
                      onChange={(v) => ProcesaSPeis(v)}
                    />
                    <FileUploadIcon />
                  </IconButton>
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}
          </Grid>

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
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  disableSelectionOnClick
                  disableColumnFilter
                  disableColumnSelector
                  disableDensitySelector
                  getRowHeight={() => "auto"}
                  getRowClassName={(params) => {
                    if (params.row.Presupuesto == null) {
                      return "";
                    }
                    return clsx("super-app", {
                      negative: params.row.Presupuesto !== params.row.total,
                      positive: params.row.Presupuesto == params.row.total,
                    });
                  }}
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
                      label: "Buscar",
                      showQuickFilter: true,

                      quickFilterProps: { debounceMs: 500 },

                      csvOptions: {
                        fileName: "Distribucion",
                        utf8WithBom: true,
                      },
                    },
                  }}
                  checkboxSelection={checkboxSelection}
                  onSelectionModelChange={(newSelectionModel: any) => {
                    setSelectionModel(newSelectionModel);
                  }}
                  selectionModel={selectionModel}
                  localeText={{
                    noRowsLabel: "No se ha encontrado datos.",
                    noResultsOverlayLabel:
                      "No se ha encontrado ningún resultado",
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
                    checkboxSelectionSelectAllRows:
                      "Seleccionar todas las filas",
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
                      count > 1
                        ? `${count} filtros activos`
                        : `${count} filtro activo`,
                    columnHeaderFiltersLabel: "Mostrar filtros",
                    columnHeaderSortIconLabel: "Ordenar",
                  }}
                />
              </ThemeProvider>
            </div>
          </Grid>
        </Grid>
      </div>

      {openSpeis ? (
        <SpeisAdmin
          handleClose={handleclose}
          handleAccion={handleAccion}
          vrows={vrows}
        />
      ) : (
        ""
      )}
      {openCheque ? (
        <ModalCheque tipo={1} handleClose={handleclose} vrows={vrows} />
      ) : (
        ""
      )}
      {openTraz ? (
        <TrazabilidadSolicitud
          dt={{ TIPO: 3, SP: idSolicitud }}
          open={openTraz}
          handleClose={handleclose}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default AsigPago;
