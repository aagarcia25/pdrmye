import React, { useEffect, useState } from 'react'
import { Box, SelectChangeEvent, IconButton, LinearProgress, Modal, TextField, Typography } from '@mui/material'
import { DataGrid, esES, GridColDef, GridColTypeDef } from '@mui/x-data-grid'

import { CustomNoRowsOverlay } from '../../CustomNoRowsOverlay'
import { CustomToolbar, porcentage } from '../../CustomToolbar'
import { getUser } from '../../../../../services/localStorage'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { messages } from '../../../../styles';
import Swal from 'sweetalert2'
import { Toast } from '../../../../../helpers/Toast';
import { Alert } from "../../../../../helpers/Alert";

import Buttons from '../Utilerias/Buttons'
import Filtros from '../Utilerias/Filtros'
import Slider from "../../../Slider";
import MunPobrezaModeradaModal from './MunPobrezaModeradaModal'




export const MunPobrezaModerada = () => {


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
    { field: "id", headerName: "Identificador", hide:true , width: 150   , description:messages.dataTableColum.id},
    {
      field: "idmunicipio",
      headerName: "idmunicipio",
      hide: true,
      width: 150,
    },
    { field: "Nombre", headerName: "Municipio", width: 150 },
    { field: "Anio", headerName: "Año", width: 150 },
    { field: "Total", headerName: "Total", width: 150 },
    { field: "Porcentaje", headerName: "Porcentaje", width: 150,...porcentage},
    { field: "CarenciaProm", headerName: "Carencia Promedio", width:250,...porcentage },
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
    let data = {
      NUMOPERACION: 4,
      ANIO: filterAnio,
    };
    consulta(data); 
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
  
          CatalogosServices.munpobrezamod(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "Registro Eliminado!",
              });
              
              let data = {
                NUMOPERACION: 4,
                ANIO: filterAnio,
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

    const handleAgregar =(event: React.ChangeEvent<HTMLInputElement>) => {
      setslideropen(true);
      let file = event?.target?.files?.[0] || "";
      const formData = new FormData();
      formData.append("inputfile", file, "inputfile.xlxs");
      formData.append("tipo", "MunPobrezaMod");
      CatalogosServices.migraData(formData).then((res) => {
        setslideropen(false);
      });
    };
  

    const consulta = (data: any) => {
      CatalogosServices.munpobrezamod(data).then((res) => {
  
        console.log('respuesta'+res.RESPONSE + res.NUMCODE);
  
  
  
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "Consulta Exitosa!",
          });
     
          setPoblacion(res.RESPONSE); 
          
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
      console.log('valor de event en handle  filter'+event);
      console.log("setFilterAnio  "+ event);
      
      let data = {
       NUMOPERACION: 4,
       ANIO: event.target.value,
        
      };
      console.log("valor de data  "+ data.ANIO );
       
      setFilterAnio(data.ANIO);
      console.log(event.target.value +'valor de event');
      console.log("valor de data  "+ data.ANIO );
       
      consulta(data);
    };
    const downloadplantilla = () => {
      let data = {
        NUMOPERACION: "MUNICIPIO_POBREZA_MODERADA",
       
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
      <MunPobrezaModeradaModal
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
