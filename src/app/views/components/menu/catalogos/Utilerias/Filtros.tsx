import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { CatalogosServices } from '../../../../../services/catalogosServices';
import Ianios from "../../../../../interfaces/general/Api_AdSisUs.type";


const Filtros = ({
    handleFilterChange
}:{
    handleFilterChange: Function
}
   
    
) => {
 
const [anios, setAnios] = useState<Ianios[]>();





const aniosc = () => {
    let data = {};
    CatalogosServices.anios(data).then((res) => {
      setAnios(res.RESPONSE);
    });
  };

  useEffect(() => {
    aniosc();
  }, []); 
 
    return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "right",
    }}
     >
    <FormControl
      variant="standard"
      sx={{
        width: "5%",
      }}
    >
      <InputLabel>Año</InputLabel>
      <Select
       onChange={(v) => handleFilterChange(v)}
       value=""
       label="Año"
        >
        {anios?.map((item: Ianios) => {
          return(
          <MenuItem key={item.id} value={item.id}>{item.anio}</MenuItem>
          );
        })
        }
      </Select>
    </FormControl>




  </Box>
);
  
}

export default Filtros
