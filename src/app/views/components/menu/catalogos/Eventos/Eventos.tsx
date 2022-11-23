import { useEffect, useState } from 'react'
import { Box, IconButton, } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { messages } from '../../../../styles'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import EventosModal from './EventosModal';
import { Toast } from "../../../../../helpers/Toast";
import { AlertS } from "../../../../../helpers/AlertS";
import Swal from "sweetalert2";
import "../../../../../styles/globals.css";
import MUIXDataGrid from '../../../MUIXDataGrid'
import ButtonsAdd from '../Utilerias/ButtonsAdd'
import { getPermisos, getUser } from '../../../../../services/localStorage'
import { PERMISO, RESPONSE } from '../../../../../interfaces/user/UserInfo'
import BotonesAcciones from '../../../componentes/BotonesAcciones'



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

  const columns: GridColDef[] = [

    { field: "id", headerName: "Identificador", hide: true, width: 150, description: messages.dataTableColum.id },
    { field: "Nombre", headerName: "Nombre", width: 200 },
    {
      field: "Descripcion", headerName: "Descripcion", width: 200, description: 'Descripcion', resizable: true,

    },
    { field: "FechaInicio", headerName: "Fecha de Inicio", width: 200 },
    { field: "FechaFin", headerName: "Fecha de Finalizado", width: 200 },
    {
      field: "Imagen", headerName: "Imagen", width: 100,

      renderCell: (v) => {
        return (

          <Box>
            <IconButton onClick={() => handleVisualizar(v)}>
              <img id="imagen" src={v.row.Imagen} style={{ width: "2vw", objectFit: "scale-down" }} />
            </IconButton>
          </Box>
        );

      },
    },
    {
      field: "acciones",
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

  ];
  const handleAccion = (v: any) => {
    if(v.tipo ===1){
      setTipoOperacion(2);
      setModo("Editar");
      setOpen(true);
      setData(v.data);
    }else if(v.tipo ===2){
      handleBorrar(v.data);
    }
  }

   const handleBorrar = (v: any) => {

    Swal.fire({
      icon: "info",
      title: "Estas seguro de eliminar este registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        //console.log(v);

        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.id
        };
        //console.log(data);

        CatalogosServices.eventos(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Registro Eliminado!",
            });

            let data = {
              NUMOPERACION: 4,

            };
            consulta(data);
          } else {
            AlertS.fire({
              title: "Error!",
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
    //setData(v);

  };

  const handleVisualizar = (v: any) => {
    setTipoOperacion(2);
    setModo("Evento");
    setOpen(true);
    setData(v);

  };

  const handleClose = () => {
    //console.log('cerrando');
    setOpen(false);
    let data = {
      NUMOPERACION: 4,
      CHUSER: user.id
    };
    consulta(data);

  };


  let dat = ({
 

    NUMOPERACION: 4,
    CHUSER: user.id
  })

  const consulta = (data: any) => {
    CatalogosServices.eventos(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setEventos(res.RESPONSE);
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
    CatalogosServices.eventos(dat).then((res) => {
      //  //console.log(res);
      setEventos(res.RESPONSE);
    });
  }, []);

  return (


    <div style={{ height: 600, width: "100%" }} >

      {open ? <EventosModal
        open={open}
        modo={modo}
        handleClose={handleClose}
        tipo={tipoOperacion}
        dt={data}
      />
        : ""}

      <Box sx={{}}>
       
      </Box>
      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
      <MUIXDataGrid columns={columns} rows={conEventos} />






    </div>


  )
}

