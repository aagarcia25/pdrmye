import { Box, IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import MUIXDataGrid from '../../MUIXDataGrid';
import ButtonsAdd from '../catalogos/Utilerias/ButtonsAdd';
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CatalogosServices } from '../../../../services/catalogosServices';
import { Toast } from '../../../../helpers/Toast';
import { Alert } from '../../../../helpers/Alert';
import WorflowModal from './WorflowModal';


const Workflow = () => {
    const [data, setData] = useState([]);
    const [tipoOperacion, setTipoOperacion] = useState(0);
    const [open, setOpen] = useState(false);
    const [row, setRow] = useState({});

    const handleClose = (v: string) => {
        setTipoOperacion(0);
        setOpen(false);
        setRow("");
      };
    const handleOpen = (v: any) => {
        setTipoOperacion(1);
        setOpen(true);
        setRow("");
      };

    const handleEdit = (v: any) => {
        /*setTipoOperacion(2);
        setModo("Editar Registro");
        setOpen(true);
        setData(v);*/
      };

    const handleDelete = (v: any) => {
      /*  Swal.fire({
          icon: "info",
          title: "Estas seguro de eliminar este registro?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Confirmar",
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(v);
            const user: RESPONSE = JSON.parse(String(getUser()));
    
            let data = {
              NUMOPERACION: 3,
              CHID: v.row.id,
              CHUSER: user.id
            };
            console.log(data);
    
            CatalogosServices.municipios(data).then((res) => {
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
        });*/
      };


    const columns: GridColDef[] = [
        {
          field: "id",
          headerName: "Identificador",
          hide: true,
          width: 150,
        },
        { field: "idproceso", headerName: "Clave", width: 150 , hide: true},
        { field: "proceso", headerName: "Proceso", width: 350 },
        { field: "iddepartamentoOrigen", headerName: "Departamento", width: 150 , hide: true},
        { field: "NombreCortoOrigen", headerName: "Departamento Origen", width: 150 },
        { field: "iddepartamentoDestino", headerName: "Clave", width: 150 , hide: true},
        { field: "NombreCortoDestino", headerName: "Departamento Destino", width: 150 },
        { field: "idEstatusOrigen", headerName: "Clave", width: 150 , hide: true},
        { field: "EstatusOrigen", headerName: "Estatus Origen", width: 150 },
        { field: "idestatusDestino", headerName: "Clave", width: 150 , hide: true},
        { field: "EstatusDestino", headerName: "Estatus Destino", width: 150 },
        { field: "idPerfilOrigen", headerName: "Clave", width: 150 , hide: true},
        { field: "PerfilOrigen", headerName: "Perfil Origen", width: 150 },
        { field: "idPerfilDestino", headerName: "Clave", width: 150 , hide: true},
        { field: "PerfilDestino", headerName: "Perfil Destino", width: 150 },
       
    
        {
          field: "acciones",
          headerName: "Acciones",
          description: "Campo de Acciones",
          sortable: false,
          width: 200,
          renderCell: (v) => {
            return (
              <Box>
                <IconButton onClick={() => handleEdit(v)}>
                  <ModeEditOutlineIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(v)}>
                  <DeleteForeverIcon />
                </IconButton>
              </Box>
            );
          },
        },
      ];


      const consulta = (data: any) => {
        CatalogosServices.workFlowIndex(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Consulta Exitosa!",
            });
            setData(res.RESPONSE);
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
        consulta({ NUMOPERACION: 4 });
      }, []);

      
  return (
    <div style={{ height: 600, width: "100%" }}>

{open ? (
        <WorflowModal
          open={open}
          handleClose={handleClose}
          tipo={tipoOperacion}
          dt={data}
        />
      ) : (
        ""
      )}

    <ButtonsAdd handleOpen={handleOpen} />
    <MUIXDataGrid columns={columns} rows={data} />
  </div>

  );
}

export default Workflow
