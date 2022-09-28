import React, { useEffect, useState } from 'react'

import { Dialog, DialogTitle, DialogContent,  DialogActions, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import { AuthService } from '../../../../../services/AuthService';





const RolesMenu = ({
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
        AuthService.rolesrel(data).then((res) => {
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
      <DialogTitle>Menus Relacionados al Rol</DialogTitle>
      <DialogContent>
       
       
        <Box>
       
          
    <TableContainer >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Menú</TableCell>
            <TableCell align="left">Descripción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row : any) => (
            <TableRow
              key={row.Menu}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.Menu}</TableCell>
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

export default RolesMenu
