import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { AuthService } from '../../../../../services/AuthService';



const RolesRelModal = ({
    id,
    open,
    handleClose,
  }: {
    id:string,
    open: boolean;
    handleClose:Function,
  }) => {


    const [data, setData] = useState([]);

    const consulta = (data: any) => {
        AuthService.usuarioRol(data).then((res) => {
            setData(res.RESPONSE);
        });
      };
      
    useEffect(() => {
        consulta({CHID:id});
      }, []); 

  return (
    <div>
      <Dialog open={open}
      maxWidth='lg'
      >
      <DialogTitle>Roles Relacionados al Usuario</DialogTitle>
      <DialogContent>
       
       
        <Box>
       
          
    <TableContainer >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Rol</TableCell>
            <TableCell align="left">Descripción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row : any) => (
            <TableRow
              key={row.Nombre}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.Nombre}</TableCell>
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
  )
}
export default RolesRelModal
