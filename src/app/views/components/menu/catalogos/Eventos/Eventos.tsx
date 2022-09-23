import React, { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LinearProgress, Modal, TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material'
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
import EventosModal from './EventosModal';
import Buttons from '../Utilerias/Buttons';
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import Slider from "../../../Slider";

export const Eventos = () => {
    
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [nuevoEvento, setNuevoEvento] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [plantilla, setPlantilla] = useState("");
  const [conEventos, setEventos] = useState([]);
  const [slideropen, setslideropen] = useState(false);


const columns: GridColDef[] = [
   
   
    { field: "Nombre", headerName: "Nombre", width: 200 },
    { field: "Descripcion", headerName: "Descripcion", width: 600 },
    { field: "FechaInicio", headerName: "Fecha de Inicio", width: 150 },
    { field: "FechaFin", headerName: "Fecha de Finalizado", width: 100 },
    { field: "Imagen"  , headerName: "Imagen", width: 100  ,  
    
    renderCell:(v) =>{
       return (

      <Box>
      <IconButton onClick={() => handleVisualizar(v)}>
      <img    id="imagen" src={v.row.Imagen}  style={{ width: "2vw" }}   />
     
        </IconButton>
      </Box>
    );
  
  },
  },

   
  ];

  
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setslideropen(true);
    let file = event?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlsx");
    formData.append("tipo", "MunFacturacion");
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Carga Exitosa!",
        });
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
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
      CatalogosServices.munfacturacion(data).then((res) => {
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
            <AddIcon />
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
          nuevoEvento={nuevoEvento}
          dt={data}

        />
      ) : (
        ""
      )}


  </div>

  
  )
}

