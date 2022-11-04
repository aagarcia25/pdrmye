import React, { useState } from 'react'
import ButtonsAdd from '../../menu/catalogos/Utilerias/ButtonsAdd';
import MUIXDataGrid from '../../MUIXDataGrid';
import SolicitudesIns from './SolicitudesIns';

const Solicitudes = () => {
    const [data, setData] = useState([]);
    const [id,              setId] = useState("");
    const [open,            setOpen] = useState(false);
    const [tipoOperacion,   setTipoOperacion] = useState(0);

    const columns = [
        { field: "id", headerName: "Identificador", width: 150   , hide:true },
        { field: "fecha", headerName: "Fecha", width: 150 },
        { field: "Estatus", headerName: "Estatus", width: 150 },
        { field: "tipo", headerName: "Tipo", width: 150 },
        { field: "Partida", headerName: "Partida", width: 150 },
        { field: "Total", headerName: "Total", width: 150 },
       
       
      ];
    
      const handleClose = () => {
        setOpen(false);
      };

      
      const handleOpen = () => {
        setOpen(true);
       
      };

  return (
    <div>

{open ? (
        <SolicitudesIns
          open={open}
          handleClose={handleClose}
          id={id} 
          tipo={1}        ></SolicitudesIns>
      ) : (
        ""
      )}


      <ButtonsAdd handleOpen={handleOpen} agregar={false} />
        <MUIXDataGrid
              columns={columns}
              rows={data}
            />
    </div>
  )
}

export default Solicitudes
