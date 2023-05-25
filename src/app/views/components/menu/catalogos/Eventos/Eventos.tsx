import { Box, IconButton } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import Swal from "sweetalert2"
import { AlertS } from "../../../../../helpers/AlertS"
import { Toast } from "../../../../../helpers/Toast"
import { PERMISO, RESPONSE } from '../../../../../interfaces/user/UserInfo'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import { getPermisos, getUser } from '../../../../../services/localStorage'
import MUIXDataGrid from '../../../MUIXDataGrid'
import Slider from '../../../Slider'
import BotonesAcciones from '../../../componentes/BotonesAcciones'
import NombreCatalogo from '../../../componentes/NombreCatalogo'
import ButtonsAdd from '../Utilerias/ButtonsAdd'
import EventosModal from './EventosModal'
import { VisaulizarImagen } from '../../../componentes/VisaulizarImagen'



export const Eventos = () => {


  const [open, setOpen] = useState(false);
  const [modo, setModo] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [conEventos, setEventos] = useState([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [openSlider, setOpenSlider] = useState<boolean>(true);
  var hoy = new Date()
  var fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2);
  var hora = ('0' + hoy.getHours()).slice(-2) + ':' + ('0' + hoy.getMinutes()).slice(-2);
  var Fecha_min = fecha + 'T' + hora;


  const columns: GridColDef[] = [

    { field: "id", hide: true, },
    {
      field: "acciones", disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <BotonesAcciones handleAccion={handleAccion} row={v} editar={editar} eliminar={eliminar}></BotonesAcciones>

        );
      },
    },

    {
      field: "Imagen", headerName: "Imagen", description: "Imagen", width: 300,
      renderCell: (v) => {
        return (
          <Box>
            
            <IconButton className='IconButtonImagenEventos'  onClick={() => handleVisualizar(v)} >

              <VisaulizarImagen ubicacion={'/EVENTOS/'} name={v.row.Imagen}/>
              {/* <img id="imagen" src={v.row.Imagen} style={{ width: "100%", objectFit: "scale-down" }} /> */}
            </IconButton>
          </Box>
        );

      },
    },
    { field: "Nombre", headerName: "Nombre", description: "Nombre", width: 200 },
    { field: "Descripcion", headerName: "Descripción", description: "Descripción", width: 200, resizable: true, },
    { field: "FechaInicio", headerName: "Fecha de Inicio", description: "Fecha de Inicio", width: 200 },
    { field: "FechaFin", headerName: "Fecha de Finalizado", description: "Fecha de Finalizado", width: 200 },


  ];
  const handleAccion = (v: any) => {
    if (v.tipo === 1) {
      if (Date.parse(v.data.row.FechaInicio) >= Date.parse(Fecha_min)) {
        setTipoOperacion(2);
        setModo("Editar");
        setOpen(true);
        setData(v.data);
      } else {
        Swal.fire("El evento ya Inicio y/o Finalizó no se puede editar", "", "warning");
      }
    } else if (v.tipo === 2) {
      handleBorrar(v.data);
    }
  }

  const handleBorrar = (v: any) => {

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
          CHUSER: user.id
        };
        CatalogosServices.eventos(data).then((res) => {
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


  const handleOpen = () => {
    setTipoOperacion(1);
    setModo("Agregar Evento");
    setOpen(true);
    setData("");
  };

  const handleVisualizar = (v: any) => {
    setTipoOperacion(2);
    setModo("Evento");
    setOpen(true);
    setData(v);

  };  
   const handleOnIdle = () => {
   consulta();
  }



  const handleClose = ( timerId:string) => {
    setOpen(false);
    setOpenSlider(true);
    consulta();
    clearTimeout(timerId);

  };

  const consulta = () => {
    let data = ({
      NUMOPERACION: 4,
      CHUSER: user.id
    })
    CatalogosServices.eventos(data).then((res) => {
      if (res.SUCCESS) {
        setEventos(res.RESPONSE);
        setOpenSlider(false);
        // clearTimeout(timerId);
      } else {

      }
    });
  };

  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "EVENTOS") {
        //console.log(item)
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

    // CatalogosServices.eventos(dat).then((res) => {
    //   //  //console.log(res);
    //   setEventos(res.RESPONSE);
    // });
  }, []);

  return (


    <div style={{ height: 600, width: "100%", paddingLeft: "1%", paddingRight: "1%" }} >
      <Slider open={openSlider} />
      {open ? <EventosModal
        open={open}
        modo={modo}
        handleClose={handleClose}
        tipo={tipoOperacion}
        dt={data}
      />
        : ""}
      <NombreCatalogo controlInterno={"EVENTOS"} />

      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
      <MUIXDataGrid columns={columns} rows={conEventos} />






    </div>


  )
}

