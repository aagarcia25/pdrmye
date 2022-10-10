import React, { useEffect, useState } from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Checkbox, Typography, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { AuthService } from '../../../../../services/AuthService';
import { Toast } from '../../../../../helpers/Toast';
import { Alert } from '../../../../../helpers/Alert';
import { GridColDef } from '@mui/x-data-grid';
import MUIXDataGridSimple from '../../../MUIXDataGridSimple';





const RolesMenu = ({
  id,
  open,
  handleClose,
}: {
  id: string,
  open: boolean;
  handleClose: Function,
}) => {



  const [data, setData] = useState([]);


  const handleChange = (v: any) => {
    let data = {
      CHID: v.row.id,
      IDMENU: id
    }
    AuthService.rolesrel(data).then((res) => {
      setData(res.RESPONSE);
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Permiso Relacionado!",
        });
        consulta({ CHID: id });
      } else {
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
        return <Checkbox onChange={() => handleChange(v)} />;
      },
    },
    { field: "Descripcion", headerName: "Menu", width: 300 },

  ];



  const consulta = (data: any) => {
    AuthService.rolesrel(data).then((res) => {
      setData(res.RESPONSE);
    });
  };

  useEffect(() => {
    consulta({ CHID: id });
  }, []);

  return (
    <div>
      <Modal open={open}>
        <Grid
          container
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50vw",
            height: "60vh",
            bgcolor: "rgb(255,255,255)",
            boxShadow: 50,
            p: 2,
            borderRadius: 3,
          }}
        >
          <Grid md={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "MontserratBold",
                fontSize: "2vw",
                color: "#454545",
              }}
            >
              Relacionar Menus a Usuario
            </Typography>
          </Grid>

          <Grid md={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
            <Typography
              sx={{
                textAlign: "left",
                fontFamily: "MontserratMedium",
                fontSize: "1.5vw",
                color: "#808080",
              }}
            >
              Para Eliminar el menú solo Marcar la Casilla
            </Typography>
          </Grid>


          <Grid md={12}
            sx={{
              mt: "2vh",
              width: "100%",
              height: "60%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",

            }}
          >
            <MUIXDataGridSimple columns={columns} rows={data} />

          </Grid>


          <Grid md={12}
            sx={{

              display: "flex",
              alignItems: "right",
              justifyContent: "right",
              mt: "2vh",
              // mr: "5vw",
              // ml: "5vw",
            }}
          >
            <Button
              sx={{ color: "#000", fontFamily: "MontserratMedium" }}
              onClick={() => handleClose()}
            >
              Salir
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </div>
  )
}

export default RolesMenu
