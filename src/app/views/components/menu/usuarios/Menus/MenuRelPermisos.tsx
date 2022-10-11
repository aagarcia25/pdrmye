import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AuthService } from "../../../../../services/AuthService";
import { GridColDef } from '@mui/x-data-grid';
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";


const MenuRelPermisos = ({
  dt,
  open,
  handleClose,
}: {
  dt: any;
  open: boolean;
  handleClose: Function;
}) => {
  const [data, setData] = useState([]);

  const consulta = (data: any) => {
    AuthService.menuPermisosRel(data).then((res) => {
      setData(res.RESPONSE);
    });
  };

  const handleChange = (v: any) => {
    let data = {
      TIPO:2,     
      IDMENU: v.id
    }
    AuthService.rolespermisorelacionar (data).then((res) => {
      setData(res.RESPONSE);
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Menu Eliminado!",
        });
        consulta({ CHID: v.id });
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
    { field: "MENU", headerName: "Menu", width: 300 },

  ];



  useEffect(() => {
    
    consulta({ CHID: dt?.row?.id });
  }, []);

  return (
    <div>
      <Dialog open={open} maxWidth="lg">    
    
        <DialogContent>

        <Grid sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "MontserratBold",
                fontSize: "2vw",
                color: "#454545",
              }}
            >
              Permisos Relacionados al Menú
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
              Para Eliminar el menú solo Marcar la Casilla
            </Typography>
          </Grid>
          <Box>
            <TableContainer>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Rol</TableCell>
                    <TableCell align="left">Descripción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row: any) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{row.Permiso}</TableCell>
                      <TableCell align="left">{row.Descripcion}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleClose()}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default MenuRelPermisos;
