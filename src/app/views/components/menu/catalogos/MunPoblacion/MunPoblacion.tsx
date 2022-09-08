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

export const MunPoblacion = () => {
  const user = getUser();
  const [poblacion, setPoblacion] = useState([]);

  const [open, setOpen] = useState(false);
  const [modo, setModo] =useState("");
  const [Municipio, setMunicipio]=useState("");
  const [Año, setAño]=useState("");
  const [NumPobladores, setNumPobladores]=useState("");
  

const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150   , hide:true , description:messages.dataTableColum.id},
    { field: "Nombre", headerName: "Municipio", width: 150 },
    { field: "Anio", headerName: "Año", width: 150 },
    { field: "totalPob", headerName: "Total Población", width: 150 },
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
 
 setModo("Editar");
setMunicipio(v.row.Nombre);
setAño(v.row.Anio);
setNumPobladores(v.row.totalPob);




    setOpen(true);
  };
  const handleBorrar = (v:any) => {
  
 setModo("Borrar");
    setOpen(true);
  };
  const handleAgregar = (v:any) => {
 
 setModo("Agregar");
    setOpen(true);



  };



  const handleClose = () => setOpen(false);

  const ButtonAdd = () =>{
    return (
   <Box>
     <IconButton color="primary" aria-label="upload picture" component="label" onClick={() => handleAgregar(1)}>
           <AddIcon />
      </IconButton>
   </Box>
    );
  }


  const EditarMunPoblacion = (params: any) => {
    return (
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{modo}</DialogTitle>
      <DialogContent>

        <Box>
      
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Municipio"
          value={Municipio}
          type="email"
          fullWidth
          variant="standard"
        />
        
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Año"
          value={Año}
          type="email"
          fullWidth
          variant="standard"
        />
     
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Poblacion Total"
          value={NumPobladores}
          type="email"
          fullWidth
          variant="standard"
        />
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Guardar</Button>
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
      CatalogosServices.munpoblacion (data).then((res) => {
        console.log(res);
        setPoblacion(res.RESPONSE);
      });
    }, []);






  return (


    <div style={{ height: 600, width: '100%' }} >
        <EditarMunPoblacion />
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
      rows={poblacion}
      columns={columns}
      
     // loading //agregar validacion cuando se esten cargando los registros
    />
  </div>

  
  )
}
