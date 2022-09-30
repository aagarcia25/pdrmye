import { Modal, Typography, Button, TextField, Grid, DialogActions, DialogTitle, Dialog, DialogContent, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { Imunicipio } from "../../../../../interfaces/municipios/FilterMunicipios";
import { AuthService } from "../../../../../services/AuthService";
import Slider from "../../../Slider";

const MenuModal = ({
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
  const [Menu, setMenu] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [MenuPadre, setMenuPadre] = useState("");
  const [Path, setPath] = useState("");
  const [Nivel, setNivel] = useState("");
  const [Orden, setOrden] = useState("");
  const [values, setValues] =useState<any[]>([]);
  
  const handleSend = () => {
    if ( 
      Menu == "" || 
      Descripcion == ""|| 
      Path == ""|| 
      Nivel == ""
        ) {
      Alert.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHUSER:1,
        CHID:id,
        MENU:Menu,
        DESCRIPCION:Descripcion,
        MENUPADRE:MenuPadre,
        PATH:Path,
        NIVEL:Nivel,
        ORDEN:Orden
      };
      handleRequest(data);
    }
  };

  const handleRequest = (data: any) => {
    console.log(data);
      AuthService.menusindex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: tipo == 1 ? "Registro Agregado!" : "Registro Editado!" ,
        });
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const consulta = (data: any) => {
    AuthService.menusindex(data).then((res) => {
      if (res.SUCCESS) {
        setValues(res.RESPONSE);
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };


  useEffect(() => {
    consulta({ NUMOPERACION: 4 });
  }, []);


  return (
    <div>
      <Slider open={openSlider}></Slider>
      <Box>
      <Dialog open={open}>
        <DialogTitle>
          {tipo == 1 ? "Nuevo Registro" : "Editar Registro"}
        </DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              required
              margin="dense"
              id="Menu"
              label="Menu"
              value={Menu}
              type="text"
              fullWidth
              variant="standard"
              onChange={(v) => setMenu(v.target.value)}
              error={Menu == "" ? true : false}
            />

            <TextField
              required
              margin="dense"
              id="Descripcion"
              label="Descripcion"
              value={Descripcion}
              type="text"
              fullWidth
              variant="standard"
              onChange={(v) => setDescripcion(v.target.value)}
              error={Descripcion == "" ? true : false}
            />

           

            <FormControl variant="standard" fullWidth>
            <InputLabel>Menu Padre</InputLabel>
            <Select
              required
              onChange={(v) => setMenuPadre(v.target.value)}
              value={MenuPadre}
              label="Menu Padre"
            >
              {values?.map((item) => {
                return (
                  <MenuItem key={item?.id} value={item?.id}>
                    {item?.Menu}
                  </MenuItem>
                );
              })}

            </Select>
          </FormControl>


            <TextField
              required
              margin="dense"
              id="Path"
              label="Path"
              value={Path}
              type="text"
              fullWidth
              variant="standard"
              onChange={(v) => setPath(v.target.value)}
              error={Path == "" ? true : false}
            />

            <TextField
              required
              margin="dense"
              id="Nivel"
              label="Nivel"
              value={Nivel}
              type="mail"
              fullWidth
              variant="standard"
              onChange={(v) => setNivel(v.target.value)}
              error={Nivel == "" ? true : false}
            />

           <TextField
              required
              margin="dense"
              id="Orden"
              label="Orden"
              value={Orden}
              type="number"
              fullWidth
              variant="standard"
              onChange={(v) => setOrden(v.target.value)}
              error={Orden == "" ? true : false}
            />


          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleSend()}>Guardar</Button>
          <Button onClick={() => handleClose()}>Cancelar</Button>
        </DialogActions>
      </Dialog>
      </Box>
    </div>
  );
};

export default MenuModal;
