import React, { useState } from 'react'
import MUIXDataGrid from '../../MUIXDataGrid';

const Solicitudes = () => {
    const [data, setData] = useState([]);

    const columns = [
        { field: "id", headerName: "Identificador", width: 150   , hide:true },
        { field: "Nombre", headerName: "Nombre Persona", width: 150 },
        { field: "Anio", headerName: "Año", width: 150 },
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
    


  return (
    <div>
        <MUIXDataGrid
              columns={columns}
              rows={data}
            />
    </div>
  )
}

export default Solicitudes
