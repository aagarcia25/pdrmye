import React, { useEffect, useState } from 'react'
import { Box,  IconButton,  ToggleButton, ToggleButtonGroup, Tooltip,  } from '@mui/material'
import { messages } from '../../../../styles'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AvisosModal from './AvisosModal'
import Swal from "sweetalert2";
import MUIXDataGrid from '../../../MUIXDataGrid'
import { GridColDef } from '@mui/x-data-grid';

export const Avisos = () => {
    



  const [modo, setModo] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [conAvisos, setAvisos] = useState([]);
  const [open, setOpen] = useState(false);
  const columns: GridColDef[] = [
   
    { field: "id", headerName: "Identificador", hide:true , width: 150   , description:messages.dataTableColum.id},
    { field: "fechaInicio", headerName: "Fecha de Inicio", width: 200 },
    { field: "FechaFin", headerName: "Expiracion", width: 200 },
    { field: "Nombre", headerName: "Nombre", width: 100 },
    { field: "Descripcion", headerName: "Descripcion", width:500 },
    { field: "Documento", headerName: "Documento", width: 100, renderCell: (v) => { return (
      <Box>
                    
      <IconButton onClick={() => handleVisualizar(v)}>
      <VisibilityIcon />
      </IconButton>
    </Box>
    );}},
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
    { field: "NombreDocumento", headerName: "NombreDocumento", hide:true , width: 150   ,},
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
  
          CatalogosServices.avisos(data).then((res) => {
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
    setModo("Agregar Aviso");
    setOpen(true);
    //setData(v);
   
  };
  const handleVisualizar = (v: any) => {
    setTipoOperacion(2);
    setModo("Aviso");
    setOpen(true);
    setData(v);
    
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

  const consulta = (data: any) => {
    CatalogosServices.avisos(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setAvisos(res.RESPONSE);
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };


    let dat = ({
      NUMOPERACION: 4,
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
       <Box sx={{}}>
      <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
        <Tooltip title="Agregar Registro">
          <ToggleButton value="check" onClick={() => handleNuevoRegistro(1)}>
            <AddCircleTwoToneIcon />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
    </Box>

    <MUIXDataGrid columns={columns} rows={conAvisos} />
  </div>

  
  )
}

