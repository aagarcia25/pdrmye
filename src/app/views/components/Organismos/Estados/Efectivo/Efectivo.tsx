import Box from '@mui/material/Box';
import React, { useState } from 'react'
import ButtonsAdd from '../../../menu/catalogos/Utilerias/ButtonsAdd';
import MUIXDataGrid from '../../../MUIXDataGrid';


const Efectivo = () => {
    const [data, setData] = useState([]);
    const [step, setStep] = useState(0);
  
    const columns = [
      {
        field: "id",
        headerName: "Identificador",
        width: 150,
        hide: true,
      },
      { field: "Nombre", headerName: "Num Empleado", width: 150 },
      { field: "Anio", headerName: "Area De Adscripción", width: 150 },
      { field: "Mes", headerName: "Plaza", width: 150 },
      { field: "a", headerName: "Puesto", width: 150 },
      { field: "b", headerName: "Sindicato S/N", width: 150 },
      { field: "c", headerName: "Rfc", width: 150 },
      { field: "d", headerName: "Fecha Ingreso", width: 150 },
      { field: "e", headerName: "Regimen   Plaza / Ha / Hp", width: 250 },
      { field: "f", headerName: "Sueldo Base", width: 150 },
    ];
  
    const handleOpen = () => {
      setStep(1);
    };
  
    return (
      <div>
      
        <Box >
         <ButtonsAdd handleOpen={handleOpen} agregar={false} />
          <MUIXDataGrid columns={columns} rows={data} />
        </Box>
      </div>
    );
  };

export default Efectivo
