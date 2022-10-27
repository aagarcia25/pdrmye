import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  TextField,
  DialogActions,
  FormGroup,
  InputLabel,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
} from "@mui/material";

import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getUser } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";

export const CuentaBancariaModal = ({
  open,
  handleClose,
  tipo,
  dt,
}: {
  open: boolean;
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {
  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState("");
  const [idBancos, setIdBancos] = useState("");
  const [idUsuarios, setIdUsuarios] = useState("");
  const [numeroCuenta, setNumeroCuenta] = useState("");
  const [clabeBancaria, setClabeBancaria] = useState("");
  const [activo, setActivo] = useState("");
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [banco, setBanco] = useState("");
  const [bancos, setBancos] = useState<[]>();

  const [checkedActivo, setCheckedActivo] = useState(dt?.row?.ArtF1 === '1' ? true : false);

  const textoDeAfirmacion = "SI";
  const textoDeNegacion = "NO";

  const bancosc = () => {
    let data = {};
    CatalogosServices.Bancos(data).then((res) => {
      setBancos(res.RESPONSE);
    });
  };

console.log("bancos: ",bancos);

  const toggleCheckedActivo = () => {
    setCheckedActivo((prev) => !prev);
    if (checkedActivo === true) {
        setActivo("0");
    } else {
        setActivo("1");
    }
  };

  

  const handleSend = () => {
    if (!idBancos || !idUsuarios || !numeroCuenta || !clabeBancaria) {
      Alert.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.id,
        IDBANCOS: idBancos,
        IDUSUARIOS: idUsuarios,
        NUMEROCUENTA: numeroCuenta,
        CLABEBANCARIA: clabeBancaria,
        DELETED: activo
      };

      handleRequest(data);
      handleClose();
    }
  };

  const handleRequest = (data: any) => {
    console.log(data);
    if (tipo == 1) {
      //AGREGAR
      agregar(data);
    } else if (tipo == 2) {
      //EDITAR

      editar(data);
    }
  };

  const agregar = (data: any) => {
    CatalogosServices.CuentaBancaria(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Agregado!",
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

  const editar = (data: any) => {
    CatalogosServices.CuentaBancaria(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Editado!",
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

  useEffect(() => {
    bancosc();
    if (dt === "") {
      console.log(dt);
    } else {
      setId(dt?.row?.id);

      setIdBancos(dt?.row?.IdBancos);
      setIdUsuarios(dt?.row?.IdUsuarios);
      setNumeroCuenta(dt?.row?.NumeroCuenta);
      setClabeBancaria(dt?.row?.ClabeBancaria);
      setActivo(dt?.row?.Activo);
    }
  }, [dt]);

  return (
    <Dialog open={open}>
      <DialogContent>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <label className="Titulo">
              {tipo == 1 ? "Agregar Registro" : "Editar Registro"}
            </label>
          </Box>
          <TextField
            required
            margin="dense"
            id="IdUsuarios"
            label="Nombre"
            value={idUsuarios}
            type="text"
            fullWidth
            variant="standard"
            onChange={(v) => setIdUsuarios(v.target.value)}
            error={idUsuarios == "" ? true : false}
            InputProps={{
              readOnly: tipo == 1 ? false : true,
            }}
          />
           <Select
          required
          onChange={(v) => setBanco(v.target.value)}
          value={banco}
          // inputProps={{
          //   readOnly: tipo == 1 ? false : true,
          // }}
        >
          {bancos?.map((item: any) => {
            return (
              <MenuItem key={item?.id} value={item?.id}>
                {item.Nombre}
              </MenuItem>
            );
          })}
        </Select>
          <TextField
            required
            margin="dense"
            id="IdBancos"
            label="Banco"
            value={idBancos}
            type="text"
            fullWidth
            variant="standard"
            onChange={(v) => setIdBancos(v.target.value)}
            error={idBancos == "" ? true : false}
            InputProps={{}}
          />

          <TextField
            required
            margin="dense"
            id="NumeroCuenta"
            label="Cuenta"
            value={numeroCuenta}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setNumeroCuenta(v.target.value)}
            error={numeroCuenta == "" ? true : false}
            InputProps={{}}
          />

          <TextField
            required
            margin="dense"
            id="ClabeBancaria"
            label="Clabe"
            value={clabeBancaria}
            type="text"
            fullWidth
            variant="standard"
            onChange={(v) => setClabeBancaria(v.target.value)}
            error={clabeBancaria == "" ? true : false}
            InputProps={{}}
          />
          <FormGroup>
            <InputLabel>Estatus</InputLabel>
            <FormControlLabel
              control={
                <Switch
                  id="Activo"
                  checked={checkedActivo}
                  onChange={toggleCheckedActivo}
                  color="default"
                />
              }
              label={checkedActivo ? textoDeAfirmacion : textoDeNegacion}
            />
          </FormGroup>
        </Box>
      </DialogContent>

      <DialogActions>
        <button className="guardar" onClick={() => handleSend()}>
          Guardar
        </button>
        <button className="cerrar" onClick={() => handleClose()}>
          Cancelar
        </button>
      </DialogActions>
    </Dialog>
  );
};
