import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import SelectValues from "../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../services/catalogosServices";
import SelectFrag from "../Fragmentos/SelectFrag";
import SendIcon from "@mui/icons-material/Send";
import { AlertS } from "../../../helpers/AlertS";
import { Moneda } from "../menu/CustomToolbar";
import { PERMISO, RESPONSE } from "../../../interfaces/user/UserInfo";
import { getPermisos, getUser } from "../../../services/localStorage";
import { DPCPServices } from "../../../services/DPCPServices";
import { Toast } from "../../../helpers/Toast";
import Slider from "../Slider";
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import { fmeses } from "../../../share/loadMeses";
import { fanios } from "../../../share/loadAnios";
import MUIXDataGridGeneral from "../MUIXDataGridGeneral";
import NombreCatalogo from "../componentes/NombreCatalogo";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { GridSelectionModel } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { SireService } from "../../../services/SireService";
const AsigPresupuestal = () => {
  const [slideropen, setslideropen] = useState(false);
  //MODAL
  const [anios, setAnios] = useState<SelectValues[]>([]);
  const [anio, setAnio] = useState<string>("");
  const [meses, setMeses] = useState<SelectValues[]>([]);
  const [mes, setMes] = useState<string>("");
  const [fondos, setFondos] = useState<SelectValues[]>([]);
  const [municipio, setMunicipios] = useState<SelectValues[]>([]);
  const [tipos, setTipos] = useState<SelectValues[]>([]);
  //Constantes de los filtros
  const [idtipo, setIdTipo] = useState("");
  const [idFondo, setIdFondo] = useState("");
  const [idMunicipio, setidMunicipio] = useState("");
  //Constantes para las columnas
  const [data, setData] = useState([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  /// Permisos
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [cargarPlant, setCargarPlant] = useState<boolean>(false);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);

  const handleSeleccion = (v: GridSelectionModel) => {
    setSelectionModel(v);
  };

  const columnsParticipaciones = [
    { field: "id", hide: true },
    {
      field: "a3",
      headerName: "Ejercicio",
      description: "Ejercicio",
      width: 70,
    },
    {
      field: "a5",
      headerName: "Mes",
      description: "Mes",
      width: 100,
    },
    {
      field: "a16",
      headerName: "U. Resp",
      description: "Unidad Responsable",
      width: 70,
    },
    {
      field: "a7",
      headerName: "Proveedor",
      description: "Proveedor",
      width: 150,
    },
    {
      field: "a9",
      headerName: "Descripción",
      description: "Descripción",
      width: 250,
    },
    {
      field: "a52",
      headerName: "Fecha Presupuesto",
      description: "Fecha de Verificación de Presupuesto",
      width: 150,
    },
    {
      field: "a12",
      headerName: "Presupuesto SIREGOB",
      description: "Presupuesto SIREGOB",
      sortable: false,
      width: 150,

    },

    {
      field: "a11",
      headerName: "Total Neto",
      width: 150,
      description: "Total Neto",
      ...Moneda,
    },
    {
      field: "a41",
      headerName: "ADMIN",
      width: 150,
      description: "Descripción CLASIFICACIÓN ADMINISTRATIVA",
    },
    {
      field: "a42",
      headerName: "FUNCIÓN",
      width: 100,
      description: "Descripción CLASIFICACIÓN FUNCIONAL",
    },
    {
      field: "a43",
      headerName: "PROGRA",
      width: 100,
      description: "Descripción CLASIF PROGRAMÁTICO",
    },
    {
      field: "a44",
      headerName: "PARTIDA",
      width: 100,
      description: "Descripción CLASIFICADOR POR OBJETO DE GASTO",
    },
    {
      field: "a45",
      headerName: "T.GASTO",
      width: 70,
      description: "Descripción CLASIFICADOR POR TIPO DE GASTO",
    },
    {
      field: "a46",
      headerName: "F.FINANC",
      width: 70,
      description: "Descripción CLASIFICADOR POR FUENTES DE FINANCIAMIENTO",
    },
    {
      field: "a47",
      headerName: "RAMO",
      width: 90,
      description: "Descripción RAMO-FONDO/CONVENIO 2020 / 2021 / 2022 / 2023",
    },
    {
      field: "a48",
      headerName: "AÑO",
      width: 50,
      description: "Descripción AÑO DEL RECURSO",
    },
    {
      field: "a49",
      headerName: "CONT.INT",
      width: 100,
      description: "Descripción CONTROL INTERNO",
    },
    {
      field: "a50",
      headerName: "MUNIC.",
      width: 100,
      description: "Descripción CLASIFICACIÓN GEOGRÁFICA",
    },
    {
      field: "a51",
      headerName: "PRY/PG",
      width: 100,
      description: "Descripción PROYECTO/PROGRAMA",
    },


  ];


  const verificaPresupuesto = () => {
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
          setslideropen(true);
          let data = {
            NUMOPERACION: 1,
            OBJS: selectionModel,
            CHUSER: user.id,
          };
          // console.log(data);

          SireService.ConsultaPresupuesto(data).then((res) => {
            if (res.SUCCESS) {
              AlertS.fire({
                icon: "success",
                title: 'Se Verifico la Suficiencia',
              }).then(async (result) => {
                if (result.isConfirmed) {
                  handleClick();
                  setslideropen(false);
                }
              });
            } else {
              setslideropen(false);
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


  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion === 31) {
        setFondos(res.RESPONSE);
      } else if (operacion === 32) {
        setMunicipios(res.RESPONSE);
      } else if (operacion === 17) {
        setTipos(res.RESPONSE);
        setslideropen(false);
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
    setMes(data);
  };
  const handleClick = () => {
    //console.log("EJECUTANDO LA CONSULTA CON LOS SIGUIENTES FILTROS");

    let data = {
      TIPO: 5,
      P_FONDO: idFondo === "false" ? "" : idFondo,
      P_IDMUNICIPIO: idMunicipio === "false" ? "" : idMunicipio,
      P_IDTIPO: idtipo === "false" ? "" : idtipo,
      P_IDMES: mes === "false" ? "" : mes,
      P_IDANIO: mes === "false" ? "" : anio,
    };
    DPCPServices.GetParticipaciones(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setData(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });


  };




  const handleFilterChangeAnio = (v: string) => {
    setAnio(v);
  };
  const handleUploadPA = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (mes !== "" && mes !== "false") {
      setslideropen(true);
      let file = event?.target?.files?.[0] || "";
      const formData = new FormData();
      formData.append("inputfile", file, "inputfile.xlxs");
      formData.append("CHUSER", user.id);
      formData.append("tipo", "asignapresupuesto");
      formData.append("CHMES", mes);
      CatalogosServices.migraData(formData).then((res) => {
        setslideropen(false);
        handleClick();
      });

    } else {
      AlertS.fire({
        title: "Información!",
        text: 'Es necesario el Filtro por Mes',
        icon: "error",
      });

    }

  };

  useEffect(() => {
    setMeses(fmeses());
    setAnios(fanios());
    loadFilter(31);
    loadFilter(32);
    loadFilter(17);
    // handleClick();
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "DPCPPRES") {
        if (String(item.Referencia) === "CPRESUPUESTO") {
          setCargarPlant(true);
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

            <Grid item xs={12} sm={10} sx={{ textAlign: "center" }}>
              <NombreCatalogo controlInterno={"DPCPPRES"} />
            </Grid>

          </Grid>
        </Grid>

        <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
          <Grid item xs={11.5} sm={6} md={4} lg={2}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Tipo:
            </Typography>
            <SelectFrag
              value={idtipo}
              options={tipos}
              onInputChange={handleFilterChange1}
              placeholder={"Seleccione Tipo"}
              label={""}
              disabled={false}
            />
          </Grid>
          <Grid item xs={11.5} sm={6} md={4} lg={2}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Fondo:
            </Typography>
            <SelectFrag
              value={idFondo}
              options={fondos}
              onInputChange={handleFilterChange2}
              placeholder={"Seleccione Fondo"}
              label={""}
              disabled={false}
            />
          </Grid>

          <Grid item xs={11.5} sm={6} md={4} lg={2}>
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

          <Grid item xs={11.5} sm={6} md={4} lg={2}>
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

          <Grid item xs={11.5} sm={6} md={4} lg={2}>
            <Typography sx={{ fontFamily: "sans-serif" }}>Año :</Typography>
            <SelectFrag
              value={anio}
              options={anios}
              onInputChange={handleFilterChangeAnio}
              placeholder={"Seleccione Ejercicio"}
              label={""}
              disabled={false}
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

        <Grid item xs={12} sm={12} md={12} lg={12} paddingBottom={-1}>

          <ToggleButtonGroup>

            {cargarPlant ? (
              <Tooltip title={"Cargar Plantilla"}>
                <ToggleButton value="check">
                  <IconButton
                    color="primary"
                    aria-label="upload documento"
                    component="label"
                    size="large"
                  >
                    <input
                      hidden
                      accept=".xlsx"
                      type="file"
                      value=""
                      onChange={(v) => handleUploadPA(v)}
                    />
                    <DriveFileMoveIcon />
                  </IconButton>
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}



            <ToggleButton value="check" onClick={() => verificaPresupuesto()}>
              <Tooltip title={"Verificar Presupuesto"}>
                <AttachMoneyIcon color="primary" />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>


        <Grid item xs={12} sm={12} md={12} lg={12}>
          <MUIXDataGridGeneral
            modulo={'Asignación Presupuestal'}
            handleBorrar={handleSeleccion}
            columns={columnsParticipaciones}
            rows={data}
            controlInterno={""}
            multiselect={true} />
        </Grid>
      </Grid>
    </div>
  );
};

export default AsigPresupuestal;

