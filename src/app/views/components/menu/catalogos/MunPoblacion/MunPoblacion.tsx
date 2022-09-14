import React, { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Input, LinearProgress, Modal, TextField, Typography } from '@mui/material'
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
  const [NumPobladores, setNumPobladores]=useState();
  const [NuevoNumPobladores, setNuevoNumPobladores]=useState('');




  const onChangeNumPobladores= (v:React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = v.target.value;
    setNuevoNumPobladores(enteredName);




    console.log("set nuevo numero de pobladores" , enteredName);
    console.log("v target name ", v.target.name);
    console.log("nuevo numero de pobladores ", NumPobladores);
    console.log("valor de pobladorere" ,v.target.value);

    };


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

  console.log(NumPobladores)
  setModo("Guardar Cambios");
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
      <Dialog open={open} onClose={handleClose} >
      <Box >
      <DialogTitle >{modo}   {Municipio}</DialogTitle>

      {/* <AdmDatos/> */}
 

     <DialogContent>Año: {Año}</DialogContent>
     <div>

   
     </div>

     <DialogContentText>
     <DialogContent>Pobladores:  {NumPobladores}</DialogContent>
    
     </DialogContentText>
    

    
    <TextField 
    id="filled-multiline-static"
    label="Pobladores"
    
    name="Pobladores"
    onChange={onChangeNumPobladores}
    margin="normal"
    focused={true}

/>  
     
     {/* <AdmDatos toggle={handleClose}/> */}

      <DialogActions>
        <Button onClick={handleClose}> {modo} </Button>
        <Button onClick={ handleClose }>Cancel</Button>
     
      </DialogActions>
      </Box>
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
function setQuery(enteredName: any) {
  throw new Error('Function not implemented.')
}

