import { TextField, DialogActions, Dialog, DialogContent, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { AuthService } from "../../../../../services/AuthService";
import { getUser } from "../../../../../services/localStorage";
import Slider from "../../../Slider";

const MenuModal = ({
  open,
  tipo,
  handleClose,
  vrows
}: {

  open: boolean;
  tipo: number;
  handleClose: Function;
  vrows: any;
}) => {


  const [openSlider, setOpenSlider] = useState(false);
  const [Menu, setMenu] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [MenuPadre, setMenuPadre] = useState("");
  const [Path, setPath] = useState("");
  const [Nivel, setNivel] = useState("");
  const [id, setId] = useState("");
  const [Orden, setOrden] = useState("");
  const [values, setValues] = useState<any[]>([]);
  const user: RESPONSE = JSON.parse(String(getUser()));

  const handleSend = () => {
    if (
      Menu == "" ||
      Descripcion == "" ||
      Path == ""
    ) {
      Alert.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHUSER: user.id,
        CHID: id,
        MENU: Menu,
        DESCRIPCION: Descripcion,
        MENUPADRE: MenuPadre,
        PATH: Path,
        NIVEL: Nivel,
        ORDEN: Orden
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
          title: tipo == 1 ? "Registro Agregado!" : "Registro Editado!",
        });
        handleClose();
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
    if (vrows === '') {
      console.log(vrows)

    } else {
      setMenu(vrows?.row?.Menu)
      setDescripcion(vrows?.row?.Descripcion)
      setMenuPadre(vrows?.row?.MenuPadre)
      setPath(vrows?.row?.Path)
      setNivel(vrows?.row?.Nivel)
      setOrden(vrows?.row?.Orden)
      setId(vrows?.row?.id)


      console.log(vrows)



    }
  }, [vrows]);


  return (
    <div>
      <Slider open={openSlider}></Slider>
      <Box>
        <Dialog open={open}>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', }}>

            <label className="Titulo">{tipo == 1 ? "Nuevo Registro" : "Editar Registro"}
            </label>
          </Box>
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
                error={Nivel == null ? true : false}
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
            <button className="guardar" onClick={() => handleSend()}>Guardar</button>
            <button className="cerrar" onClick={() => handleClose()}>Cancelar</button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default MenuModal;
