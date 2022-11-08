import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getUser } from "../../../../../services/localStorage";
import SelectFrag from "../../../Fragmentos/SelectFrag";

export const DepartamentosModal = ({
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
  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState<String>();
  const [usuarios, setUsuarios] = useState<SelectValues[]>([]);
  const [nombreCorto, setNombreCorto] = useState<String>();
  const [descripcion, setDescripcion] = useState<String>();
  const [responsable, setResponsable] = useState<String>("");
  const user: RESPONSE = JSON.parse(String(getUser()));

  const handleSend = () => {
    if (!nombreCorto || !descripcion || !responsable|| responsable=="") {
      Alert.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        CHID: id,
        CHUSER: user.id,
        NUMOPERACION: tipo,
        NOMBRECORTO: nombreCorto,
        DESCRIPCION: descripcion,
        RESPONSABLE: responsable,
      };
      console.log("data de modal", data);
      handleRequest(data);
      handleClose();
    }
  };
  
  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion };
      CatalogosServices.SelectIndex(data).then((res) => {
          setUsuarios(res.RESPONSE);
      });
    }

    const handleChange = (v: string) => {
      console.log(v)
       v=="false"?setResponsable(""):setResponsable(v);
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
    CatalogosServices.departamentos(data).then((res) => {
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
    CatalogosServices.departamentos(data).then((res) => {
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
    console.log(dt?.row)
    loadFilter(10);
    if (dt === "") {
    } else {
      //SE PINTAN LOS CAMPOS
      setId(dt?.row?.id);
      console.log(dt?.row?.id)
      setNombreCorto(dt?.row?.NombreCorto);
      setDescripcion(dt?.row?.Descripcion);
      setResponsable(dt?.row?.Responsable);
    }
  }, [dt]);

  return (
    <Dialog open={open} fullScreen>
      <DialogContent>
        <Box sx={{ justifyContent: "center", height:450 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <label className="Titulo">{modo}</label>
          </Box>
          {modo === "Agregar Registro" ? (
            <Container maxWidth="sm">
              <TextField
                required
                margin="dense"
                id="NombreCorto"
                label="Nomenclatura"
                value={nombreCorto}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setNombreCorto(v.target.value)}
                error={!nombreCorto ? true : false}
                InputProps={{}}
              />
              <TextField
                required
                margin="dense"
                id="Descripcion"
                label="Descripción"
                value={descripcion}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setDescripcion(v.target.value)}
                error={!descripcion ? true : false}
                InputProps={{}}
              />
                   <Box sx={{
                margin:1
               }}>
                <SelectFrag
                  value={String(responsable)}
                  options={usuarios}
                  onInputChange={handleChange}
                  placeholder={"Seleccione Usuario"}
                  label={""}
                  disabled={false}
                />
                </Box>
            </Container>
          ) : (
            ""
          )}

          {modo === "Editar Registro" ? (
            <Container maxWidth="sm">
              <TextField
                disabled
                required
                margin="dense"
                id="NombreCorto"
                label="Nomenclatura"
                value={nombreCorto}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setNombreCorto(v.target.value)}
                error={!nombreCorto ? true : false}
                InputProps={{}}
              />
              <TextField
                required
                margin="dense"
                id="Descripcion"
                label="Descripción"
                value={descripcion}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setDescripcion(v.target.value)}
                error={!descripcion ? true : false}
                InputProps={{}}
              />
              <Box sx={{
                margin:1
               }}>
                <SelectFrag
                  value={String(responsable)}
                  options={usuarios}
                  onInputChange={handleChange}
                  placeholder={"Seleccione Usuario"}
                  label={""}
                  disabled={false}
                />
                </Box>
            </Container>
          ) : (
            ""
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <button className="guardar" onClick={() => handleSend()}>
          Guardar
        </button>
        <button className="cerrar" onClick={() => handleClose()}>
          Cerrar
        </button>
      </DialogActions>
    </Dialog>
  );
};
