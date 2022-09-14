
     import React, { useEffect, useState } from 'react'
     import { Box, Button, Dialog, DialogActions, 
       DialogContent, DialogContentText, DialogTitle, IconButton, 
       Input, LinearProgress, Modal, SelectChangeEvent, TextField, Typography } from '@mui/material'
     import { DataGrid, esES, GridColDef } from '@mui/x-data-grid'
     import { CustomNoRowsOverlay } from '../../CustomNoRowsOverlay'
     import { CustomToolbar } from '../../CustomToolbar'
     import { getUser } from '../../../../../services/localStorage'
     import { CatalogosServices } from '../../../../../services/catalogosServices'
     import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
     import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
     import AddIcon from '@mui/icons-material/Add';
     import { messages } from '../../../../styles'
     import Swal from 'sweetalert2'
     import { Toast } from '../../../../../helpers/Toast'
     import { Alert } from "../../../../../helpers/Alert";
     import Filtros from '../Utilerias/Filtros'
     import Slider from "../../../Slider";
     import MunFacturacionModal from '../MunFacturacion/MunFacturacionModal'
     import Buttons from '../Utilerias/Buttons'
     import MunPoblacionModal from './MunPoblacionModal'
     
     
     
     export const MunPoblacion = () => {
     
       const user = getUser();
       const [modo, setModo] = useState("");
       const [open, setOpen] = useState(false);
       const [tipoOperacion, setTipoOperacion] = useState(0);
       const [data, setData] = useState({});
       const [Poblacion, setPoblacion] = useState([]);
       const [plantilla, setPlantilla] = useState("");
       const [slideropen, setslideropen] = useState(false);
       // VARIABLES PARA LOS FILTROS
       const [filterAnio, setFilterAnio] = useState("");
       //funciones
       const handleFilterMes = () => {};
     
     
       
       
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
     
       
       const handleClose = () => {
       
       setOpen(false);
     }
     
     
     const handleOpen = (v: any) => {
       setTipoOperacion(1);
       setModo("Agregar Registro");
       setOpen(true);
       setData("");
     };
     
     
     
       const handleEditar = (v:any) => { 
       console.log(v)
       setTipoOperacion(2);
       setModo("Editar Registro");
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
     
             CatalogosServices.munpoblacion(data).then((res) => {
               if (res.SUCCESS) {
                 Toast.fire({
                   icon: "success",
                   title: "Registro Eliminado!",
                 });
     
     
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
       
     
     
       const handleAgregar =(event: React.ChangeEvent<HTMLInputElement>) => {
         setslideropen(true);
         let file = event?.target?.files?.[0] || "";
         const formData = new FormData();
         formData.append("inputfile", file, "inputfile");
         formData.append("tipo", "MunPoblacion");
         CatalogosServices.migraData(formData).then((res) => {
           setslideropen(false);
         });
       };
     
     
       const consulta = (data: any) => {
         CatalogosServices.munpoblacion(data).then((res) => {
     
           console.log('respuesta'+res.RESPONSE + res.NUMCODE);
     
     
     
           if (res.SUCCESS) {
             Toast.fire({
               icon: "success",
               title: "Consulta Exitosa!",
             });
        
             setPoblacion(res.RESPONSE); 
                 console.log('respuesta'+setPoblacion);
           } else {
             Alert.fire({
               title: "Error!",
               text: res.STRMESSAGE,
               icon: "error",
             });
           }
         });
       };
     
     
     
       const handleFilterChange = (event: SelectChangeEvent) => {
         //setFilterAnio(event.target.value);
         
         let data = {
          NUMOPERACION: 4,
          NUMANIO: event.target.value,
           
         };
         console.log(event.target.value +'valor de event');
          
         consulta(data);
       };
     
       const downloadplantilla = () => {
         let data = {
           NUMOPERACION: "MUNICIPIO_POBLACION",
         };
     
         CatalogosServices.descargaplantilla(data).then((res) => {
           setPlantilla(res.RESPONSE);
         });
       };
     
       useEffect(() => {
         downloadplantilla();
       }, []);
     
     
     
     
       return (
     
     
         <div style={{ height: 600, width: "100%" }}>
           <Slider open={slideropen}></Slider>
     
           <Filtros
             anioApply={true}
             mesApply={false}
             handleFilterChangeAnio={handleFilterChange}
             handleFilterChangeMes={handleFilterMes}
             valueFilterAnio={filterAnio}
             valueFilterMes={""}
           />
     
           {open ? (
             <MunPoblacionModal
               open={open}
               modo={modo}
               handleClose={handleClose}
               tipo={tipoOperacion}
               dt={data}
             />
           ) : (
             ""
           )}
     
           <Buttons
             handleOpen={handleOpen}
             url={plantilla}
             handleUpload={handleAgregar}
           />
     
           <DataGrid
             //checkboxSelection
             pagination
             localeText={esES.components.MuiDataGrid.defaultProps.localeText}
             components={{
               Toolbar: CustomToolbar,
               LoadingOverlay: LinearProgress,
               NoRowsOverlay: CustomNoRowsOverlay,
             }}
             rowsPerPageOptions={[5, 10, 20, 50, 100]}
             rows={Poblacion}
             columns={columns}
     
             // loading //agregar validacion cuando se esten cargando los registros
           />
         </div>
     
       
       )
     }
     
     