import React, { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LinearProgress, Modal, TextField, Typography } from '@mui/material'
import { DataGrid, esES, GridColDef } from '@mui/x-data-grid'

import { CustomNoRowsOverlay } from '../../CustomNoRowsOverlay'
import { CustomToolbar } from '../../CustomToolbar'
import { getUser } from '../../../../../services/localStorage'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { messages } from '../../../../styles'

export const Umas = () => {
    

    
    





  const user = getUser();
  const [conUmas, setUmas] = useState([]);

  const [open, setOpen] = useState(false);

const columns: GridColDef[] = [
   
   
    { field: "Anio", headerName: "Año", width: 150 },
    { field: "Diario", headerName: "Diario", width: 150 },
    { field: "Mensual", headerName: "Mensual", width: 150 },
    { field: "Anual", headerName: "Anual", width: 150 },
   
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
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
      CatalogosServices.umas(data).then((res) => {
      //  console.log(res);
        setUmas(res.RESPONSE);
      });
    }, []);






  return (


    <div style={{ height: 600, width: "100%" }} >
        <DetailsModal />
    <ButtonAdd/>    
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
      rows={conUmas}
      columns={columns}
      
     // loading //agregar validacion cuando se esten cargando los registros
    />
  </div>

  
  )
}

