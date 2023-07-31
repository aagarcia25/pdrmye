import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import SendIcon from "@mui/icons-material/Send";
import { esES as coreEsES } from "@mui/material/locale";
import {
  GridSelectionModel,
  esES as gridEsES,
} from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { AlertS } from "../../../helpers/AlertS";
import { Toast } from "../../../helpers/Toast";
import SelectValues from "../../../interfaces/Select/SelectValues";
import { PERMISO, RESPONSE } from "../../../interfaces/user/UserInfo";
import { DPCPServices } from "../../../services/DPCPServices";
import { CatalogosServices } from "../../../services/catalogosServices";
import { getPermisos, getUser } from "../../../services/localStorage";
import SelectFrag from "../Fragmentos/SelectFrag";
import MUIXDataGridGeneral from "../MUIXDataGridGeneral";
import Slider from "../Slider";
import { Moneda, currencyFormatter } from "../menu/CustomToolbar";
import { fmeses } from "../../../share/loadMeses";
import { fanios } from "../../../share/loadAnios";



const AuthSolicitudes = () => {
  const theme = createTheme(coreEsES, gridEsES);
  const [slideropen, setslideropen] = useState(true);
  const [numOrdenPago, setNumOrdenPago] = useState("");
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [fondos, setFondos] = useState<SelectValues[]>([]);
  const [municipio, setMunicipios] = useState<SelectValues[]>([]);
  const [tipo, setTipo] = useState<SelectValues[]>([]);
  const [tipos, setTipos] = useState<SelectValues[]>([]);
  const [clasificaciones, setClasificaciones] = useState<SelectValues[]>([]);
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [vrows, setVrows] = useState<{}>("");
  const [idtipo, setIdTipo] = useState("");
  const [idFondo, setIdFondo] = useState("");
  const [tipomunicipio, settipomunicipio] = useState("");
  const [idMunicipio, setidMunicipio] = useState("");
  const [data, setData] = useState([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [sumaTotal, setSumaTotal] = useState<Number>();
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [authSol, setAuthSol] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [meses, setMeses] = useState<SelectValues[]>([]);
  const [anios, setAnios] = useState<SelectValues[]>([]);
  const [mes, setMes] = useState<string>("");
  const [anio, setAnio] = useState<string>("");
  const [clasificacion, setclasificacion] = useState<string>("");



  const columnsParticipaciones = [
    { field: "id", hide: true, hideable: false },
    { field: "UltimaActualizacion", headerName: "Fecha", width: 150,description: "Fecha de ultima Modificación"   },
    { field: "a2", headerName: "Estatus", width: 150,description: "Estatus"   },
    { field: "clasificacion", headerName: "Clasificación", width: 150,description: "Clasificación"   },
    { field: "a3", headerName: "Nº De Solicitud De Pago", width: 200, description: "Nº De Solicitud De Pago"   },
    { field: "usuario_creador", headerName: "Usuario Creador", width: 200, description: "Usuario Creador"   },
    { field: "usuario", headerName: "Usuario Modifico", width: 200, description: "Usuario Modifico"   },
    { field: "a6", headerName: "Año", width: 100,      description: "Año"    },
    { field: "a7", headerName: "Mes",      width: 100,      description: "Mes"    },
    { field: "a18",headerName: "U. Resp",      width: 100,      description: "Unidad Responsable"    },
    { field: "a8", headerName: "Proveedor",      width: 150,      description: "Proveedor"    },
    { field: "a9", headerName: "Descripción",      width: 250,      description: "Descripción"   },
    { field: "a10",
      headerName: "Total Neto",
      width: 280,
      description: "Total Neto = (Total Bruto - (Retenciones + Descuentos))",
      ...Moneda,
      renderHeader: () => (
          <Tooltip title={"Total Neto = (Total Bruto - (Retenciones + Descuentos))"}>
            <Typography >
              {"Total Neto: " + currencyFormatter.format(Number(sumaTotal))}
            </Typography>
          </Tooltip>
      ),

    },

  ];

  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion === 12) {
        setFondos(res.RESPONSE);
      } else if (operacion === 32) {
        setMunicipios(res.RESPONSE);
      } else if (operacion === 17) {
        setTipo(res.RESPONSE);
      }else if (operacion === 46){
        setTipos(res.RESPONSE);
      }else if (operacion === 47){
        setClasificaciones(res.RESPONSE)
        setslideropen(false);
      }
    });
  };

  const handleChangeMostrarTodo = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChecked(event.target.checked);
  };

  const handleFilterChange3 = (v: string) => {
    setidMunicipio(v);
  };

  const handleFilterChange4 = (v: string) => {
    settipomunicipio(v);
  };

  
  const handleSelectAnio = (data: any) => {
    setAnio(data);
  };

  const handleSelectMes = (data: any) => {
    setMes(data);
  };

  const handleSelectClasificacion= (data: any) => {
    setclasificacion(data);
  };


  const SolicitudOrdenPago = () => {
    if (selectionModel.length === 0) {
      AlertS.fire({
        title: "¡Error!",
        text: "Favor de Seleccionar Registros",
        icon: "error",
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Solicitar",
        text: selectionModel.length + " Elementos Seleccionados",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {

        if (result.isConfirmed) {
          let data = {
            NUMOPERACION: 1,
            OBJS: selectionModel,
            CHUSER: user.id,
          };

          DPCPServices.AuthSolicitudPago(data).then((res) => {
            if (res.SUCCESS) {
              AlertS.fire({
                icon: "success",
                title: res.RESPONSE,
              }).then(async (result) => {
                if (result.isConfirmed) {
                  handleClick();
                }
              });
            } else {
              AlertS.fire({
                title: "¡Error!",
                text: res.STRMESSAGE,
                icon: "error",
              });
            }
          });
        }


      });


    }
  };




  const handleClick = () => {

    let data = {
      TIPO: 3,
      P_FONDO: idFondo === "false" ? "" : idFondo,
      P_IDMUNICIPIO: idMunicipio === "false" ? "" : idMunicipio,
      P_IDTIPO: idtipo === "false" ? "" : idtipo,
      P_SOLICITUDPAGO: numOrdenPago ? numOrdenPago : "",
      P_MOSTRARTODOS: checked,
      P_MUNICIPIO:tipomunicipio === "false" ? "" : tipomunicipio,
      P_IDMES: mes === "false" ? "" : mes,
      P_ANIO: anio === "false" ? "" : anio, 
      P_IDCLASIFICACION: clasificacion === "false" ? "" : clasificacion, 

    };
    DPCPServices.GetParticipaciones(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setData(res.RESPONSE);

        var sumatotal = 0;
        res.RESPONSE.map((item: any) => {
          sumatotal = sumatotal + Number(item.a10)
          setSumaTotal(sumatotal)
        });


      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };


  
  const handleBorrar = (v: GridSelectionModel) => {
    setSelectionModel(v);
  };

  useEffect(() => {
    setMeses(fmeses());
    setAnios(fanios());
    loadFilter(12);
    loadFilter(32);
    loadFilter(17);
    loadFilter(46);
    loadFilter(47);
    handleClick();

      permisos.map((item: PERMISO) => {
        if (String(item.ControlInterno) === "DPCPAUTHSOL") {
          if (String(item.Referencia) === "AUTHSOL") {
            setAuthSol(true);
          }
          
        }
      });
  }, []);

  return (
    <div>
      <Slider open={slideropen}></Slider>
      <Grid container spacing={1} padding={2}>
        <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
          <Grid container sx={{ justifyContent: "center" }}>
     
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="h4" paddingBottom={2}>
                Módulo de Autorización de Solicitudes de Pago
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
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
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Solicitud de Pago:
            </Typography>
            <FormControl sx={{ width: "100%" }}  >
              <OutlinedInput
                id="outlined-adornment-password"
                type={'text'}
                size="small"
                fullWidth
                placeholder="Solicitud de Pago"
                onChange={(v) => setNumOrdenPago(v.target.value.trim())}
                value={numOrdenPago}
                inputProps={{ maxLength: 10 }}
                endAdornment={
                  <InputAdornment position="end">
                    <Tooltip title={"Limpiar campo"} >
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
              Tipo:
            </Typography>
            <SelectFrag
              value={tipomunicipio}
              options={tipos}
              onInputChange={handleFilterChange4}
              placeholder={"Seleccione Clasificación"}
              label={""}
              disabled={false}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={2}>
          <Typography sx={{ fontFamily: "sans-serif" }}>Año :</Typography>
              <SelectFrag
                value={anio}
                options={anios}
                onInputChange={handleSelectAnio}
                placeholder={"Seleccione Año"}
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
           
          <Grid item xs={12} sm={6} md={3} lg={2}>
          <Typography sx={{ fontFamily: "sans-serif" }}>Clasificación :</Typography>
              <SelectFrag
                value={clasificacion}
                options={clasificaciones}
                onInputChange={handleSelectClasificacion}
                placeholder={"Seleccione Clasificación"}
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
            color="secondary"
            endIcon={<SendIcon sx={{ color: "white" }} />}
          >
            <Typography sx={{ color: "white" }}> Buscar </Typography>
          </Button>
        </Grid>

        {authSol ?
        <Grid item xs={12} sm={12} md={1.8} lg={1.8} paddingBottom={1}>
          <ToggleButtonGroup>
            <Tooltip title={"Autorizar Solicitudes"}>
              <ToggleButton
                value="check"
                onClick={() => SolicitudOrdenPago()}>
                <CheckCircleIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Grid>
        :""
      }
{/* 
se comenta hasta nuevo aviso de los servicios de siregob para la deshautorizacion
 {authSol ?
        <Grid item xs={12} sm={12} md={1.8} lg={1.8} paddingBottom={1}>
          <ToggleButtonGroup>
            <Tooltip title={"Desautorizar Solicitudes"}>
              <ToggleButton
                value="check"
                onClick={() => SolicitudOrdenPago()}>
                <CancelPresentationIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Grid>
        :""
      } */}




        <Grid item xs={12} sm={12} md={12} lg={12}>
            <MUIXDataGridGeneral
              modulo={'Autorizacion de Solicitudes'}
              handleBorrar={handleBorrar}
              columns={columnsParticipaciones}
              rows={data}
              controlInterno={""}
              multiselect={true} />

        </Grid>
      </Grid>
    </div>
  );
};

export default AuthSolicitudes;
