import React, { useEffect, useState } from 'react'

import { Dialog, DialogTitle, DialogContent,  DialogActions, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Checkbox, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { AuthService } from '../../../../../services/AuthService';
import { Toast } from '../../../../../helpers/Toast';
import { Alert } from '../../../../../helpers/Alert';
import { GridColDef } from '@mui/x-data-grid';
import MUIXDataGridSimple from '../../../MUIXDataGridSimple';




const RolAsignaMenu = ({
    id,
    open,
    handleClose,
  }: {
    id:string,
    open: boolean;
    handleClose:Function,
  }) => {



    const [data, setData] = useState([]);


    const handleChange = (v: any) => {
      let data={
          IDPERMISO : v.row.id,
          IDMENU    : id
      }
      AuthService.rolesrel(data).then((res) => {
          setData(res.RESPONSE);
          if (res.SUCCESS) {
              Toast.fire({
                  icon: "success",
                  title: "Permiso Relacionado!",
                });  
                consulta({ CHID: id });
          }else{
              Alert.fire({
                  title: "Error!",
                  text: res.STRMESSAGE,
                  icon: "error",
                }); 
          }
      });
    };

    
    
    const columns: GridColDef[] = [
      {
        field: "id",
        headerName: "Identificador",
        hide: true,
        width: 10,
      },
      {
        field: "acciones",
        headerName: "",
        description: "Relacionar Menus",
        sortable: false,
        width: 10,
        renderCell: (v) => {
          return <Checkbox onChange={() => handleChange(v) } />;
        },
      },
      { field: "menu", headerName: "Menu", width: 100 },
      { field: "Descripcion", headerName: "Descripcion", width: 250 },
    ];
    

   
    const consulta = (data: any) => {
        AuthService.rolesrel(data).then((res) => {
            setData(res.RESPONSE);
        });
      };
      
    useEffect(() => {
        consulta({CHID:id});
      }, []); 

  return (
    <div>
      <Modal open={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "30vw",
              height: "50vh",
              bgcolor: "background.paper",
              boxShadow: 50,
              p: 2,
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  fontFamily: "MontserratBold",
                  fontSize: "1vw",
                  color: "#808080",
                }}
              >
                Relacionar Menus a Roles
              </Typography>
            </Box>

            <Box sx={{ mt: "3vh" }}>
              <Typography
                sx={{
                  mt: "1vh",
                  textAlign: "left",
                  fontFamily: "MontserratMedium",
                  fontSize: ".8vw",
                  color: "#4db6ac",
                }}
              >
                Para Eliminar el menú solo Desmarcar la Casilla
              </Typography>
            </Box>

            <Box
              sx={{
                mt: "2vh",
                width: "100%",
                height: "30vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ height: "100%", width: "80%" }}>
                <MUIXDataGridSimple columns={columns} rows={data} />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "right",
                justifyContent: "right",
                mt: "2vh",
              }}
            >
              <Button
                sx={{ color: "#000", fontFamily: "MontserratMedium" }}
                onClick={() => handleClose()}
              >
                Salir
              </Button>
            </Box>
          </Box>
        </Modal>
    </div>
  )
}

export default RolAsignaMenu

