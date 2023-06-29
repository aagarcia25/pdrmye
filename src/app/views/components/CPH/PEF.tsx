import { Button, Grid, Typography } from "@mui/material";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { AlertS } from "../../../helpers/AlertS";
import { Toast } from "../../../helpers/Toast";
import SelectValues from "../../../interfaces/Select/SelectValues";
import { PERMISO, RESPONSE } from "../../../interfaces/user/UserInfo";
import { calculosServices } from "../../../services/calculosServices";
import { CatalogosServices } from "../../../services/catalogosServices";
import { getPermisos, getUser } from "../../../services/localStorage";
import { fanios } from "../../../share/loadAnios";
import { fmeses } from "../../../share/loadMeses";
import SelectFrag from "../Fragmentos/SelectFrag";
import MUIXDataGridGeneral from "../MUIXDataGridGeneral";
import Slider from "../Slider";
import { Moneda } from "../menu/CustomToolbar";
import ButtonsMunicipio2 from "../menu/catalogos/Utilerias/ButtonsMunicipio2";
import SendIcon from "@mui/icons-material/Send";



export const PEF = () => {
  const [slideropen, setslideropen] = useState(true);
  const [rows, setrows] = useState([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));


  
  const [meses, setMeses] = useState<SelectValues[]>([]);
  const [mes, setMes] = useState<string>("");
  const [anios, setAnios] = useState<SelectValues[]>([]);
  const [anio, setAnio] = useState<string>("");
  const [idFondo, setIdFondo] = useState("");
  const [fondos, setFondos] = useState<SelectValues[]>([]);
  const [municipio, setMunicipios] = useState<SelectValues[]>([]);
  const [idMunicipio, setidMunicipio] = useState("");


  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});

  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [nombreMenu, setNombreMenu] = useState("");
  const [plantilla, setPlantilla] = useState("");
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  

  const handleFilterChange2 = (v: string) => {
    setIdFondo(v);
  };

  const handleSelectMes = (data: any) => {
    setMes(data);
  };
  const handleFilterChangeAnio = (v: string) => {
    setAnio(v);
  };


  const columns: GridColDef[] = [
    { field: "id",hide: true,},
    { field: "idmunicipio",hide: true,},
    { field: "FechaCreacion",    headerName: "Fecha Creación",      description: "Fecha Creación",       width: 160 },
    { field: "Anio",             headerName: "Año",                 description: "Año",                  width: 90 },
    { field: "mes",              headerName: "Mes",                 description: "Mes",                  width: 100 },
    { field: "ClaveEstado",      headerName: "Clave Estado",        description: "Clave Estado",         width: 100 },
    { field: "Nombre",           headerName: "Municipio",           description: "Municipio",            width: 250 },
    { field: "clave",            headerName: "Clave Fondo",         description: "Clave Fondo",          width: 100 },
    { field: "Descripcion",      headerName: "Descripción de fondo",description: "Descripción de fondo", width: 320 },
    { field: "importe",          headerName: "Importe",             description: "Importe",              width: 170, ...Moneda, }, 
    { field: "usuario_creador",  headerName: "Usuario Creador",     description: "Usuario Creado",       width: 150 },
    { field: "usuario_modifico", headerName: "Usuario Modifico",    description: "Usuario Modifico",     width: 150 },
  ];

  const handleAccion = (v: any) => {
    if (v.tipo = 1) {
      setTipoOperacion(2);
      setVrows(v.data);
    } else if (v.tipo == 2) {
      handleDelete(v.data);
    }
  }


  const handleClose = () => {
    consulta();
  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setVrows("");
  };

  const handleEdit = (v: any) => {
    //console.log(v);
    setTipoOperacion(2);
    setVrows(v);
  };

  const handleDelete = (v: any) => {
    Swal.fire({
      icon: "info",
      title: "¿Estás seguro de eliminar este registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
       
        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.id,
        };
        calculosServices.handlepef(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Registro Eliminado!",
            });
            consulta();
          } else {
            AlertS.fire({
              title: "¡Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };



  const handleUpload = (data: any) => {

    if (data.tipo === 1) {
      setslideropen(true);
      let file = data.data?.target?.files?.[0] || "";
      const formData = new FormData();
      formData.append("inputfile", file, "inputfile.xlsx");
      formData.append("tipo", "pef");
      formData.append("CHUSER", user.id);
      CatalogosServices.migraData(formData).then((res) => {
        setslideropen(false);
        if (res.SUCCESS) {
          consulta();
          Toast.fire({
            icon: "success",
            title: "Carga Exitosa!",
          });

        } else {
          consulta();
          AlertS.fire({
            title: "¡Error!",
            text: res.STRMESSAGE,
            icon: "error",
          });
        }



      });
    }
    else if (data.tipo === 2) {


      if (selectionModel.length !== 0) {
        Swal.fire({
          icon: "question",
          title: selectionModel.length + " Registros Se Eliminaran!!",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Confirmar",
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {

            let data = {
              NUMOPERACION: 5,
              OBJS: selectionModel,
              CHUSER: user.id
            };

            calculosServices.handlepef(data).then((res) => {
              if (res.SUCCESS) {
                Toast.fire({
                  icon: "success",
                  title: "Borrado!",
                });

                consulta();
              } else {
                AlertS.fire({
                  title: "¡Error!",
                  text: res.STRMESSAGE,
                  icon: "error",
                });
              }
            });

          } else if (result.isDenied) {
            Swal.fire("No se realizaron cambios", "", "info");
          }
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Seleccione Registros Para Borrar",
          confirmButtonText: "Aceptar",
        });
      }
    }

  };

  const handleBorrar = (v: any) => {
    setSelectionModel(v);
  };

  const consulta = () => {
    setslideropen(true);

    let data = {
      NUMOPERACION: 4,
      P_FONDO: idFondo === "false" ? "" : idFondo,
      P_IDMUNICIPIO: idMunicipio === "false" ? "" : idMunicipio,
      P_MES: mes === "false" ? "" : mes,
      P_ANIO: anio === "false" ? "" : anio,
    };

    calculosServices.handlepef(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setrows(res.RESPONSE);
        setslideropen(false);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
        setslideropen(false);
      }
    });
  };

  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion === 31) {
        setFondos(res.RESPONSE);
      } 
    });
  };

  useEffect(() => {
    setMeses(fmeses());
    setAnios(fanios());
    loadFilter(31);

    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "PEF") {
        setNombreMenu(item.Menu);
        if (String(item.Referencia) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.Referencia) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) === "EDIT") {
          setEditar(true);
        }
      }
    });
    consulta();
  }, []);

  return (

    <div style={{ height: 600, width: "100%", padding: "2%" }}>
      <Slider open={slideropen}></Slider>
      <Grid container item spacing={1} xs={12} sm={12} md={12} lg={12}>
            <Grid container sx={{ justifyContent: "center" }}>
              <Grid className="Titulo" container item xs={12} >
                <Typography variant="h4" paddingBottom={2}>
                  Módulo de Presupuesto de Egresos de la Federación
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
         

            <Grid item xs={12} sm={6} md={3} lg={2}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Fondo:</Typography>
              <SelectFrag
                value={idFondo}
                options={fondos}
                onInputChange={handleFilterChange2}
                placeholder={"Seleccione Fondo"}
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
              <Typography sx={{ fontFamily: "sans-serif" }}>Año :</Typography>
              <SelectFrag
                value={anio}
                options={anios}
                onInputChange={handleFilterChangeAnio}
                placeholder={"Seleccione Año"}
                label={""}
                disabled={false}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} paddingBottom={2} paddingTop={2}>
            <Button
              onClick={consulta}
              className="agregarToggleButton"
              endIcon={<SendIcon sx={{ color: "white" }} />}
            >
              <Typography sx={{ color: "white" }}> Buscar </Typography>
            </Button>
          </Grid>
          
      <ButtonsMunicipio2
        url={"PlantilladecargadePEF.xlsx"}
        handleUpload={handleUpload} 
        controlInterno={"PEF"}
        handleOpen={handleOpen}/>
      < MUIXDataGridGeneral columns={columns} rows={rows} handleBorrar={handleBorrar} modulo={"PEF"} controlInterno={"PEF"} multiselect={true} />
    </div>
  );
};



