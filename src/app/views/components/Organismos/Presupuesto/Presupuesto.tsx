import React, { useState } from 'react'
import ButtonsLoadFile from '../../menu/catalogos/Utilerias/ButtonsLoadFile';
import MUIXDataGrid from '../../MUIXDataGrid';

const Presupuesto = () => {

    const [data, setData] = useState([]);

    const columns = [
        { field: "id", headerName: "Identificador", width: 150   , hide:true },
        { field: "Partida", headerName: "Partida", width: 150 },
        { field: "Enero", headerName: "Enero", width: 150 },
        { field: "Febrero", headerName: "Febrero", width: 150 },
        { field: "Marzo", headerName: "Marzo", width: 150 },
        { field: "Abril", headerName: "Abril", width: 150 },
        { field: "Mayo", headerName: "Mayo", width: 150 },
        { field: "Junio", headerName: "Junio", width: 150 },
        { field: "Julio", headerName: "Julio", width: 150 },
        { field: "Agosto", headerName: "Agosto", width: 150 },
        { field: "Septiembre", headerName: "Septiembre", width: 150 },
        { field: "Octubre", headerName: "Octubre", width: 150 },
        { field: "Noviembre", headerName: "Noviembre", width: 150 },
        { field: "Diciembre", headerName: "Diciembre", width: 150 },
      ];
    
      const handleOpen = () => {
        
       
      };

      
  return (
    <div>
      <ButtonsLoadFile handleOpen={handleOpen}></ButtonsLoadFile>
        <MUIXDataGrid
              columns={columns}
              rows={data}
            /> 
    </div>
  )
}

export default Presupuesto
