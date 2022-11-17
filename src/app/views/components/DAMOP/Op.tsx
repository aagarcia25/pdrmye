import React, { useEffect, useState } from 'react'
import { Box, Dialog, Grid, IconButton, ToggleButton, Tooltip } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid';
import { CatalogosServices } from '../../../services/catalogosServices';
import BotonesAPD from '../componentes/BotonesAPD'
import { Titulo } from '../menu/catalogos/Utilerias/AgregarCalculoUtil/Titulo';
import MUIXDataGrid from '../MUIXDataGrid';
import Slider from '../Slider';
import AddIcon from '@mui/icons-material/Add';
import { OpModal } from './OpModal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BotonesAcciones from '../componentes/BotonesAcciones';
import DoneIcon from '@mui/icons-material/Done';
import SendIcon from '@mui/icons-material/Send';
import { ComentariosRecursosModal } from '../Municipios/ComentariosRecursosModal';
import Swal from 'sweetalert2';
import { AlertS } from '../../../helpers/AlertS';
import { PERMISO, RESPONSE } from '../../../interfaces/user/UserInfo';
import { getPermisos, getUser } from '../../../services/localStorage';
import DescriptionIcon from '@mui/icons-material/Description';
import BotonesOpciones from '../componentes/BotonesOpciones';
import InsightsIcon from "@mui/icons-material/Insights";
import TrazabilidadSolicitud from '../TrazabilidadSolicitud';
import { Moneda } from '../menu/CustomToolbar';
import FileUploadIcon from '@mui/icons-material/FileUpload';


const Op = () => {
  const [solicitud, setSolicitud] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSlider, setOpenSlider] = useState(false);
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [openTraz, setOpenTraz] = useState(false);
  const [idSolicitud, setIdSolicitud] = useState<string>();
  const [openSeg, setOpenSeg] = useState(false);
  const [numOperacion, setNumOperacion] = useState(4);
  const [modo, setModo] = useState("");
  const [departamento, setDepartamento] = useState<string>();
  const [perfil, setPerfil] = useState<string>();
  var hoy = new Date()

  const [data, setData] = useState({});
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [verTraz, setVertraz] = useState<boolean>(false);

  const perfiles = [
    { estatusRef: 'MUN_INICIO', accion: 'enviar', per: 'MUN', dep: "MUN", estatus: 'DAMOP_INICIO' },
    { estatusRef: 'MUN_ACT', accion: 'enviar', per: 'MUN', dep: "MUN", estatus: 'DAMOP_INICIO' },
    { estatusRef: 'DAMOP_AUT_ANA', accion: 'enviar', per: 'ANA', dep: "DAMOP", estatus: 'DAMOP_ENV_COOR' },
    { estatusRef: 'DAMOP_AUT_COR', accion: 'enviar', per: 'COOR', dep: "DAMOP", estatus: 'DAMOP_ENV_DIR' },
    { estatusRef: 'DAMOP_AUT_DIR', accion: 'enviar', per: 'DIR', dep: "DAMOP", estatus: 'DAMOP_ENV_DCCP' },
    { estatusRef: 'DAMOP_INICIO', accion: 'autorizar', per: 'ANA', dep: "DAMOP", estatus: 'AUTORIZAR' },
    { estatusRef: 'DAMOP_REG_COR_ANA', accion: 'autorizar', per: 'ANA', dep: "DAMOP", estatus: 'AUTORIZAR' },
    { estatusRef: 'DAMOP_REG_DIR_COOR', accion: 'autorizar', per: 'COOR', dep: "DAMOP", estatus: 'AUTORIZAR' },
    { estatusRef: 'DAMOP_ENV_COOR', accion: 'autorizar', per: 'COOR', dep: "DAMOP", estatus: 'AUTORIZAR' },
    { estatusRef: 'DAMOP_ENV_DIR', accion: 'autorizar', per: 'DIR', dep: "DAMOP", estatus: 'AUTORIZAR' },


    { estatusRef: 'DAMOP_CANCE_ANA', accion: 'cancelar', per: 'MUN', dep: "MUN", estatus: 'CANCELADO' },
  ]


  ///////////////////////////////////////////
  const consulta = () => {

    if (user.DEPARTAMENTOS[0].NombreCorto == "DAMOP") {
      CatalogosServices.SolicitudesInfo({ NUMOPERACION: 6, CHUSER: user.id }).then((res) => {
        setDepartamento("DAMOP")

        setSolicitud(res.RESPONSE);
        console.log(res.RESPONSE)
        setOpenSlider(false);
      });
    } else if (user.DEPARTAMENTOS[0].NombreCorto == "DPCP") {
      CatalogosServices.SolicitudesInfo({ NUMOPERACION: 6, CHUSER: user.id }).then((res) => {
        setDepartamento("DPCP")
        setSolicitud(res.RESPONSE);
        console.log(res.RESPONSE)
        setOpenSlider(false);
      });
    } else if (user.DEPARTAMENTOS[0].NombreCorto == "MUN") {

      CatalogosServices.SolicitudesInfo({ NUMOPERACION: 4, CHUSER: user.id }).then((res) => {
        setDepartamento("MUN")
        setSolicitud(res.RESPONSE);
        console.log(res.RESPONSE)
        setOpenSlider(false);
      });
    }


  }

  const columns: GridColDef[] = [
    { field: "id", hide: true, },
    { field: "IdEstatus", hide: true, },
    { field: "IdArchivo", hide: true, },
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Ver detalle de Cálculo",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <Grid container >
            {v.row.ControlInterno == "MUN_INICIO" ?
              <Grid item xs={8}>
                <BotonesAcciones handleAccion={handleAccion} row={v} editar={editar} eliminar={eliminar}></BotonesAcciones>
              </Grid>
              :
              <Grid item xs={8}>
              </Grid>
            }
            <Grid item xs={2}>
              <Tooltip title={"Visualizar Detalles"}>
                <IconButton onClick={() => handleVisualizarDetalles(v)}>
                  <DescriptionIcon />
                </IconButton>
              </Tooltip>

            </Grid>
          </Grid>
        );
      },
    },
    { field: "Proyecto", headerName: "Proyecto", width: 120, },
    { field: "Proveedor", headerName: "Proveedor", width: 120, },
    { field: "Fondo", headerName: "Fondo", width: 120, },
    { field: "Concepto", headerName: "Concepto", width: 250, },
    { field: "Tipo", headerName: "Tipo", width: 120, },
    { field: "Total", headerName: "Total", width: 120, ...Moneda },
    { field: "Fecha", headerName: "Fecha", width: 120, },
    {
      field: "Comentario", headerName: " Comentario", width: 150, },
    {
      field: "seguimiento",
      headerName: "Seguimiento",
      description: "Ver detalle de Cálculo",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <Box>

            {
              /////////////////////////////  ver trazabilidad //////////////////////////////
            }
            {verTraz ? (
              <Tooltip title={"Ver Trazabilidad"}>
                <ToggleButton value="check" onClick={() => handleVerTazabilidad(v)}>
                  <InsightsIcon />
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}
            {
              /////////////////////////////// ENVIAR ////////////////////////////////////////////
            }
            {
              perfiles.find(({ estatusRef, accion, per, dep }) => estatusRef == v.row.ControlInterno && accion === "enviar" && per === perfil && dep == departamento) ?

                //departamento == "MUN" && v.row.ControlInterno == "MUN_INICIO" ?
                <Tooltip title={"Enviar"}>
                  <ToggleButton
                    value="check"
                    onClick={() =>
                      handleSeg(v, String(perfiles.find(({ estatusRef, accion, per, dep }) => estatusRef == v.row.ControlInterno && accion === "enviar" && per === perfil && dep == departamento)?.estatus))}>
                    <SendIcon />
                  </ToggleButton>
                </Tooltip>
                : ""}

            {
              /////////////////////////////////////atender solicitudes/////////////////////////////////////////////
            }
            {
              perfiles.find(({ estatusRef, accion, per, dep }) => estatusRef == v.row.ControlInterno && accion === "autorizar" && per === perfil && dep == departamento) ?

                // (departamento == "DAMOP" && user.PERFILES[0].Referencia == "ANA") && v.row.ControlInterno == "DAMOP_INICIO" || v.row.ControlInterno == "DAMOP_REG_COR_ANA" ?
                <Tooltip title={"Atender Solicitud"}>
                  <ToggleButton
                    value="check"
                    onClick={() =>
                      handleSeg(v, String(perfiles.find(({ estatusRef, accion, per, dep }) => estatusRef == v.row.ControlInterno && accion === "autorizar" && per === perfil && dep == departamento)?.estatus))}>
                    <DoneIcon />
                  </ToggleButton>
                </Tooltip>
                : ""}
          </Box>
        );
      },
    },
  ];

  const handleSeg = (data: any, estatus: string,) => {
    console.log(estatus);
    if ((estatus != "AUTORIZAR" && estatus != "CANCELADO")) {
      let d = {
        NUMOPERACION: 5,
        CHID: data.id,
        CHUSER: user.id,
        ESTATUS: estatus,
        Comentario: data?.row?.Comentario,
        ANIO:hoy.getFullYear(),
        MES: (hoy.getMonth()+1) 
      };

      Swal.fire({
        icon: "info",
        title: "Enviar",
        text: "Desea Enviar la Solicitud",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          CatalogosServices.SolicitudesInfo(d).then((res) => {
            if (res.SUCCESS) {
              console.log(res.RESPONSE)
              handleClose();
            } else {

              AlertS.fire({
                title: "Error!",
                text: "Fallo en la peticion",
                icon: "error",

              });
            }
          });
        }
        if (result.isDenied) {
        }
      });

    }
    //else 
    ///if (departamento == "DAMOP") {
    //  if (perfil == "ANA" || perfil == "COOR"||perfil == "DIR") {
    //  setOpenSeg(true);
    //   setData(data.row);
    //    setModo(estatus);
    //  }

    //}
    else {
      setOpenSeg(true);
      setData(data.row)
    }
  }
  const handleClose = () => {
 
    setOpen(false);
    setOpenSeg(false);
    setOpenTraz(false);
    consulta();

  };
  const Solicitar = () => {
    setOpen(true);
    setModo("nuevo");

  };
  const handleAccion = (v: any) => {

    if(v.tipo ==1){
      setModo("editar");
      setOpen(true);
      setData(v.data);
    }else if(v.tipo ==2){
      handleBorrar(v.data);
    }

  };
  const handleBorrar = (v: any) => {
console.log(v);

let d = {
  NUMOPERACION: 8,
  CHID: v.id,
  CHUSER: user.id,
};

Swal.fire({
  icon: "info",
  title: "Enviar",
  text: "Desea Eliminar La Solicitud",
  showDenyButton: false,
  showCancelButton: true,
  confirmButtonText: "Aceptar",
  cancelButtonText: "Cancelar",
}).then((result) => {
  if (result.isConfirmed) {
    CatalogosServices.SolicitudesInfo(d).then((res) => {
      if (res.SUCCESS) {
        console.log(res.RESPONSE)
        handleClose();
      } else {

        AlertS.fire({
          title: "Error!",
          text: "Fallo en la peticion",
          icon: "error",

        });
      }
    });
  }
  if (result.isDenied) {
  }
});

  };
  const handleVerTazabilidad = (v: any) => {

    setOpenTraz(true);
    setIdSolicitud(v.row.id)
  };
  const handleVisualizar = (v: any) => {
    setModo("ver");
    setOpen(true);
    console.log(v.row)
    setData(v.row);

  };
  const handleVisualizarDetalles = (v: any) => {
    setModo("verDetalles");
    setOpen(true);
    console.log(v.row)
    setData(v.row);

  };

  useEffect(() => {
    console.log(hoy.getMonth() + "  " + hoy.getFullYear());
    setPerfil(user.PERFILES[0].Referencia);
    console.log(permisos.map)
    console.log("departamento  " + user.DEPARTAMENTOS[0].NombreCorto)
    console.log("perfil " + user.PERFILES[0].Referencia)
    setPerfil(user.PERFILES[0].Referencia);

    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "SOLIANT") {
        if (String(item.Referencia) == "AGREG") {
          setAgregar(true);
        }
        if (String(item.Referencia) == "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) == "EDIT") {
          setEditar(true);
        }
        if (String(item.Referencia) == "TRAZA") {
          setVertraz(true);
        }

      }
    });
    consulta();
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <Box>

        <Slider open={openSlider}></Slider>

        <Grid container spacing={2} sx={{ justifyContent: "center", }} >
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Titulo name={"solicitudes de Pago"} />
            </Box>
          </Grid>
        </Grid>
        <Grid
          container spacing={1}
          sx={{ display: "flex", justifyContent: "center", }} >

        </Grid>
        <Grid
          container spacing={1}
          sx={{ justifyContent: "center", width: "100%" }} >

        </Grid>
        <Grid container
          sx={{ justifyContent: "center", width: '100%' }} >

          <Grid container>
            <Grid item xs={1} >
              {agregar ?
                <Tooltip title={"Agregar"}>
                  <ToggleButton value="check" onClick={() => Solicitar()}>
                    <AddIcon />
                  </ToggleButton>
                </Tooltip> : ""
              }
            </Grid>
            <Grid item xs={3}>


            </Grid>
            <MUIXDataGrid columns={columns} rows={solicitud} />
          </Grid>
        </Grid>

      </Box>

      {open ?
        <OpModal modo={modo} data={data} handleClose={handleClose} />
        :
        ""
      }

      {openSeg ?
        <ComentariosRecursosModal
          modo={modo}
          data={data}
          open={openSeg}
          handleClose={handleClose}
          perfil={String(perfil)}
          departamento={String(departamento)} />
        :
        ""
      }
      {openTraz ?
        <TrazabilidadSolicitud dt={{
          TIPO: 1,
          CHID: idSolicitud,
        }
        } open={openTraz} handleClose={handleClose} />
        :
        ""
      }
    </div>
  )
}

export default Op
