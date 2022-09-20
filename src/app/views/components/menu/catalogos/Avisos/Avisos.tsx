import React, { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LinearProgress, Link, Modal, TextField, Typography } from '@mui/material'
import { DataGrid, esES, GridColDef } from '@mui/x-data-grid'

import { CustomNoRowsOverlay } from '../../CustomNoRowsOverlay'
import { CustomToolbar } from '../../CustomToolbar'
import { getUser } from '../../../../../services/localStorage'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';

import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import AvisosModal from './AvisosModal'
//import DescargarArchivo from './DescargarArchivo';

export const Avisos = () => {
    



  const [modo, setModo] = useState("");

  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});


  const [Facturacion, setFacturacion] = useState([]);
  const [plantilla, setPlantilla] = useState("");
  const [slideropen, setslideropen] = useState(false)


  const user = getUser();
  const [conAvisos, setAvisos] = useState([]);

  const [open, setOpen] = useState(false);

const columns: GridColDef[] = [
   
   
    { field: "fechaInicio", headerName: "Fecha de Inicio", width: 200 },
    { field: "FechaFin", headerName: "Expiracion", width: 200 },
    { field: "Nombre", headerName: "Nombre", width: 100 },
    { field: "Descripcion", headerName: "Descripcion", width:500 },
    { field: "Documento", headerName: "Documento", width: 100, renderCell: (v) => { return (
      <Box>
                    
      <IconButton onClick={() => handleVisualizar(v)}>
      <BrowserUpdatedIcon />
      </IconButton>
    </Box>
    );}},
    {
      field: "acciones", headerName: "Acciones", description: "Campo de Acciones",  sortable: false, width: 100, renderCell: (v) => {
        return (
          <Box>
                    
          
          </Box>
        );
      },
    },
   
  ];
  
  const handleVisualizar = (v: any) => {
    setTipoOperacion(2);
    setModo("Editar Registro");
    setOpen(true);
    setData(v);
  };

  const handleClose = () => setOpen(false);

  const ButtonAdd = () =>{
    return (
   <Box>

   </Box>
    );
  }



    let dat = ({
      NUMOPERACION: 4,
      CHID: "",
      NUMANIO: "",
      NUMTOTALPOB: "",
      CHUSER:1
    })
  
  
    useEffect(() => {
      CatalogosServices.avisos(dat).then((res) => {
      //  console.log(res);
        setAvisos(res.RESPONSE);
      });
    }, []);


  return (
    

    <div style={{ height: 600, width: "100%" }} >
   
    <ButtonAdd/>    
    
    {open ? (
        <AvisosModal
          open={open}
          modo={modo}
          handleClose={handleClose}
          tipo={tipoOperacion}
          dt={data}
        />
      ) : (
        ""
      )}
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
      rows={conAvisos}
      columns={columns}
      
     // loading //agregar validacion cuando se esten cargando los registros
    />
  </div>

  
  )
}

