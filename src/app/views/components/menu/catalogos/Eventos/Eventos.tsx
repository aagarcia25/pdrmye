import React, { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LinearProgress, Modal, TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material'
import { DataGrid, esES, GridColDef } from '@mui/x-data-grid'
import { messages } from '../../../../styles'
import logo from '../../../../../assets/img/logo.svg';
import { CustomNoRowsOverlay } from '../../CustomNoRowsOverlay'
import { CustomToolbar } from '../../CustomToolbar'
import { getUser } from '../../../../../services/localStorage'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate, } from 'react-router-dom';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import PanoramaIcon from '@mui/icons-material/Panorama';
import EventosModal from './EventosModal';
import Buttons from '../Utilerias/Buttons';
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import Swal from "sweetalert2";
import AccionesGrid from "../../../AccionesGrid";

import "../Eventos/globals.css";
import { FileDownload } from '@mui/icons-material';



export const Eventos = () => {
    
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [EditImage, setEditImage] = useState(false);
  const [nuevoEvento, setNuevoEvento] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [plantilla, setPlantilla] = useState("");
  const [conEventos, setEventos] = useState([]);



const columns: GridColDef[] = [
   
  { field: "id", headerName: "Identificador", hide:true , width: 150   , description:messages.dataTableColum.id},
    { field: "Nombre", headerName: "Nombre", width: 200 },
    { field: "Descripcion", headerName: "Descripcion", width: 200, description: 'Descripcion', resizable: true,
    
  },
    { field: "FechaInicio", headerName: "Fecha de Inicio", width: 200 },
    { field: "FechaFin", headerName: "Fecha de Finalizado", width: 200 },
    { field: "Imagen"  , headerName: "Imagen", width: 100  ,  
    
    renderCell:(v) =>{
       return (

      <Box>
      <IconButton onClick={() => handleVisualizar(v)}>
      <img    id="imagen" src={v.row.Imagen}  style={{ width: "2vw" ,objectFit:"scale-down"}}   />
     
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
        <Box>
          <IconButton onClick={() => handleEditar(v)}>
            <ModeEditOutlineIcon />
          </IconButton>
          <IconButton onClick={() => handleBorrar(v)}>
            <DeleteForeverIcon />
          </IconButton>
        </Box>
      );
    },
  },
 
   
  ];

  const handleEditar = (v:any) => { 
    console.log(v)
    setTipoOperacion(2);
    setModo("Editar");
    setOpen(true);
    setData(v);
    };


    const handleBorrar = (v:any) => {
     
      Swal.fire({
        icon: "info",
        title: "Estas seguro de eliminar este registro?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(v);
  
          let data = {
            NUMOPERACION: 3,
            CHID: v.row.id,
            CHUSER: 1,
          };
          console.log(data);
  
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
              Alert.fire({
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


  const handleNuevoRegistro = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Evento");
    setOpen(true);
    //setData(v);
    setNuevoEvento(true);
  };

  const handleVisualizar = (v: any) => {
    setTipoOperacion(2);
    setModo("Evento");
    setOpen(true);
    setData(v);
    setNuevoEvento(false);
  };

  const handleClose = () => {
    console.log('cerrando');
    setOpen(false);
    let data = {
      NUMOPERACION: 4,
      CHUSER:1,
    };
    consulta(data);

  };


    let dat = ({
      NUMOPERACION: 4,
      CHUSER:1
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
          Alert.fire({
            title: "Error!",
            text: res.STRMESSAGE,
            icon: "error",
          });
        }
      });
    };
    
    useEffect(() => {
      CatalogosServices.eventos(dat).then((res) => {
      //  console.log(res);
        setEventos(res.RESPONSE);
      });
    }, []);

  return (


    <div style={{ height: 600, width: "100%" }} >
    
   
    <Box sx={{}}>
      <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
        <Tooltip title="Agregar Registro">
          <ToggleButton value="check" onClick={() => handleNuevoRegistro(1)}>
            <AddCircleTwoToneIcon />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
    </Box>
    <DataGrid
      //checkboxSelection
      pagination
      localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      components={{
        Toolbar: CustomToolbar,
        LoadingOverlay: LinearProgress ,
        NoRowsOverlay: CustomNoRowsOverlay,
      }}
      rowsPerPageOptions={[5,10,20,50,100]}
      rows={conEventos}
      columns={columns}
      
     // loading //agregar validacion cuando se esten cargando los registros
    />

{open ? (
        <EventosModal
          open={open}
          modo={modo}
          handleClose={handleClose}
          tipo={tipoOperacion}
          handleEditar={handleEditar}
          dt={data}

        />
      ) : (
        ""
      )}


  </div>

  
  )
}

