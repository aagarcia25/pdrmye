import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { Alert } from '../../../../../helpers/Alert';
import { Toast } from '../../../../../helpers/Toast';
import { AuthService } from '../../../../../services/AuthService';
import MUIXDataGridSimple from '../../../MUIXDataGridSimple';



const RolesSinRel = ({
  id,
  open,
  handleClose,
}: {
  id: string,
  open: boolean;
  handleClose: Function,
}) => {





  const [data, setData] = useState([]);

  const consulta = (data: any) => {
    AuthService.rolessinrelacionar(data).then((res) => {
      setData(res.RESPONSE);
    });
  };


  const handleChange = (v: any) => {
    let data = {
      TIPO: 1,
      IDROL: v.row.id,
      IDUSUARIO: id
    }
    AuthService.RelacionarUsuarioRol(data).then((res) => {
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
      description: "Relacionar Rol",
      sortable: false,
      width: 10,
      renderCell: (v) => {
        return <Checkbox onChange={() => handleChange(v)} />;
      },
    },
    { field: "Nombre", headerName: "Nombre", width: 200 },
  ];



  useEffect(() => {
    consulta({ CHID: id });
  }, [id]);

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
          <Grid sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "MontserratBold",
                fontSize: "2vw",
                color: "#454545",
              }}
            >
              Relacionar  Roles a Usuario
            </Typography>
          </Grid>

          <Grid sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
            <Typography
              sx={{
                textAlign: "left",
                fontFamily: "MontserratMedium",
                fontSize: "1.5vw",
                color: "#808080",
              }}
            >
              Para Relacionar el Rol al usuario solo marque la Casilla
            </Typography>
          </Grid>


          <Grid sm={12}
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

        <Grid sm={12}
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
        </Grid>
      </Grid>
    </Modal>
    </div >
  
  
  
  )
}
export default RolesSinRel
