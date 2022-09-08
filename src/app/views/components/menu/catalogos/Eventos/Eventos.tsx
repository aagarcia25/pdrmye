import React, { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LinearProgress, Modal, TextField, Typography } from '@mui/material'
import { DataGrid, esES, GridColDef } from '@mui/x-data-grid'
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
import { Verevento } from './VerEvento';


export const Eventos = () => {
    

 const navigate = useNavigate();
    

  const user = getUser();
  const [conEventos, setEventos] = useState([]);

  const [open, setOpen] = useState(false);
  // const [imagen, setImagen]= useEffect();

const columns: GridColDef[] = [
   
   
    { field: "Nombre", headerName: "Nombre", width: 200 },
    { field: "Descripcion", headerName: "Descripcion", width: 600 },
    { field: "FechaInicio", headerName: "Fecha de Inicio", width: 150 },
    { field: "FechaFin", headerName: "Fecha de Finalizado", width: 100 },
    { field: "Imagen"  , headerName: "Imagen", width: 100 , renderCell:(params) => <img src={params.value} style={{ width: "2vw" }}  /> },

   
  ];



  ;

  const handleClose = () => setOpen(false);

  
    let data = ({
      NUMOPERACION: 4,
      CHID: "",
      NUMANIO: "",
      NUMTOTALPOB: "",
      CHUSER:1
    })
  
  
    useEffect(() => {
      CatalogosServices.eventos(data).then((res) => {
      //  console.log(res);
        setEventos(res.RESPONSE);
      });
    }, []);






  return (


    <div style={{ height: 600, width: "100%" }} >
    
     
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
  </div>

  
  )
}

