import { AccountCircle } from "@mui/icons-material";
import { FormControl, Grid, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { messages } from "../../../styles";
import ButtonsAdd from "../../menu/catalogos/Utilerias/ButtonsAdd";
import MUIXDataGrid from "../../MUIXDataGrid";

const PensionesVitalicias = () => {
  const [data, setData] = useState([]);
  const [step, setStep] = useState(0);

  const columns = [
    {
      field: "id",
      headerName: "Identificador",
      width: 150,
      hide: true,
      description: messages.dataTableColum.id,
    },
    { field: "Nombre", headerName: "Nombre Persona", width: 150 },
    { field: "Anio", headerName: "Año", width: 150 },
    { field: "Mes", headerName: "Mes", width: 150 },
    { field: "Importe", headerName: "Importe", width: 150 },
  ];

  const handleOpen = () => {
    setStep(1);
  };

  return (
    <div>
      <Box sx={{ display: step == 1 ? "block" : "none" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >



            <Grid item xs={2} sm={4} md={4}>
             
            </Grid>

            <Grid item xs={2} sm={4} md={4} >
             
             
              <FormControl variant="standard">
                <InputLabel htmlFor="input-with-icon-adornment">
                  With a start adornment
                </InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                />
              </FormControl>



             

            </Grid>

            <Grid item xs={2} sm={4} md={4}>
             
            </Grid>

            <Grid item xs={2} sm={4} md={4}>
             
            </Grid>

            <Grid item xs={2} sm={4} md={4} >
             
              <FormControl variant="standard">
                <InputLabel htmlFor="input-with-icon-adornment">
                  With a start adornment
                </InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={2} sm={4} md={4}>
             
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ display: step == 0 ? "block" : "none" }}>
       <ButtonsAdd handleOpen={handleOpen} agregar={false} />
        <MUIXDataGrid columns={columns} rows={data} />
      </Box>
    </div>
  );
};

export default PensionesVitalicias;
