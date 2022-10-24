import React, { useState } from 'react'
import { Box, Dialog, DialogActions, DialogContent } from '@mui/material';


const ModalAlert = ({
    open,
    tipo,
    handleClose,
    handleAccion,
    vrows
}:{
    open: boolean;
    tipo: string;
    handleClose: Function;
    handleAccion: Function;
    vrows: any;
}) => {

    const [mensaje, setMensaje] = useState<string>();

   

  return (
    <div>
         <Box>
        <Dialog open={open}>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', }}>

            <label className="Titulo">{tipo}
            </label>
          </Box>
          <DialogContent>
           
           
            <Box>
              
             

            <label> <h3> Comentarios:</h3> </label>
            <textarea
                    required
                    spellCheck='true'
                    rows={10}
                    onChange={(v) => setMensaje(v.target.value)}
                    style={{ width: "100%", borderRadius: 15, }} />
            </Box>
          </DialogContent>

          <DialogActions>
            <button className="guardar" onClick={() => handleAccion({data :vrows , texto : mensaje })}>Guardar</button>
            <button className="cerrar"  onClick={() => handleClose()}>Cancelar</button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  )
}

export default ModalAlert
