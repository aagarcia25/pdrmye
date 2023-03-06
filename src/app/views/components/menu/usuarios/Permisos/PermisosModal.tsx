import { Dialog, TextField, DialogActions, Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react'
import { AlertS } from '../../../../../helpers/AlertS';
import { Toast } from '../../../../../helpers/Toast';
import SelectValues from '../../../../../interfaces/Select/SelectValues';
import { RESPONSE } from '../../../../../interfaces/user/UserInfo';
import { AuthService } from '../../../../../services/AuthService';
import { CatalogosServices } from '../../../../../services/catalogosServices';
import { getUser } from '../../../../../services/localStorage';
import ModalForm from '../../../componentes/ModalForm';
import SelectFrag from '../../../Fragmentos/SelectFrag';


const PermisosModal = ({
  open,
  modo,
  handleClose,
  tipo,
  dt,
}: {
  open: boolean;
  modo: string;
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {


  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [menus, setMenus] = useState<SelectValues[]>([]);
  const [idMenu, setIdMenu] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [referencia, setReferencia] = useState("");

  const handleFilterChange2 = (v: string) => {
    setIdMenu(v);
  };

  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion === 16) {
        setMenus(res.RESPONSE);
      }
    });
  };
  const handleSend = () => {
    if (nombre === "" || descripcion === "" || referencia === "" || idMenu === "") {
      AlertS.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.id,
        PERMISO: nombre,
        DESCRIPCION: descripcion,
        REFERENCIA: referencia,
        IDMENU: idMenu

      };
      handleRequest(data);
    }
  };


  const handleRequest = (data: any) => {
    let titulo = "";
    if (tipo === 1) {
      //AGREGAR
      titulo = "Registro Agregado!";
    } else if (tipo === 2) {
      //EDITAR
      titulo = "Registro Editado!";
    }

    AuthService.permisosindex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: titulo,
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

  useEffect(() => {
    loadFilter(16);
    if (dt === "") {
    } else {
      setId(dt?.row?.id);
      setNombre(dt?.row?.Permiso);
      setdescripcion(dt?.row?.Descripcion);
      setIdMenu(dt?.row?.idMenu)
      setReferencia(dt?.row?.Referencia);
    }
  }, [dt]);


  return (
    <div >
      <Dialog open={open} fullScreen>
        <ModalForm title={modo} handleClose={handleClose}>
          <Box display="flex" justifyContent="center" boxShadow={2} maxWidth="100%" >

            <Box maxWidth="100%" sx={{ padding: "2%" }}>

              <Box maxWidth="65%">
                <SelectFrag
                  value={idMenu}
                  options={menus}
                  onInputChange={handleFilterChange2}
                  placeholder={"Seleccione Menú"}
                  label={""}
                  disabled={modo !== "Agregar Registro"}
                />
              </Box>

              <TextField
                required
                margin="dense"
                id="nombre"
                label="Nombre"
                value={nombre}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setNombre(v.target.value)}
                error={nombre === "" ? true : false}
                inputProps={{ maxLength: 200 }}
                InputProps={{
                  readOnly: tipo === 1 ? false : true,
                  inputMode: "numeric",
                  
                }}
              />



              <TextField
                margin="dense"
                required
                id="descripcion"
                label="Descripción"
                value={descripcion}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setdescripcion(v.target.value)}
                error={descripcion === "" ? true : false}

              />

              <TextField
                margin="dense"
                required
                id="ci"
                label="Control Interno"
                value={referencia}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setReferencia(v.target.value)}
                error={referencia === "" ? true : false}
                disabled ={tipo !== 1 }
              />
              <DialogActions>
                  <Grid  container   direction="row" justifyContent="center" alignItems="center" >
                    <Button className={tipo === 1 ? "guardar" : "actualizar"} onClick={() => handleSend()}>{tipo === 1 ? "Guardar" : "Actualizar"}</Button>
                </Grid>
              </DialogActions>
            </Box>
          </Box>
        </ModalForm>

      </Dialog>
    </div>
  )
}

export default PermisosModal
