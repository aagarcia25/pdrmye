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




const SolicitudRecursos = () => {
  const [solicitud, setSolicitud] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSlider, setOpenSlider] = useState(false);
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));

  const [openSeg, setOpenSeg] = useState(false);
  const [numOperacion, setNumOperacion] = useState(4);
  const [modo, setModo] = useState("");
  const [departamento, setDepartamento] = useState<string>();

  const [tipoOperacion, setTipoOperacion] = useState("");
  const [data, setData] = useState({});
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
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
          <Box>
            {v.row.Descripcion == "INICIO" ?
              <BotonesAcciones handleAccion={handleAccion} row={v} editar={editar} eliminar={eliminar}></BotonesAcciones>
              :
              ""
            }
          </Box>
        );
      },
    },
    { field: "Concepto", headerName: "Concepto", width: 250 },
    { field: "Total", headerName: "Total", width: 120 },
    {
      field: "RutaArchivo", headerName: " Archivo", width: 120,
      renderCell: (v) => {
        return (
          <Box>
            {v.row.RutaArchivo ?
              <IconButton onClick={() => handleVisualizar(v)}>
                <VisibilityIcon />
              </IconButton>
              : ""}

          </Box>
        );
      },
    },
    { field: "NombreArchivo", headerName: "Nombre Archivo", width: 300 },
    { field: "RutaSpei", headerName: " Spei", width: 120 },
    { field: "Descripcion", headerName: "Estatus", width: 120 },
    {
      field: "seguimiento",
      headerName: "Seguimiento",
      description: "Ver detalle de Cálculo",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <Box>


            {v.row.Descripcion == "INICIO"&& departamento=="MUN" ?
              <Tooltip title={"Enviar"}>
                <ToggleButton value="check" onClick={() => handleSeg(v, "ENVIADO")}>
                  <SendIcon />
                </ToggleButton>
              </Tooltip>
              :
              <Tooltip title={"Atender Solicitud"}>
                <ToggleButton value="check" onClick={() => handleSeg(v, "AUTORIZADO")}>
                  <DoneIcon />
                </ToggleButton>
              </Tooltip>
            }
          </Box>
        );
      },
    },
  ];

  const handleSeg = (data: any, v: string) => {
    if (v == "ENVIADO") {
      let d = {
        NUMOPERACION: 5,
        CHID: data.id,
        CHUSER: user.id,
        ESTATUS: "ENVIADO",
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
    if (v == "AUTORIZADO") {
      setTipoOperacion(v);
      setOpenSeg(true);
    }
  }
  const handleAccion = (v: any) => {
    //  setTipoOperacion(v);
    // setOpenSeg(true);
    //setModo("Editar ");
    /// setOpen(true);
    // setVrows(v.data);
  }
  const handleClose = () => {
    setOpen(false);
    setOpenSeg(false);
    CatalogosServices.SolicitudesInfo({ NUMOPERACION: numOperacion, CHUSER: user.id }).then((res) => {
      setSolicitud(res.RESPONSE);
      console.log(res.RESPONSE)
    });
  };

  const Solicitar = () => {
    setOpen(true);
    setModo("");

  };
  const handleVisualizar = (v: any) => {
    setModo("ver");
    setOpen(true);
    setData(v.row);

  };

  useEffect(() => {
    console.log(permisos.map)
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
            <Grid item xs={1} md={1} lg={1}>
              {agregar ?
                <Tooltip title={"Agregar"}>
                  <ToggleButton value="check" onClick={() => Solicitar()}>
                    <AddIcon />
                  </ToggleButton>
                </Tooltip> : ""
              }
            </Grid>

          </Grid>
          <MUIXDataGrid columns={columns} rows={solicitud} />
        </Grid>
      </Box>

      {open ?
        <SolicitudModal modo={modo} data={data} open={open} handleClose={handleClose} /> : ""}
      {openSeg ?
        <ComentariosRecursosModal modo={modo} data={data} open={openSeg} handleClose={handleClose} />
        : ""
      }
    </div>
  )
}

export default SolicitudRecursos
