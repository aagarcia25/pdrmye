import { Box, Button, Container, Dialog, DialogActions, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { AlertS } from "../../../../../helpers/AlertS";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../../services/localStorage";
import { calculosServices } from "../../../../../services/calculosServices";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import ModalForm from "../../../componentes/ModalForm";

export const CalculoGarantiaModal = ({
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
  const [id, setId] = useState("");
  const [anio, setAnio] = useState("");
  const [garantia, setGarantia] = useState("");

  const [municipio, setMunicipio] = useState("");
  const [municipios, setMunicipios] = useState([]);

  const [claveFondo, setClaveFondo] = useState("");
  const [fondos, setFondos] = useState([]);

  const user: RESPONSE = JSON.parse(String(getUser()));


  const municipiosC = () => {
    let data = { NUMOPERACION: 4 };
    CatalogosServices.municipios(data).then((res) => {
      setMunicipios(res.RESPONSE || "");

    });
  };

  const todosFondos = () => {
    let data = { NUMOPERACION: 4 };
    CatalogosServices.fondos(data).then((res) => {
      setFondos(res.RESPONSE || "");

    });
  };



  const handleSend = () => {
    if (!anio || !claveFondo || !municipio) {
      AlertS.fire({
        title: "¡Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        CHID: id,
        CHUSER: user.id,
        NUMOPERACION: tipo,
        ANIO: anio,
        CLAVEFONDO: claveFondo,
        GARANTIA: garantia,
        IDMUNICIPIO: municipio,
        DELETED: 0,
      };
      //console.log("data de modal", data);
      handleRequest(data);
      handleClose();
    }
  };

  const handleRequest = (data: any) => {
    //console.log(data);
    if (tipo === 1) {
      //AGREGAR
      agregar(data);
    } else if (tipo === 2) {
      //EDITAR
      editar(data);
    }
  };

  const agregar = (data: any) => {
    calculosServices.CalculoGarantia(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Agregado!",
        });
        //console.log("Sé pudo agregar");
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
        //console.log("No se pudo agregar");
      }
    });
  };

  const editar = (data: any) => {
    calculosServices.CalculoGarantia(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Editado!",
        });
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    municipiosC();

    todosFondos();

    if (dt === "") {
    } else {
      //SE PINTAN LOS CAMPOS
      setId(dt?.row?.id);
      setAnio(dt?.row?.Anio);
      setClaveFondo(dt?.row?.ClaveFondo);
      setGarantia(dt?.row?.Garantia);
      setMunicipio(dt?.row?.idMunicipio);
    }
  }, [dt]);

  return (

    <ModalForm title={modo} handleClose={handleClose}>

        <Box>

          {(modo === "Agregar Registro") ?
            <Container maxWidth="sm">
              <FormControl variant="standard" fullWidth>
                <InputLabel>Municipio</InputLabel>
                <Select
                  required
                  onChange={(v) => setMunicipio(v.target.value)}
                  value={municipio}
                  label="Municipio"
                  error={!municipio ? true : false}
                >
                  {municipios?.map((item: any) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.Nombre}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel>Fondo</InputLabel>
                <Select
                  required
                  onChange={(v) => setClaveFondo(v.target.value)}
                  value={claveFondo}
                  label="Fondo"
                  error={!claveFondo ? true : false}
                >
                  {fondos?.map((item: any) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.Descripcion}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <TextField
                required
                margin="dense"
                id="Anio"
                label="Año"
                value={anio}
                type="number"
                fullWidth
                variant="standard"
                onChange={(v) => setAnio(v.target.value)}
                error={!anio ? true : false}
                InputProps={{}}
              />
              <TextField
                required
                margin="dense"
                id="Garantia"
                label="Garantía"
                value={garantia}
                type="decimal"
                fullWidth
                variant="standard"
                onChange={(v) => setGarantia(v.target.value)}
                InputProps={{}}
              />
            </Container>
            :    <Container maxWidth="sm">

            <FormControl variant="standard" fullWidth>
              <InputLabel>Municipio</InputLabel>
              <Select
                required
                onChange={(v) => setMunicipio(v.target.value)}
                value={municipio}
                label="Municipio"
                error={!municipio ? true : false}
                disabled
              >
                {municipios?.map((item: any) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.Nombre}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl variant="standard" fullWidth>
              <InputLabel>Fondo</InputLabel>
              <Select
                required
                onChange={(v) => setClaveFondo(v.target.value)}
                value={claveFondo}
                label="Fondo"
                error={!claveFondo ? true : false}
                disabled
              >
                {fondos?.map((item: any) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.Descripcion}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              required
              margin="dense"
              id="Anio"
              label="Año"
              value={anio}
              type="number"
              fullWidth
              variant="standard"
              onChange={(v) => setAnio(v.target.value)}
              error={!anio ? true : false}
              disabled
              InputProps={{}}
            />
            <TextField
              required
              margin="dense"
              id="Garantia"
              label="Garantía"
              value={garantia}
              type="decimal"
              fullWidth
              variant="standard"
              onChange={(v) => setGarantia(v.target.value)}
              InputProps={{}}
            />

          </Container>}
          
        </Box>

        <Grid item xs={12} container  direction="row" justifyContent="center" alignItems="center">
          <Button className={tipo === 1 ? "guardar" : "actualizar"} onClick={() => handleSend()}>{tipo === 1 ? "Guardar" : "Actualizar"}</Button>
      </Grid>

    </ModalForm>
  );
};
