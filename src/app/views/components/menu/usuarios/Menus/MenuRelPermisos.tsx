import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AuthService } from "../../../../../services/AuthService";

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

  useEffect(() => {
    
    consulta({ CHID: dt?.row?.id });
  }, []);

  return (
    <div>
      <Dialog open={open} maxWidth="lg">
        <DialogTitle>Permisos Relacionados al Menú</DialogTitle>
        <DialogContent>
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
