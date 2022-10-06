import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Menu,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import { margin } from "@mui/system";
import React, { useState } from "react";
import { Path } from "react-router";
import SelectFrag from "../../Fragmentos/Select/SelectFrag";
import Slider from "../../Slider";

const SolicitudesIns = ({
  id,
  open,
  tipo,
  handleClose,
}: {
  id: string;
  open: boolean;
  tipo: number;
  handleClose: Function;
}) => {
  const [openSlider, setOpenSlider] = useState(false);

  const options = [
    { value: "GO",label: "GASTOS EXTRAORDINARIOS"},
    { value: "GO",label: "PAGO DE 3% DE ISN"},
    { value: "GO",label: "PAGO DE PENSIONES VITALICIAS"},
    { value: "GO",label: "PAGO DE DONATIVOS ICV A CRUZ ROJA Y BOMBEROS"},
    { value: "GO",label: "PAGO DE AYUDAS SOCIALES A INSTITUCIONES SIN FINES DE LUCRO (CRUZ ROJA Y BOMBEROS)"},
    { value: "GO",label: "PAGO DE 1 Y 2 AL MILLAR"},
    { value: "GO",label: "GASTOS EXTRAORDINARIOS CON PRESUPUESTO VIRTUAL"},
    { value: "GO",label: "PAGO VIRTUAL ICV"},

  ];

  const partida = [
    { value: "SUELDOS BASE AL PERSONAL PERMANENTE  ", label: "SUELDOS BASE AL PERSONAL PERMANENTE  " },
    { value: "TELEFONÍA TRADICIONAL", label: "TELEFONÍA TRADICIONAL" },
  ];


  const handleSend = () => {};

  const handleSelectTipo = (e: any) => {
    console.log(e.value);
  };

  return (
    <div>
      <div>
        <Slider open={openSlider}></Slider>
        <Box>
          <Dialog open={open}   
          fullWidth={true} 
          maxWidth="lg">
            <DialogTitle>
              {tipo == 1 ? "Nuevo Registro" : "Editar Registro"}
            </DialogTitle>
            <DialogContent>
              <Box>
                <Box sx={{
                    margin:2
                    }}>
                  <SelectFrag
                    options={options}
                    onInputChange={handleSelectTipo} placeholder={"Seleccione una Opcion"}                  ></SelectFrag>
                </Box>

                <Box sx={{
                    margin:2
                    }}>
                  <SelectFrag
                    options={partida}
                    onInputChange={handleSelectTipo} placeholder={"Seleccione una Partida"}                  ></SelectFrag>
                </Box>

                <Box sx={{
                    margin:2
                    }}>
                <TextField
                margin="dense"
                required
                id="importe"
                label="importe"
                
                type="text"
                fullWidth
                variant="standard"
              
               
              />
                </Box>


              </Box>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => handleSend()}>Guardar</Button>
              <Button onClick={() => handleClose()}>Cancelar</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </div>
    </div>
  );
};

export default SolicitudesIns;
