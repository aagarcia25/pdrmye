import {
  Box,
  Button,
  createTheme,
  Grid,
  IconButton,
  Link,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectValues from "../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../services/catalogosServices";
import SelectFrag from "../Fragmentos/SelectFrag";
import SendIcon from "@mui/icons-material/Send";
import { AlertS } from "../../../helpers/AlertS";
import { Moneda } from "../menu/CustomToolbar";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import { getUser } from "../../../services/localStorage";
import { DPCPServices } from "../../../services/DPCPServices";
import { Toast } from "../../../helpers/Toast";
import Slider from "../Slider";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import {
  DataGrid,
  esES,
  GridSelectionModel,
  GridToolbar,
  esES as gridEsES,
} from "@mui/x-data-grid";
import { esES as coreEsES } from "@mui/material/locale";
import ModalPresupuesto from "./ModalPago";

const AsigPago = () => {
  const theme = createTheme(coreEsES, gridEsES);

  const [slideropen, setslideropen] = useState(true);
  //MODAL
  const [openModal, setOpenModal] = useState<boolean>(false);
  //Constantes para llenar los select
  const [estatus, setEstatus] = useState<SelectValues[]>([]);
  const [fondos, setFondos] = useState<SelectValues[]>([]);
  const [anios, setAnios] = useState<SelectValues[]>([]);
  const [mes, setMeses] = useState<SelectValues[]>([]);
  const [procesos, setProcesos] = useState<SelectValues[]>([]);
  const [municipio, setMunicipios] = useState<SelectValues[]>([]);
  //
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [vrows, setVrows] = useState<{}>("");

  //Constantes de los filtros
  const [idEstatus, setIdEstatus] = useState("");
  const [idFondo, setIdFondo] = useState("");
  const [idanio, setIdanio] = useState("");
  const [idmes, setIdmes] = useState("");
  const [idProceso, setIdproceso] = useState("");
  const [idMunicipio, setidMunicipio] = useState("");
  //
  const [p1, setp1] = useState(3);

  //Constantes para las columnas
  const [data, setData] = useState([]);
  const [openTrazabilidad, setOpenTrazabilidad] = useState(false);
  const user: RESPONSE = JSON.parse(String(getUser()));

  const agregarPresupuesto = (data: any) => {
    setVrows(data);
    setOpenModal(true);
  };

  const columnsSolicitudAnticipoParticipaciones = [
    { field: "id", headerName: "Identificador", width: 100, hide: true },
    {
      field: "acciones",  disableExport: true,
      headerName: "Acciones",
      description: "Ver Detalle de Cálculo",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Asignar Presupuesto">
              <IconButton onClick={() => agregarPresupuesto(v)}>
                <AttachMoneyIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "proceso",
      headerName: "Proceso",
      width: 250,
      description: "Proceso",
    },
    {
      field: "Anio",
      headerName: "Año",
      width: 100,
      description: "Año",
    },
    {
      field: "descripcionMes",
      headerName: "Mes",
      width: 150,
      description: "Mes",
    },
    {
      field: "ClaveEstado",
      headerName: "Clave Estado",
      width: 100,
      description: "Clave Estado",
    },
    {
      field: "municipio",
      headerName: "Municipio",
      width: 150,
      description: "Municipio",
    },
    {
      field: "Concepto",
      headerName: "Concepto",
      width: 250,
      description: "Concepto",
    },

    {
      field: "Total",
      headerName: "Importe",
      width: 150,
      description: "Importe",
      ...Moneda,
    },

    {
      field: "ComentarioPresupuesto",
      headerName: "Observación DPCP",
      width: 300,
      description: "Observación DPCP",
    },

    {
      field: "RutaArchivo",
      headerName: "Documento DPCP",
      width: 100,
      renderCell: (v: any) => {
        return v.row.RutaArchivo !== null ? (
          <Box>
            <Link href={v.row.RutaArchivo} underline="always">
              Descargar
            </Link>
          </Box>
        ) : (
          ""
        );
      },
    },
  ];


  const columnsAnticipoParticipaciones = [
    { field: "id", headerName: "Identificador", width: 100, hide: true },
    { field: "idprincipal", headerName: "idcalculo", width: 10, hide: true },
    {
      field: "acciones",  disableExport: true,
      headerName: "Acciones",
      description: "Ver Detalle de Cálculo",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Asignar Presupuesto">
              <IconButton onClick={() => agregarPresupuesto(v)}>
                <AttachMoneyIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "proceso",
      headerName: "Proceso",
      width: 250,
      description: "Proceso",
    },
    {
      field: "Anio",
      headerName: "Año",
      width: 100,
      description: "Año",
    },
    {
      field: "mesdescripcion",
      headerName: "Mes",
      width: 150,
      description: "Mes",
    },
    {
      field: "ClaveEstado",
      headerName: "Clave Estado",
      width: 100,
      description: "Clave Estado",
    },
    {
      field: "Nombre",
      headerName: "Municipio",
      width: 150,
      description: "Municipio",
    },

    {
      field: "Total",
      headerName: "Importe",
      width: 150,
      description: "Importe",
      ...Moneda,
    },

    {
      field: "ComentarioPresupuesto",
      headerName: "Observación DPCP",
      width: 300,
      description: "Observación DPCP",
    },

    {
      field: "RutaArchivo",
      headerName: "Documento DPCP",
      width: 100,
      renderCell: (v: any) => {
        return v.row.RutaArchivo !== null ? (
          <Box>
            <Link href={v.row.RutaArchivo} underline="always">
              Descargar
            </Link>
          </Box>
        ) : (
          ""
        );
      },
    },
  ];

  const columnsParticipaciones = [
    { field: "id", headerName: "Identificador", width: 100, hide: true },
    { field: "idcalculo", headerName: "idcalculo", width: 10, hide: true },
    {
      field: "acciones",  disableExport: true,
      headerName: "Acciones",
      description: "Ver Detalle de Cálculo",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Asignar Presupuesto">
              <IconButton onClick={() => agregarPresupuesto(v)}>
                <AttachMoneyIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "proceso",
      headerName: "Proceso",
      width: 250,
      description: "Proceso",
    },
    {
      field: "fondodescripcion",
      headerName: "Fondo",
      width: 150,
      description: "Fondo",
    },
    {
      field: "Anio",
      headerName: "Año",
      width: 150,
      description: "Año",
    },
    {
      field: "Descripcion",
      headerName: "Mes",
      width: 250,
      description: "Mes",
    },
    {
      field: "ClaveEstado",
      headerName: "Clave Estado",
      width: 150,
      description: "Clave Estado",
    },
    {
      field: "municipio",
      headerName: "Municipio",
      width: 150,
      description: "Municipio",
    },

    {
      field: "total",
      headerName: "Importe",
      width: 150,
      description: "Importe",
      ...Moneda,
    },

    {
      field: "ComentarioPresupuesto",
      headerName: "Observación DPCP",
      width: 300,
      description: "Observación DPCP",
    },

    {
      field: "RutaArchivo",
      headerName: "Documento DPCP",
      width: 100,
      renderCell: (v: any) => {
        return v.row.RutaArchivo !== null ? (
          <Box>
            <Link href={v.row.RutaArchivo} underline="always">
              Descargar
            </Link>
          </Box>
        ) : (
          ""
        );
      },
    },
  ];

  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion === 8) {
        setEstatus(res.RESPONSE);
      } else if (operacion === 12) {
        setFondos(res.RESPONSE);
      } else if (operacion === 4) {
        setAnios(res.RESPONSE);
      } else if (operacion === 2) {
        setMeses(res.RESPONSE);
      } else if (operacion === 14) {
        setProcesos(res.RESPONSE);
        setslideropen(false);
      } else if (operacion === 5) {
        setMunicipios(res.RESPONSE);
      }
    });
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleFilterChange1 = (v: string) => {
    setIdanio(v);
  };

  const handleFilterChange2 = (v: string) => {
    setIdmes(v);
  };

  const handleFilterChange3 = (v: string) => {
    setIdproceso(v);
    //console.log(v);
    if (v !== "false") {
      let subArray = procesos.filter((val) => val.value === v);
      if (subArray[0]["label"] === "Anticipo de Participaciones") {
        setp1(1);
      } else if (
        subArray[0]["label"] === "Solicitud de Anticipo de Participaciones"
      ) {
        setp1(2);
      } else {
        setp1(3);
      }
    }
  };

  const handleFilterChange4 = (v: string) => {
    setIdEstatus(v);
  };

  const handleFilterChange5 = (v: string) => {
    setIdFondo(v);
  };

  const handleFilterChange6 = (v: string) => {
    setidMunicipio(v);
  };

  const Fnworkflow = () => {
    //setIdFondo(v);
  };
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const FinalizarProceso = () => {
    //console.log("EJECUTANDO LA CONSULTA CON LOS SIGUIENTES FILTROS");
    //console.log(selectionModel);
    setOpenModal(true);
  };

  const AsignarPresupuesto = () => {
    //console.log("EJECUTANDO LA CONSULTA CON LOS SIGUIENTES FILTROS");
    //console.log(selectionModel);
    setOpenModal(true);
  };

  const handleClick = () => {
    //console.log("EJECUTANDO LA CONSULTA CON LOS SIGUIENTES FILTROS");

    let data = {
      P_FONDO: idFondo === "false" ? "" : idFondo,
      P_ANIO: idanio === "false" ? "" : idanio,
      P_MES: idmes === "false" ? "" : idmes,
      P_IDPROCESO: idProceso === "false" ? "" : idProceso,
      P_IDESTATUS: idEstatus === "false" ? "" : idEstatus,
    };
    //console.log(data);
    DPCPServices.ConsultaDPCP(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setData(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    loadFilter(2);
    loadFilter(4);
    loadFilter(8);
    loadFilter(12);
    loadFilter(5);
    loadFilter(14);
  }, []);

  return (
    <div>
      <Slider open={slideropen}></Slider>
      <Grid container spacing={1} sx={{ padding:"2%"}}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        Módulo de Administración Financiera
      </Grid>
        <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <Typography sx={{ fontFamily: "sans-serif" }}>
              Año:
            </Typography>
            <SelectFrag
              value={idanio}
              options={anios}
              onInputChange={handleFilterChange1}
              placeholder={"Seleccione Año"}
              label={""}
              disabled={false}
            />
          </Grid>

          <Grid item xs={2} sm={2} md={2} lg={2}>
            <Typography sx={{ fontFamily: "sans-serif" }}>
              Mes:
            </Typography>
            <SelectFrag
              value={idmes}
              options={mes}
              onInputChange={handleFilterChange2}
              placeholder={"Seleccione Mes"}
              label={""}
              disabled={false}
            />
          </Grid>

          <Grid item xs={2}>
            <Typography sx={{ fontFamily: "sans-serif" }}>
              Procesos:
            </Typography>
            <SelectFrag
              value={idProceso}
              options={procesos}
              onInputChange={handleFilterChange3}
              placeholder={"Seleccione Proceso"}
              label={""}
              disabled={false}
            />
          </Grid>

          <Grid item xs={2}>
            <Typography sx={{ fontFamily: "sans-serif" }}>
              Estatus:
            </Typography>
            <SelectFrag
              value={idEstatus}
              options={estatus}
              onInputChange={handleFilterChange4}
              placeholder={"Seleccione Estatus"}
              label={""}
              disabled={false}
            />
          </Grid>

          <Grid item xs={2} sm={2} md={2} lg={2}>
            <Typography sx={{ fontFamily: "sans-serif" }}>
              Fondo:
            </Typography>
            <SelectFrag
              value={idFondo}
              options={fondos}
              onInputChange={handleFilterChange5}
              placeholder={"Seleccione Fondo"}
              label={""}
              disabled={false}
            />
          </Grid>

          <Grid item xs={2} sm={2} md={2} lg={2}>
            <Typography sx={{ fontFamily: "sans-serif" }}>
              Municipio:
            </Typography>
            <SelectFrag
              value={idMunicipio}
              options={municipio}
              onInputChange={handleFilterChange6}
              placeholder={"Seleccione Municipio"}
              label={""}
              disabled={false}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Button
            onClick={handleClick}
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
          >
            Buscar
          </Button>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ToggleButtonGroup>
            <Tooltip title={"Asignar Presupuesto"}>
              <ToggleButton value="check" onClick={() => AsignarPresupuesto()}>
                <AttachMoneyIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title={"Finalizar Proceso"}>
              <ToggleButton value="check" onClick={() => FinalizarProceso()}>
                <DoneAllIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography sx={{ fontFamily: "sans-serif" }}>
            Para Realizar la consulta de Información es Requerido los filtros
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div style={{ height: "60vh", width: "100%" , display : p1 === 1 ? "block":"none"}}>
            <ThemeProvider theme={theme}>
                <DataGrid
                  localeText={
                    esES.components.MuiDataGrid.defaultProps.localeText
                  }
                  columns={columnsAnticipoParticipaciones}
                  rows={data}
                  density="compact"
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  disableSelectionOnClick
                  disableColumnFilter
                  disableColumnSelector
                  disableDensitySelector
                  getRowHeight={() => "auto"}
                  checkboxSelection={checkboxSelection}
                  components={{ Toolbar: GridToolbar }}
                  sx={{ fontFamily: "MontserratMedium" }}
                  onSelectionModelChange={(newSelectionModel: any) => {
                    setSelectionModel(newSelectionModel);
                  }}
                  selectionModel={selectionModel}
                />
            </ThemeProvider>
          </div>

          <div style={{ height: "60vh", width: "100%" , display : p1 === 2 ? "block":"none"}}>
            <ThemeProvider theme={theme}>
                <DataGrid
                  localeText={
                    esES.components.MuiDataGrid.defaultProps.localeText
                  }
                  columns={columnsSolicitudAnticipoParticipaciones}
                  rows={data}
                  density="compact"
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  disableSelectionOnClick
                  disableColumnFilter
                  disableColumnSelector
                  disableDensitySelector
                  getRowHeight={() => "auto"}
                  checkboxSelection={checkboxSelection}
                  components={{ Toolbar: GridToolbar }}
                  sx={{ fontFamily: "sans-serif" }}
                  onSelectionModelChange={(newSelectionModel: any) => {
                    setSelectionModel(newSelectionModel);
                  }}
                  selectionModel={selectionModel}
                />
            </ThemeProvider>
          </div>

          <div style={{ height: "60vh", width: "100%" , display : p1 === 3 ? "block":"none"}}>
            <ThemeProvider theme={theme}>
                <DataGrid
                  localeText={
                    esES.components.MuiDataGrid.defaultProps.localeText
                  }
                  columns={columnsParticipaciones}
                  rows={data}
                  density="compact"
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  disableSelectionOnClick
                  disableColumnFilter
                  disableColumnSelector
                  disableDensitySelector
                  getRowHeight={() => "auto"}
                  checkboxSelection={checkboxSelection}
                  components={{ Toolbar: GridToolbar }}
                  sx={{ fontFamily: "sans-serif" }}
                  onSelectionModelChange={(newSelectionModel: any) => {
                    setSelectionModel(newSelectionModel);
                  }}
                  selectionModel={selectionModel}
                />
            </ThemeProvider>
          </div>
        </Grid>
      </Grid>

      {/* MODALES */}

      {openModal ? (
        <ModalPresupuesto
          handleClose={handleClose}
          vrows={vrows}
          handleAccion={Fnworkflow}
        ></ModalPresupuesto>
      ) : (
        ""
      )}
    </div>
  );
};

export default AsigPago;
