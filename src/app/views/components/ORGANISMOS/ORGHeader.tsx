import {
  Box,
  Button,
  ButtonGroup,
  createTheme,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import React, { useEffect, useState } from "react";
import SelectValues from "../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../services/catalogosServices";
import SelectFrag from "../Fragmentos/SelectFrag";
import { currencyFormatter, Moneda, } from "../menu/CustomToolbar";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Slider from "../Slider";
import { DataGrid, GridSelectionModel, GridToolbar, esES as gridEsES, } from "@mui/x-data-grid";
import { esES as coreEsES } from "@mui/material/locale";
import ModalForm from "../componentes/ModalForm";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import { Toast } from "../../../helpers/Toast";
import { AlertS } from "../../../helpers/AlertS";
import { DAMOPServices } from "../../../services/DAMOPServices";
import { indexCabecera, indexDetalle } from "../../../interfaces/Damop/ResponseDAMOP";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import { getUser } from "../../../services/localStorage";

export const ORGHeader = ({
  dataCabecera,
  modo,
  handleClose
}: {
  dataCabecera: any;
  modo: string;
  handleClose: Function;


}) => {

  const dataCab: indexCabecera = dataCabecera?.row;
  const theme = createTheme(coreEsES, gridEsES);
  const user: RESPONSE = JSON.parse(String(getUser()));

  const [openSlider, setOpenSlider] = useState(true);
  //Constantes para llenar los select
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [sumaTotalDetalle, setSumaTotalDetalle] = useState<Number>(0);

  const [ures, setURes] = useState<SelectValues[]>([]);
  const [provedores, setProvedores] = useState<SelectValues[]>([]);
  const [conceptosCheque, setConceptosCheque] = useState<SelectValues[]>([]);
  const [modoDetalle, setModoDetalle] = useState<string>("");
  const [proyecto, setProyecto] = useState<string>('');
  const [totalHeader, setTotalHeader] = useState<string>("0");
  const [numCuenta, setNumCuenta] = useState<string>('');
  const [observaciones, setObservaciones] = useState<string>('');
  const [HHeader, setHHeader] = useState<boolean>(true);
  const [HCancel, setHCancel] = useState<boolean>(true);
  const [HSave, setHSave] = useState<boolean>(true);
  const [HAdd, setHAdd] = useState<boolean>(false);
  const [HEdit, setHEdit] = useState<boolean>(true);

  ////////////////////// banderas de steps
  const [agregarDetalle, setAgregarDetalle] = useState<boolean>(false);
  const [limpiar, setLimpiar] = useState<boolean>(false);
  const [regGuardado, SetRegGuardado] = useState<boolean>(false);
  const [openAgregarDetalle, setOpenAgregarDetalle] = useState<boolean>(false);


  // Constantes para los campos
  const [idUResp, setidUResp] = useState('');
  const [idTipoSolicitud, setIdTipoSolicitud] = useState('');
  const [idProveedor, setidProveedor] = useState("");
  const [conCheque, setConCheque] = useState("");


  //Constantes para las columnas
  const [data, setData] = useState([]);
  const [dataDetalles, setDataDetalles] = useState([]);

  ////////////// clasificadores detalle
  const [listConceptos, setListConceptos] = useState<SelectValues[]>([]);
  const [verDetalle, setVerDetalle] = useState<boolean>(false);
  const [idClaveConcepto, setIdClaveConcepto] = useState<string>("");
  const [idDetalleCabecera, setIdDetalleCabecera] = useState<string>("");
  const [idOrg, setIdOrg] = useState<string>("");
  const [importe, setImporte] = useState<string>();
  const [descripcion, setDescripcion] = useState<string>();
  const [adminDetalle, setAdminDetalle] = useState<string>('');
  const [funcionalDetalle, setFuncionalDetalle] = useState<string>('');
  const [programaticoDetalle, setProgramaticoDetalle] = useState<string>('');
  const [objGastoDetalle, setObjGastoDetalle] = useState<string>('');
  const [tipoGastoDetalle, setTipoGastoDetalle] = useState<string>('');
  const [fuenteFinanDetalle, setFuenteFinanDetalle] = useState<string>('');
  const [ramoDetalle, setRamoDetalle] = useState<string>('');
  const [anioDetalle, setAnioDetalle] = useState<string>('');
  const [controlInternoDetalle, setControlInternoDetalle] = useState<string>('');
  const [AreaGeoDetalle, setAreaGeoDetalle] = useState<string>('');
  const [proyProgramaDetalle, setProyProgramDetalle] = useState<string>('');

  /////////////////////////////// banderas de detalles para edicion
  const [editarDetalle, setEditarDetalle] = useState<boolean>(false);
  const [DetalleEditar, setDetalleEditar] = useState<boolean>(true);
  const [DetalleAgregar, setDetalleAgregar] = useState<boolean>(true);
  const [DetalleLimpiar, setDetalleLimpiar] = useState<boolean>(true);

  const handleEditar = () => {
    setOpenAgregarDetalle(false);
    handleCloseAñadirDetalle();
    setHHeader(false);
    setHCancel(false);
    setHSave(false);
  }

  const handleEditarDetalles = () => {
    setModoDetalle("Editar");
    setEditarDetalle(true);
    setDetalleEditar(true);
    setDetalleAgregar(false);
    setAgregarDetalle(false);
    setDetalleLimpiar(false);

  }

  const handleCancelarCambiosDetalle = () => {
    setEditarDetalle(false);
    handleDetallesCabecera(dataDetalles);
  }

  const handleFilterChange1 = (v: string) => {
    setidUResp(v);
  };

  const handleTipoSolicitud = (v: string) => {
    setIdTipoSolicitud(v);
  };

  const handleFilterChange2 = (v: string) => {
    setidProveedor(v);
  };
  const handleChangeCptoEgreso = (v: string) => {
    setIdClaveConcepto(v);
  };

  const handleFilterChange3 = (v: string) => {
    setConCheque(v);
  };

  const handleAgregarDetalle = () => {

    let data = {
      NUMOPERACION: editarDetalle ? 2 : 1,
      CHUSER: user.id,
      CHID: dataCab?.id ? dataCab?.id : "",
      DESCRIPCION: String(descripcion).trim(),
      importe: importe,
      Clasificador01: adminDetalle,
      Clasificador02: funcionalDetalle,
      Clasificador03: programaticoDetalle,
      Clasificador04: objGastoDetalle,
      Clasificador05: tipoGastoDetalle,
      Clasificador06: fuenteFinanDetalle,
      Clasificador07: ramoDetalle,
      Clasificador08: anioDetalle,
      Clasificador09: controlInternoDetalle,
      Clasificador10: AreaGeoDetalle,
      Clasificador11: proyProgramaDetalle,
      ConceptoEgreso: idClaveConcepto,
      IDDETALLE: idDetalleCabecera,
      IDORG: idOrg

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
        DAMOPServices.indexDetalle(data).then((res) => {
          if (res.SUCCESS) {
            Consulta();
            // SetRegGuardado(true);
            handleCloseAñadirDetalle();

            Toast.fire({
              icon: "success",
              title: "Detalle Agregado!",
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

  const handleBorrarDetalle = (v: any) => {
    let data = {
      NUMOPERACION: 3,
      CHUSER: user.id,
      IDDETALLE: v.row.id,
      IDORG: v.row.idORG
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
        DAMOPServices.indexDetalle(data).then((res) => {
          if (res.SUCCESS) {
            SetRegGuardado(true);
            handleCloseAñadirDetalle();
            Consulta();
            // handleClose();
            Toast.fire({
              icon: "success",
              title: "Cabecera Editada!",
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

  const handleCancelarCambios = () => {


    setOpenAgregarDetalle(false);
    setidUResp(dataCab.IdUres);
    setidProveedor(dataCab.IdOrg);
    setProyecto(dataCab.NumProyecto);
    setNumCuenta(dataCab.Cuenta);
    setObservaciones(dataCab.Observaciones);
    setTotalHeader(dataCab.total);
    setConCheque(dataCab.IdConCheque);
    setHEdit(false);
    setHHeader(true);
    setHCancel(true);
    setHSave(true);
    setHAdd(false);
    handleLimpiarCamposHeader();
  };


  const handleGuardarSolicitud = () => {
    let data = {
      CHID: dataCab?.id ? dataCab?.id : "",
      NUMOPERACION: modo === "Ver" ? 2 : 1,
      CHUSER: user.id,
      IDORGANISMO: idProveedor,
      CONCHEQUE: conCheque,
      OBSERVACIONES: String(observaciones).trim(),
      NUMPROYECTO: proyecto,
      IDURESP: idUResp,
      CUENTA: numCuenta,
      TIPOSOLICITUD: idTipoSolicitud,
      ESTATUS: "DAMOP_ORG_ING_OP"
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
            SetRegGuardado(true);
            handleClose();
            handleCloseAñadirDetalle();
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



  const handleDetallesCabecera = (v: any) => {
    setModoDetalle("Ver");
    setDetalleAgregar(true);
    setDetalleLimpiar(true);
    setDetalleEditar(false)

    setDataDetalles(v);
    handleAgregarDetalles();
    setIdClaveConcepto(v.row.ConceptoEgreso);
    setImporte(v.row.importe);
    setDescripcion(v.row.Descripcion);
    setAdminDetalle(v.row.Clasificador01);
    setFuncionalDetalle(v.row.Clasificador02);
    setProgramaticoDetalle(v.row.Clasificador03);
    setObjGastoDetalle(v.row.Clasificador04);
    setTipoGastoDetalle(v.row.Clasificador05);
    setFuenteFinanDetalle(v.row.Clasificador06);
    setRamoDetalle(v.row.Clasificador07);
    setAnioDetalle(v.row.Clasificador08);
    setControlInternoDetalle(v.row.Clasificador09);
    setAreaGeoDetalle(v.row.Clasificador10);
    setProyProgramDetalle(v.row.Clasificador11);
    setVerDetalle(true);
    setIdDetalleCabecera(v.row.id);
    setIdOrg(v.row.idORG);

  };

  const handleAgregarDetalles = () => {
    setModoDetalle("Agregar");
    // setEditarDetalle(true)
    setDetalleAgregar(false)
    setDetalleLimpiar(false)
    setOpenAgregarDetalle(true);
    setidUResp(dataCab.IdUres);
    setidProveedor(dataCab.IdOrg);
    setProyecto(dataCab.NumProyecto);
    setNumCuenta(dataCab.Cuenta);
    setObservaciones(dataCab.Observaciones);
    setTotalHeader(dataCab.total);
    setConCheque(dataCab.IdConCheque);
    setHEdit(false);
    setHHeader(true);
    setHCancel(true);
    setHSave(true);
    setHAdd(false);


  };


  const handleCloseAñadirDetalle = () => {

    setOpenAgregarDetalle(false);
    setIdClaveConcepto("");
    setImporte("");
    setDescripcion("");
    setAdminDetalle("");
    setFuncionalDetalle("");
    setProgramaticoDetalle("");
    setObjGastoDetalle("");
    setTipoGastoDetalle("");
    setFuenteFinanDetalle("");
    setRamoDetalle("");
    setAnioDetalle("");
    setControlInternoDetalle("");
    setAreaGeoDetalle("");
    setProyProgramDetalle("");
    setVerDetalle(false);
    setEditarDetalle(false);
    // handleCancelarCambiosDetalle();

  };


  const handleLimpiarCamposDetalle = () => {
    if (modoDetalle === "Editar") {

        setDescripcion("");

        if (dataCab.orden < 16) {
          setImporte("");
          
        }
    } else if (modoDetalle === "Agregar") {
      // setListConceptos("");
      setIdClaveConcepto("");
      setIdDetalleCabecera("");
      setIdOrg("");
      setImporte("");
      setDescripcion("");
      setAdminDetalle("");
      setFuncionalDetalle("");
      setProgramaticoDetalle("");
      setObjGastoDetalle("");
      setTipoGastoDetalle("");
      setFuenteFinanDetalle("");
      setRamoDetalle("");
      setAnioDetalle("");
      setControlInternoDetalle("");
      setAreaGeoDetalle("");
      setProyProgramDetalle("");


    }






  };

  const handleLimpiarCamposHeader = () => {


    if (modo === "Ver") {
      setNumCuenta("");
      setObservaciones("");


    } else {
      setIdTipoSolicitud("");
      setidUResp('');
      setidProveedor("");
      setProyecto("");
      setNumCuenta("");
      setConCheque("");
      setObservaciones("");
      setAgregarDetalle(false);
      setLimpiar(false)
    }

  };

  const Consulta = () => {
    var sumatotal = 0;

    DAMOPServices.indexDetalle({ NUMOPERACION: 4, IDORG: dataCab?.id }).then((res) => {
      if (res.SUCCESS) {

        setData(res.RESPONSE)

        res.RESPONSE.map((item: indexDetalle) => {
          sumatotal = sumatotal + Number(item.importe)
          setSumaTotalDetalle(sumatotal)
        });
        if (res.RESPONSE.length === 0) {
          setSumaTotalDetalle(sumatotal)
        }

      } else {
        AlertS.fire({
          title: "Error!",
          text: "Error!",
          icon: "error",
        });
      }
    });


  };


  const columnsParticipaciones = [
    { field: "id", hide: true },
    {
      field: "",
      disableExport: true,
      headerName: "Operaciones",
      description: "Operaciones",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title={"Ver Detalles"}>
              <IconButton value="check" onClick={() => handleDetallesCabecera(v)}>
                <MenuBookIcon />
              </IconButton>
            </Tooltip>
            {dataCab.orden < 16 ?
              <Tooltip title={"Eliminar"}>
                <IconButton value="check" onClick={() => handleBorrarDetalle(v)}>
                  <DeleteForeverOutlinedIcon />
                </IconButton>
              </Tooltip> : ""
            }
          </Box>
        );
      },
    },
    {
      field: "FechaCreacion",
      headerName: "Fecha Creación",
      width: 200,
      description: "Fecha Creación",
    },
    {
      field: "importe",
      headerName: "Importe",
      width: 140,
      description: "Importe",
      ...Moneda,
      renderHeader: () => (
        <>
          {"Total: " + (sumaTotalDetalle === undefined ? "0" : currencyFormatter.format(Number(sumaTotalDetalle)))}
        </>
      ),
    },
    {
      field: "Descripcion",
      headerName: "Descripción",
      width: 400,
      description: "Descripción",
    },
    {
      field: "Clasificador01",
      headerName: "Administrativo",
      width: 150,
      description: "Administrativo",
    },
    {
      field: "Clasificador02",
      headerName: "Funcional",
      width: 150,
      description: "Funcional",
    },
    {
      field: "Clasificador03",
      headerName: "Programatico",
      width: 150,
      description: "Programatico",
    },
    {
      field: "Clasificador04",
      headerName: "Objeto del Gasto",
      width: 150,
      description: "Objeto del Gasto",
    },
    {
      field: "Clasificador05",
      headerName: "Tipo del Gasto",
      width: 150,
      description: "Tipo del Gasto",
    },
    {
      field: "Clasificador06",
      headerName: "Fuente de financiamiento",
      width: 150,
      description: "Fuente de financiamiento",
    },
    {
      field: "Clasificador07",
      headerName: "Ramo",
      width: 150,
      description: "Ramo",
    },
    {
      field: "Clasificador08",
      headerName: "Año",
      width: 150,
      description: "Año",
    },
    {
      field: "Clasificador09",
      headerName: "Control Interno",
      width: 150,
      description: "Control Interno",
    },
    {
      field: "Clasificador10",
      headerName: "Área Geografica",
      width: 150,
      description: "Área Geografica",
    },
    {
      field: "Clasificador11",
      headerName: "Proyecto / Programa",
      width: 200,
      description: "Proyecto / Programa",
    },
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
      else if (tipo === 30) {
        setListConceptos(res.RESPONSE);
      }
    });
  };

  const tipoSol =
    [
      {
        "value": "1",
        "label": "Solicitud egreso"
      },
      {
        "value": "2",
        "label": "Egreso"
      },
      {
        "value": "3",
        "label": "Aportación"
      },
      {
        "value": "4",
        "label": "Requerimiento de anticipo"
      },
    ]


  useEffect(() => {
    Consulta();
    console.log(dataCab)

    if (modo === "Nuevo") {
      setLimpiar(true);
      setHHeader(false);
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
      setConCheque(dataCab.IdConCheque);
      setHEdit(false);
      setIdTipoSolicitud(String(dataCab.TipoSolicitud));

    }
    if (modo === "Ver") {

    }



    loadFilter(29);
    loadFilter(26);
    loadFilter(27);
    loadFilter(30);
  }, [agregarDetalle]);


  return (
    <div>

      <ModalForm title={"Cabecera de Aportaciones"} handleClose={handleClose}>
        <Slider open={openSlider}></Slider>

        <Grid container  >

          <Grid container paddingBottom={1} >
            <Grid item xs={12} sm={12} md={12} lg={12}>

              <ButtonGroup size="large">
                <Tooltip title="Editar Cabecera">
                  <Button onClick={() => handleEditar()} color={!HEdit ? "info" : "inherit"} disabled={HEdit || dataCab.orden>=16} >
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
                      || idTipoSolicitud === ""
                      || idTipoSolicitud === "false"
                      || String(observaciones).trim() === ""
                    } >
                    <CheckBoxIcon />
                  </Button  >
                </Tooltip>
                <Tooltip title="Cancelar Cambios">
                  <Button onClick={() => handleCancelarCambios()} color={!HCancel ? "error" : "inherit"} disabled={HCancel || regGuardado || modo === "Nuevo"} >
                    <CancelPresentationIcon />
                  </Button  >
                </Tooltip>



                <Tooltip title="Limpiar Campos de Cabecera">
                  <Button onClick={() => handleLimpiarCamposHeader()} color={!HCancel ? "warning" : "inherit"} disabled={HCancel || regGuardado} >
                    <CleaningServicesOutlinedIcon />
                  </Button  >
                </Tooltip>
              </ButtonGroup>


            </Grid>
          </Grid>

          <Grid container justifyContent="space-between" paddingBottom={2}
            sx={{ bgcolor: (!regGuardado || !agregarDetalle ? "rgb(255, 255, 255) " : "rgba(225, 225, 225, 0.264) "), }}>

            <Grid item xs={12} sm={12} md={5.8} lg={2.9}>
              <label className="textoNormal">U.Resp:</label>

              <SelectFrag
                value={idUResp}
                options={ures}
                onInputChange={handleFilterChange1}
                placeholder={"Seleccione U.Resp"}
                label={""}
                disabled={HHeader || agregarDetalle || regGuardado || modo === "Ver"}
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
                disabled={HHeader || agregarDetalle || regGuardado || modo === "Ver"} />
            </Grid>
            <Grid item xs={12} sm={5.5} md={5.8} lg={2}>
              <label className="textoNormal">Tipo de solicitud:</label>
              <SelectFrag
                value={idTipoSolicitud}
                options={tipoSol}
                onInputChange={handleTipoSolicitud}
                placeholder={"Seleccione tipo de Solicitud"}
                label={""}
                disabled={HHeader || agregarDetalle || regGuardado || modo === "Ver"}
              />
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
                disabled={HHeader || agregarDetalle || regGuardado || modo === "Ver"}
                inputProps={{ maxLength: 7 }}
                error={String(Number(proyecto)) === "NaN"}


              />
            </Grid>




            <Grid item xs={12} sm={5.5} md={5.8} lg={2}>
              <label className="textoNormal">Total:</label>
              <TextField
                required
                value={currencyFormatter.format(Number(sumaTotalDetalle))}
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
                disabled={HHeader || agregarDetalle || regGuardado || modo === "Ver"}
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

            <Grid item xs={12} sm={5.5} lg={2} >

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
            <Grid item xs={12} lg={5.7} >
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

            <Grid container boxShadow={10} borderRadius={1}>
              <Grid item xs={12} sm={12} md={12} lg={12}>

                <Grid item container direction="row" justifyContent="space-between" xs={12} paddingTop={1} paddingBottom={1}>
                  {!openAgregarDetalle ?
                    <Tooltip title="Agregar detalle">
                      <Button disabled={openAgregarDetalle || dataCab.orden >= 16} className={dataCab.orden >= 16 ? "" : "guardarOrgCabecera"} value="check" onClick={() => handleAgregarDetalles()}
                      >
                        <AddIcon />
                      </Button >
                    </Tooltip>
                    : ""}


                  {openAgregarDetalle ?
                    <>

                      <Grid item xs={4} sm={4} md={4} lg={4}>
                        <ButtonGroup size="large">
                          {
                            !openAgregarDetalle || verDetalle ?
                              <Tooltip title="Editar Detalle">
                                <Button onClick={() => handleEditarDetalles()} color="info"
                                  disabled={DetalleEditar || dataCab.orden>=16}
                                >
                                  <ModeEditOutlineIcon />
                                </Button>
                              </Tooltip>
                              : ""
                          }

                          <Tooltip title="Grabar Cambios">
                            <Button onClick={() => handleAgregarDetalle()} color="success"
                              disabled={
                                // !editarDetalle ||
                                !DetalleEditar ||
                                DetalleAgregar ||
                                String(Number(importe)) === "NaN"
                                || String(descripcion).trim() === ""
                                || idClaveConcepto === ""
                                || idClaveConcepto === "false"
                                || importe === ""
                                || adminDetalle === ""
                                || funcionalDetalle === ""
                                || programaticoDetalle === ""
                                || objGastoDetalle === ""
                                || tipoGastoDetalle === ""
                                || fuenteFinanDetalle === ""
                                || ramoDetalle === ""
                                || anioDetalle === ""
                                || controlInternoDetalle === ""
                                || AreaGeoDetalle === ""
                                || proyProgramaDetalle === ""
                                || String(Number(importe)) === "NaN"
                              } >
                              <CheckBoxIcon />
                            </Button  >
                          </Tooltip>
                          {modoDetalle === "Agregar" ? "" :
                            <Tooltip title="Cancelar Cambios">
                              <Button onClick={() => handleCancelarCambiosDetalle()} color="error"  >
                                <CancelPresentationIcon />
                              </Button  >
                            </Tooltip>
                          }

                          <Tooltip title="Limpiar Campos de Detalle">
                            <Button onClick={() => handleLimpiarCamposDetalle()} color="warning"
                              disabled={!DetalleEditar || DetalleLimpiar}
                            >
                              <CleaningServicesOutlinedIcon />
                            </Button  >
                          </Tooltip>
                        </ButtonGroup>


                      </Grid>
                      <Grid item xs={4} sm={4} md={4} lg={4}>
                        <label className="Titulo">Agregar Detalle</label>

                      </Grid>
                    </>
                    : ""}

                  <Tooltip title="Cerrar administració de detalle">
                    <Button disabled={!openAgregarDetalle} className="cerrar" value="check" onClick={() => handleCloseAñadirDetalle()}>
                      <CloseOutlinedIcon />
                    </Button>
                  </Tooltip>
                </Grid>

                <Divider />

                {!openAgregarDetalle ?
                  <div style={{ height: "50vh", width: "100%", }}>

                    <ThemeProvider theme={theme} >
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
                          columnHeaderFiltersTooltipActive: (count) =>
                            count > 1 ? `${count} filtros activos` : `${count} filtro activo`,
                          columnHeaderFiltersLabel: 'Mostrar filtros',
                          columnHeaderSortIconLabel: 'Ordenar',
                        }}
                      />
                    </ThemeProvider>
                  </div>
                  :

                  <div>
                    <Slider open={openSlider}></Slider>

                    <Grid container spacing={1} padding={0} paddingTop={6}>
                      <Grid container justifyContent="space-around">
                        <Grid item xs={12} sm={10} md={5.8} lg={5}>
                          <label className="textoNormal">Cpto de egreso:</label>  <br />

                          <SelectFrag
                            value={idClaveConcepto}
                            options={listConceptos}
                            onInputChange={handleChangeCptoEgreso}
                            placeholder={"Seleccione Cpto de"}
                            label={""} disabled={verDetalle}
                          />
                          <label className="textoNormal">Parcial a Pagar:</label>  <br />

                          <TextField
                            required
                            value={currencyFormatter.format(Number(importe))}
                            variant="outlined"
                            onChange={(v) => setImporte(v.target.value)}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,

                            }}
                            error={String(Number(importe)) === "NaN"}
                            disabled={verDetalle && !editarDetalle || dataCab.orden >= 16} // no se edita el importe cuanod está en estatus pendiente Autorizar OP
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <label className="textoNormal">Descripción:</label>   <br />
                          <TextField
                            required
                            fullWidth
                            spellCheck="true"
                            rows={5}
                            multiline
                            value={descripcion}
                            onChange={(v) => setDescripcion(v.target.value)}
                            style={{ width: "100%" }}
                            disabled={verDetalle && !editarDetalle || dataCab.orden >= 16} // no se edita la descripción del detalle cuando está en estatus Autorizar OP

                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={1} paddingBottom={5} paddingLeft={1.5}>

                        <Grid item xs={12}>
                          <label className="Titulo">Clasificadores:</label>
                          <br />
                        </Grid>

                        <Grid item xs={12} sm={4} md={3} lg={2}>
                          <label className="textoNormal">Administrativo:</label>
                          <TextField
                            hiddenLabel
                            id="Clasificador01"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={adminDetalle}
                            onChange={(v) => setAdminDetalle(v.target.value)}
                            disabled={verDetalle}

                          />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                          <label className="textoNormal">Funcional:</label>
                          <br />

                          <TextField
                            hiddenLabel
                            id="Clasificador02"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={funcionalDetalle}
                            onChange={(v) => setFuncionalDetalle(v.target.value)}
                            disabled={verDetalle}

                          />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                          <label className="textoNormal">Programatico:</label>
                          <br />

                          <TextField
                            hiddenLabel
                            id="Clasificador03"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={programaticoDetalle}
                            onChange={(v) => setProgramaticoDetalle(v.target.value)}
                            disabled={verDetalle}

                          />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                          <label className="textoNormal">Objeto del Gasto:</label>
                          <br />

                          <TextField
                            hiddenLabel
                            id="Clasificador04"
                            variant="outlined"
                            size="small"
                            onChange={(v) => setObjGastoDetalle(v.target.value)}
                            value={objGastoDetalle}
                            fullWidth
                            disabled={verDetalle}

                          />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                          <label className="textoNormal">Tipo del Gasto:</label>
                          <br />

                          <TextField
                            hiddenLabel
                            id="Clasificador05"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={tipoGastoDetalle}
                            onChange={(v) => setTipoGastoDetalle(v.target.value)}
                            disabled={verDetalle}

                          />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                          <label className="textoNormal">Fuente de financiamiento:</label>
                          <br />

                          <TextField
                            hiddenLabel
                            id="Clasificador06"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={fuenteFinanDetalle}
                            onChange={(v) => setFuenteFinanDetalle(v.target.value)}
                            disabled={verDetalle}

                          />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                          <label className="textoNormal">Ramo:</label>
                          <br />

                          <TextField
                            hiddenLabel
                            id="Clasificador07"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={ramoDetalle}
                            onChange={(v) => setRamoDetalle(v.target.value)}
                            disabled={verDetalle}

                          />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>

                          <label className="textoNormal">Año:</label>
                          <br />
                          <TextField
                            hiddenLabel
                            id="Clasificador08"
                            variant="outlined"
                            size="small"
                            value={anioDetalle}
                            fullWidth
                            onChange={(v) => setAnioDetalle(v.target.value)}
                            disabled={verDetalle}

                          />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                          <label className="textoNormal">Control Interno:</label>
                          <br />
                          <TextField
                            hiddenLabel
                            id="Clasificador09"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={controlInternoDetalle}
                            onChange={(v) => setControlInternoDetalle(v.target.value)}
                            disabled={verDetalle}

                          />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                          <label className="textoNormal">Área Geografica:</label>
                          <br />

                          <TextField
                            hiddenLabel
                            id="Clasificador10"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={AreaGeoDetalle}
                            disabled={verDetalle}
                            onChange={(v) => setAreaGeoDetalle(v.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                          <label className="textoNormal">Proy / Program:</label>
                          <br />

                          <TextField
                            hiddenLabel
                            id="Clasificador11"
                            variant="outlined"
                            size="small"
                            value={proyProgramaDetalle}
                            onChange={(v) => setProyProgramDetalle(v.target.value)}
                            fullWidth
                            disabled={verDetalle}

                          />
                        </Grid>

                      </Grid>
                      {/* {openAgregarDetalle && !verDetalle ?
                        <Grid paddingTop={6}
                          item container justifyContent="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
                          <Tooltip title="Guardar Detalle">
                            <Button value="check"
                              hidden
                              disabled={
                                idClaveConcepto === ""
                                || idClaveConcepto === "false"
                                || importe === ""
                                || descripcion === ""
                                || adminDetalle === ""
                                || funcionalDetalle === ""
                                || programaticoDetalle === ""
                                || objGastoDetalle === ""
                                || tipoGastoDetalle === ""
                                || fuenteFinanDetalle === ""
                                || ramoDetalle === ""
                                || anioDetalle === ""
                                || controlInternoDetalle === ""
                                || AreaGeoDetalle === ""
                                || proyProgramaDetalle === ""
                                || String(Number(importe)) === "NaN"
                                || verDetalle
                              }
                              onClick={handleAgregarDetalle} className={"guardar"}>
                              Guardar
                            </Button>
                          </Tooltip>
                        </Grid>
                        : ""
                      } */}

                    </Grid>

                  </div>

                }


              </Grid>
            </Grid>
            :
            ""}

        </Grid>
      </ModalForm>

    </div>
  )
}