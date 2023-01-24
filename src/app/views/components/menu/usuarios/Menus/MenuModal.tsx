import { TextField, DialogActions,   FormControl, InputLabel, MenuItem, Select, Grid,  Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { AuthService } from "../../../../../services/AuthService";
import { getUser } from "../../../../../services/localStorage";
import ModalForm from "../../../componentes/ModalForm";

const MenuModal = ({
  tipo,
  handleClose,
  vrows
}: {
  tipo: number;
  handleClose: Function;
  vrows: any;
}) => {


  const [Menu, setMenu] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [MenuPadre, setMenuPadre] = useState("");
  const [Path, setPath] = useState("");
  const [Nivel, setNivel] = useState("");
  const [id, setId] = useState("");
  const [Orden, setOrden] = useState("");
  const [cinterno, setCinterno] = useState("");
  const [values, setValues] = useState<any[]>([]);
  const user: RESPONSE = JSON.parse(String(getUser()));

  const handleSend = () => {
    if (
      Menu === "" ||
      Descripcion === "" ||
      Path === ""
    ) {
      AlertS.fire({
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
        ORDEN: Orden,
        CONTROLINTERNO:cinterno

      };
      handleRequest(data);
    }
  };

  const handleRequest = (data: any) => {
    AuthService.menusindex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: tipo === 1 ? "Registro Agregado!" : "Registro Editado!",
        });
        handleClose();
      } else {
        AlertS.fire({
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
        AlertS.fire({
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
      //console.log(vrows)

    } else {
      setMenu(vrows?.row?.Menu)
      setDescripcion(vrows?.row?.Descripcion)
      setMenuPadre(vrows?.row?.MenuPadre)
      setPath(vrows?.row?.Path)
      setNivel(vrows?.row?.Nivel)
      setOrden(vrows?.row?.Orden)
      setId(vrows?.row?.id)
      setCinterno(vrows?.row?.ControlInterno);

    }
  }, [vrows]);


  return (
    <div>
      <ModalForm title={tipo === 1 ? "Nuevo Registro" : "Editar Registro"} handleClose={handleClose}>
       
        <Box sx={{ boxShadow: 3, high:"100%", }}>
          <Grid container
            sx={{
              justifyContent: "center",
              high:"100%",
              paddingTop:"1%"
            }}

          >

            <Grid item sm={8} >
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
                error={Menu === "" ? true : false}
              />
            </Grid>
            <Grid item sm={8} >

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
                error={Descripcion === "" ? true : false}
              />
            </Grid>
            <Grid item sm={8}>


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

            </Grid>
            <Grid item sm={8}>


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
                error={Path === "" ? true : false}
              />
            </Grid>
            <Grid item sm={8}>


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
                error={Nivel === null ? true : false}
              />
            </Grid>
            <Grid item sm={8}>


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
                error={Orden === "" ? true : false}
              />

<TextField
                required
                margin="dense"
                id="cinterno"
                label="Control Interno"
                value={cinterno}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setCinterno(v.target.value)}
                error={cinterno === "" ? true : false}
                disabled ={tipo !== 1 }
              />
            </Grid>
          </Grid>

        <Grid sx={{ padding:"2%"}}>
        <DialogActions>
        <Button className={tipo === 1 ? "guardar" : "actualizar"} onClick={() => handleSend()}>{tipo === 1 ? "Guardar" : "Actualizar"}</Button>
        </DialogActions>
        </Grid>             

        </Box>
      </ModalForm>
    </div>
  );
};

export default MenuModal;
