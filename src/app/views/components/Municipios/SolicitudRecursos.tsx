import React, { useEffect, useState } from 'react'
import { Box, Dialog, Grid, IconButton, ToggleButton, Tooltip } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid';
import { CatalogosServices } from '../../../services/catalogosServices';
import BotonesAPD from '../componentes/BotonesAPD'
import { Titulo } from '../menu/catalogos/Utilerias/AgregarCalculoUtil/Titulo';
import MUIXDataGrid from '../MUIXDataGrid';
import Slider from '../Slider';
import AddIcon from '@mui/icons-material/Add';
import { SolicitudModal } from './SolicitudModal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BotonesAcciones from '../componentes/BotonesAcciones';
import DoneIcon from '@mui/icons-material/Done';
import SendIcon from '@mui/icons-material/Send';
import { ComentariosRecursosModal } from './ComentariosRecursosModal';
import Swal from 'sweetalert2';
import { Alert } from '../../../helpers/Alert';
import { PERMISO, RESPONSE } from '../../../interfaces/user/UserInfo';
import { getPermisos, getUser } from '../../../services/localStorage';
import DescriptionIcon from '@mui/icons-material/Description';
import BotonesOpciones from '../componentes/BotonesOpciones';
import InsightsIcon from "@mui/icons-material/Insights";
import TrazabilidadSolicitud from '../TrazabilidadSolicitud';



const SolicitudRecursos = () => {
  const [solicitud, setSolicitud] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSlider, setOpenSlider] = useState(false);
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [openTraz, setOpenTraz] = useState(false);

  const [openSeg, setOpenSeg] = useState(false);
  const [numOperacion, setNumOperacion] = useState(4);
  const [modo, setModo] = useState("");
  const [departamento, setDepartamento] = useState<string>();
  const [perfil, setPerfil] = useState<string>();
  const [idSolicitud ,setIdSolicitud] = useState<string>();

  const [tipoOperacion, setTipoOperacion] = useState("");
  const [data, setData] = useState({});
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [verTraz ,setVertraz] = useState<boolean>(false);

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
            {v.row.Descripcion == "INICIO" ?
              <Grid item xs={8}>
                <BotonesAcciones handleAccion={handleAccion} row={v} editar={editar} eliminar={eliminar}></BotonesAcciones>
              </Grid>
              :
              <Grid item xs={8}>
              </Grid>
            }
            <Grid item xs={2}>
              <Tooltip title={"Vizualizar Detalles"}>
                <IconButton onClick={() => handleVisualizarDetalles(v)}>
                  <DescriptionIcon />
                </IconButton>
              </Tooltip>

            </Grid>
          </Grid>
        );
      },
    },
    { field: "Concepto", headerName: "Concepto", width: 250, },
    { field: "Total", headerName: "Total", width: 120 },
    {
      field: "RutaArchivo", headerName: " Archivo", width: 120,
      renderCell: (v) => {
        return (
          <Box>
            {v.row.RutaArchivo ?
              <Tooltip title={"Vizualizar Documento"}>
                <IconButton onClick={() => handleVisualizar(v)}>
                  <VisibilityIcon />
                </IconButton>
              </Tooltip >

              : ""}


          </Box>
        );
      },
    },
    { field: "NombreArchivo", headerName: "Nombre Archivo", width: 300 },
    { field: "RutaSpei", headerName: " Spei", width: 120 },
    {
      field: "Descripcion", headerName: "Estatus", width: 230,
      renderCell: (v) => {
        return (
          <Box>
            {v.row.Descripcion == "INICIO" && departamento == "MUN" ?
              "INICIO"
              : ""}
            {departamento == "MUN" && v.row.Descripcion == "ENVIADO" ?
              "ENVIADO"
              :
              ""}
            {departamento == "MUN" && v.row.Descripcion == "ANALISTA DAMOP CANCELA" ?
              "Cancelado"
              :
              departamento == "MUN" && v.row.Descripcion != "ENVIADO" && v.row.Descripcion != "INICIO" ?
                "ENVIADO"
                :
                ""}
            {departamento != "MUN" ?
              v.row.Descripcion
              : ""
            }

          </Box>
        );
      },
    },
    {
      field: "seguimiento",
      headerName: "Seguimiento",
      description: "Ver detalle de Cálculo",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <Box>


            {departamento == "MUN" && v.row.Descripcion == "INICIO" ?
              <Tooltip title={"Enviar"}>
                <ToggleButton value="check" onClick={() => handleSeg(v, "ENVIADO", "MUN", "MUN")}>
                  <SendIcon />
                </ToggleButton>
              </Tooltip>
              : ""}

           {departamento == "DAMOP" && user.PERFILES[0].Referencia == "ANA" && v.row.Descripcion == "ENVIADO" || v.row.Descripcion == "CODAMOPCAN" ?
              <Tooltip title={"Atender Solicitud"}>
                <ToggleButton value="check" onClick={() => handleSeg(v, "ATENDER", "DAMOP", "ANA")}>
                  <DoneIcon />
                </ToggleButton>
              </Tooltip>
               : ""} 

            {verTraz ? (
            <Tooltip title={"Ver Trazabilidad"}>
              <ToggleButton value="check" onClick={() => handleVerTazabilidad(v)}>
                <InsightsIcon />
              </ToggleButton>
            </Tooltip>
          ) : (
            ""
          )}           

          </Box>
        );
      },
    },
  ];

  const handleSeg = (data: any, estatus: string, departamento: string, perfil: string) => {
    if (estatus == "ENVIADO" && departamento == "MUN") {
      let d = {
        NUMOPERACION: 5,
        CHID: data.id,
        CHUSER: user.id,
        ESTATUS: estatus,
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

              Alert.fire({
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
    else if (departamento == "DAMOP") {
      if (perfil == "ANA") {
        setOpenSeg(true);
        setData(data.row);
        setModo(estatus);



      }


    }
    else if (estatus == "AUTORIZADO") {
      setTipoOperacion(estatus);
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
  const handleAccion = () => {

  };
  
  const handleVerTazabilidad = (v:any) => {

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
              <Titulo name={"Solicitud de Recurso "} />
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
        <SolicitudModal modo={modo} data={data} open={open} handleClose={handleClose} /> : ""}
      {openSeg ?
        <ComentariosRecursosModal modo={modo} data={data} open={openSeg} handleClose={handleClose} perfil={String(perfil)} />
        : ""
      }
      {openTraz?
      <TrazabilidadSolicitud id={String(idSolicitud)} open={openTraz} handleClose={handleClose}/>
      :
      ""
      }
    </div>
  )
}

export default SolicitudRecursos
