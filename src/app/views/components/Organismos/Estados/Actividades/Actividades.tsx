import Box from '@mui/material/Box';
import React, { useState } from 'react'
import ButtonsAdd from '../../../menu/catalogos/Utilerias/ButtonsAdd';
import MUIXDataGrid from '../../../MUIXDataGrid';



const Actividades = () => {
    const [data, setData] = useState([]);
    const [step, setStep] = useState(0);
  
    const columns = [
      {
        field: "id",
        headerName: "Identificador",
        width: 150,
        hide: true,
      },
      { field: "Nombre", headerName: "Fecha", width: 150 },
      { field: "Anio", headerName: "Area De Adscripción", width: 150 },
      { field: "Mes", headerName: "Plaza", width: 150 },
      
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
export default Actividades
