import React, { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LinearProgress, Modal, TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material'
import { DataGrid, esES, GridColDef } from '@mui/x-data-grid'
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

import { CustomNoRowsOverlay } from '../../CustomNoRowsOverlay'
import { CustomToolbar } from '../../CustomToolbar'
import { getUser } from '../../../../../services/localStorage'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { messages } from '../../../../styles'
import MUIXDataGrid from '../../../MUIXDataGrid';

export const Municipios = () => {
    

    
    





  const user = getUser();
  const [Municipio, setMunicipio] = useState([]);

  const [open, setOpen] = useState(false);

const columns: GridColDef[] = [
    { field: "id",hide:true, headerName: "Identificador", width: 150   , description:messages.dataTableColum.id},
    { field: "ClaveEstado", headerName: "Clave Estado", width: 120 },
    { field: "Nombre", headerName: "Municipio", width: 250 },
   
    //{ field: "ClaveMun", headerName: "Clave Municipio", width: 150 },
    { field: "MAM", headerName: "Área Metropolitana", width: 150 },
    { field: "Descentralizado", headerName: "Descentralizado", width: 120 },
    { field: "NombreCorto", headerName: "Nombre Corto", width: 250 },
    { field: "OrdenSFTGNL", headerName: "Orden SFTGNL", width: 120 },
    { field: "ClaveSIREGOB", headerName: "Clave SIREGOB", width: 120 },
    
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <Box>
            <IconButton onClick={() => handleOpen(v)}>
              <ModeEditOutlineIcon />
            </IconButton>
            <IconButton onClick={() => handleOpen(v)}>
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        );
      },
    },
   
  ];
  
  const handleOpen = (v: any) => {
    //setSelectedId(v.row.lastName);

    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const ButtonAdd = () =>{
    return (
   <Box>
     <IconButton color="primary" aria-label="upload picture" component="label" onClick={() => handleOpen(1)}>
           <AddIcon />
      </IconButton>
   </Box>
    );
  }


  const DetailsModal = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
    );
  };

  


   
  
    let data = ({
      NUMOPERACION: 4,
      CHID: "",
      NUMANIO: "",
      NUMTOTALPOB: "",
      CHUSER:1
    })
  
  
    useEffect(() => {
      CatalogosServices.municipios(data).then((res) => {
      //  console.log(res);
        setMunicipio(res.RESPONSE);
      });
    }, []);






  return (


    <div style={{ height: 600, width: "100%" }} >
     <Box>
    
    </Box>

    <MUIXDataGrid columns={columns} rows={Municipio} />
      
    
   
  </div>

  
  )
}

