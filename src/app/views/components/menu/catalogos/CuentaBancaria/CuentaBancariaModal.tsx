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
import SelectFrag from "../../../Fragmentos/Select/SelectFrag";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import Slider from "../../../Slider";

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
  const [slideropen, setslideropen] = useState(true);
  const [id, setId] = useState("");
  const [numeroCuenta, setNumeroCuenta] = useState("");
  const [clabeBancaria, setClabeBancaria] = useState("");
  const [activo, setActivo] = useState("");
  const user: RESPONSE = JSON.parse(String(getUser()));

  const [idUsuarios, setIdUsuarios] = useState("");
  const [usuarios, setUsuarios] = useState<SelectValues[]>([]);

  const [idBancos, setIdBancos] = useState("");
  const [bancos, setBancos] = useState<SelectValues[]>([]);

  

    console.log("activo: ", activo);


    //SE INTERCAMBIÓ 
  const textoDeAfirmacion = "INACTIVO";
  const textoDeNegacion = "ACTIVO";

  const [checkedActivo, setCheckedActivo] = useState(
    dt?.row?.deleted === "1" ? true : false
  );

  const handleFilterChange1 = (v: string) => {
    console.log(v);
    setIdBancos(v);
  };

  const handleFilterChange2 = (v: string) => {
    console.log(v);
    setIdUsuarios(v);
  };

  const usuariosc = () => {
    let data = { NUMOPERACION: 10 };
    CatalogosServices.SelectIndex(data).then((res) => {
      setBancos(res.RESPONSE);
      setslideropen(false);
    });
  };

  const bancosc = () => {
    let data = { NUMOPERACION: 11 };
    CatalogosServices.SelectIndex(data).then((res) => {
      setBancos(res.RESPONSE);
      setslideropen(false);
    });
  };

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
        DELETED: activo,
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
    if (dt === "") {
      console.log(dt);
    } else {
      setId(dt?.row?.id);
      setIdBancos(dt?.row?.idbanco);
      setIdUsuarios(dt?.row?.idusuario);
      setNumeroCuenta(dt?.row?.NumeroCuenta);
      setClabeBancaria(dt?.row?.ClabeBancaria);
      setActivo(dt?.row?.deleted);
    }
    usuariosc();
    bancosc();
  }, [dt]);

  return (
    <Dialog open={open}>
      <DialogContent>
        <Slider open={slideropen}></Slider>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <label className="Titulo">
              {tipo == 1 ? "Agregar Registro" : "Editar Registro"}
            </label>
          </Box>
          <Box
            sx={{
              margin: 1,
            }}
          >
            <SelectFrag
              value={idUsuarios}
              options={usuarios}
              onInputChange={handleFilterChange2}
              placeholder={"Seleccione Cuenta Perfil"}
              label={""}
              disabled={false}
            />
          </Box>

          <Box
            sx={{
              margin: 1,
            }}
          >
            <SelectFrag
              value={idBancos}
              options={bancos}
              onInputChange={handleFilterChange1}
              placeholder={"Seleccione Banco"}
              label={""}
              disabled={false}
            />
          </Box>

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
            type="number"
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
