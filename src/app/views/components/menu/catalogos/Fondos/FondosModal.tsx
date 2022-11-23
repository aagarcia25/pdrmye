import {
  DialogContent,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Radio,
  FormControl,
  RadioGroup,
  InputLabel,
  MenuItem,
  Select,
  FormLabel,
  Box,
  Typography,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getUser } from "../../../../../services/localStorage";
import ModalForm from "../../../componentes/ModalForm";
import SelectFrag from "../../../Fragmentos/SelectFrag";
import Slider from "../../../Slider";

const FondosModal = ({
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
  const [TipofondoSelect, setTipoFondoSelect] = useState([]);
  const [id, setId] = useState<string>();
  const [Clave, setClave] = useState<string>();
  const [Descripcion, setDescripcion] = useState<string>();
  const [AplicaCalculo, setAplicaCalculo] = useState(false);
  const [Vigente, setVigente] = useState(false);
  const [Estatal, setEstatal] = useState(false);
  const [Federal, setFederal] = useState(false);
  const [Tipofondo, setTipoFondo] = useState("");
  const [value, setValue] = React.useState<string>();
  const [valueGarantia, setValueGarantia] = React.useState<string>();

  const [numProyecto, setNumProyecto] = React.useState("");
  const [conceptoEgreso, setConceptoEgreso] = React.useState("");
  const [clasificacionOP, setClasificacionOP] = React.useState<string>();
  const [orden, setOrden] = React.useState<string>();
  const [porDis, setPorDis] = React.useState<string>();
  const [garantia, setGarantia] = React.useState<boolean>(false);
  const [articulo, setArticulo] = React.useState<string>();
  const [comentarios, setComentarios] = React.useState<string>();
  const [Clasificador01, setClasificador01] = React.useState<string>();
  const [Clasificador02, setClasificador02] = React.useState<string>();
  const [Clasificador03, setClasificador03] = React.useState<string>();
  const [Clasificador04, setClasificador04] = React.useState<string>();
  const [Clasificador05, setClasificador05] = React.useState<string>();
  const [Clasificador06, setClasificador06] = React.useState<string>();
  const [Clasificador07, setClasificador07] = React.useState<string>();
  const [Clasificador08, setClasificador08] = React.useState<string>();
  const [Clasificador09, setClasificador09] = React.useState<string>();
  const [Clasificador10, setClasificador10] = React.useState<string>();
  const [Clasificador11, setClasificador11] = React.useState<string>();

  // const [value, setValue] = React.useState<string>();
  // const [value, setValue] = React.useState<string>();
  // const [value, setValue] = React.useState<string>();

  const user: RESPONSE = JSON.parse(String(getUser()));

  const [slideropen, setslideropen] = useState(false);




  const handleChangeVigencia = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVigente(event.target.checked);
  };

  const handleAplicaCalculo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAplicaCalculo(event.target.checked);
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    if ((event.target as HTMLInputElement).value === "Estatal") {
      setEstatal(true);
      setFederal(false);
    } else {
      setEstatal(false);
      setFederal(true);
    }
  };
  const handleGarantia = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueGarantia((event.target as HTMLInputElement).value);
    if ((event.target as HTMLInputElement).value === "si") {
      setGarantia(true);
      console.log(true)
    } else {
      setGarantia(false);
      console.log(false)

    }
  };

  const tipos = () => {
    let data = { NUMOPERACION: 4 };
    CatalogosServices.tipofondo(data).then((res) => {
      setTipoFondoSelect(res.RESPONSE || "");

    });
  };

  const agregar = (data: any) => {
    CatalogosServices.fondos(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Agregado!",
        });
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const editar = (data: any) => {
    CatalogosServices.fondos(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Editado!",
        });
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
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

  const handleSend = () => {
    if (Clave === null || Descripcion === null) {
      AlertS.fire({
        title: "",
        text: "Favor de Completar los Campos",
        icon: "warning",
      });
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.id,
        CLAVE: Clave,
        DESCRIPCION: Descripcion,
        APLICACALCULO: AplicaCalculo,
        VIGENTE: Vigente,
        ESTATAL: Estatal,
        FEDERAL: Federal,
        TIPO: Tipofondo,






      };

      handleRequest(data);
    }
  };

  useEffect(() => {

    tipos();
    setslideropen(true);

    setTimeout(() => {

      if (dt === "") {
        //console.log(dt);
      } else {
        setId(dt?.row?.id);
        setClave(dt?.row?.Clave);
        setDescripcion(dt?.row?.Descripcion);
        setTipoFondo(dt?.row?.idtipo);

        if (dt?.row?.AplicaCalculo === 1) {
          setAplicaCalculo(true);
        } else {
          setAplicaCalculo(false);
        }

        if (dt?.row?.Vigente === 1) {
          setVigente(true);
        } else {
          setVigente(false);
        }


        if (dt?.row?.Estatal === 1) {
          setValue("Estatal");
          setEstatal(true);
          setFederal(false);
        } else {
          setValue("Federal");
          setEstatal(false);
          setFederal(true);
        }
      }

      setslideropen(false)
    }, 2000)






  }, [dt]);

  return (
    <div>
      <Slider open={slideropen}></Slider>
      <ModalForm title={modo} handleClose={handleClose}>

        <DialogContent>
          <Grid container spacing={6}>

          </Grid>
        </DialogContent>


        <Grid item xs={11} sm={11} md={11} lg={11} >
          <Box display="flex" flexWrap="wrap" boxShadow={2} sx={{ padding: "2%" }}>
            <Grid container sx={{ paddingRight: "2%", paddingLeft: "2%" }}  >

              <Grid item xs={12} sm={12} md={6} lg={6} sx={{ paddingRight: "2%", paddingLeft: "2%" }}  >


                <Grid item xs={12}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    required
                    id="Clave"
                    label="Clave"
                    value={Clave}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(v) => setClave(v.target.value)}
                    error={!Clave}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    required
                    id="Descripcion"
                    label="Descripcion"
                    value={Descripcion}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(v) => setDescripcion(v.target.value)}
                    error={!Descripcion}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    value={AplicaCalculo}
                    control={
                      <Checkbox
                        checked={AplicaCalculo}
                        onChange={handleAplicaCalculo}
                      />
                    }
                    label="Aplica Cálculo"
                  />

                  <FormControlLabel
                    value={Vigente}
                    control={
                      <Checkbox
                        checked={Vigente}
                        onChange={handleChangeVigencia} />
                    }
                    label="Vigente"
                  />
                </Grid>

                <Grid item xs={12}>
                  <br />
                  <FormControl variant="standard" fullWidth>
                    <InputLabel>Tipo</InputLabel>
                    <Select
                      required
                      onChange={(v) => setTipoFondo(v.target.value)}
                      value={Tipofondo}
                      label="Tipo"
                    >
                      {TipofondoSelect?.map((item: any) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item.Descripcion}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <br />
                  <FormControl component="fieldset" error={!value} >
                    <FormLabel component="legend">Sub Tipo</FormLabel>
                    <RadioGroup
                      row
                      aria-label="gender"
                      name="gender1"
                      value={value}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Estatal"
                        control={<Radio />}
                        label="Estatal"
                      />
                      <FormControlLabel
                        value="Federal"
                        control={<Radio />}
                        label="Federal"
                      />
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    required
                    id="PorcentajeDistribucion"
                    label="Porcentaje de Distribucion"
                    value={porDis}
                    type="number"
                    fullWidth
                    variant="standard"
                    onChange={(v) => setPorDis(v.target.value)}
                    error={!porDis}
                  />
                  {/* ////////////////////////// */}
                  <br />
                  <br />
                  <FormControl component="fieldset" >

                    <FormLabel component="legend">Garantia</FormLabel>
                    <RadioGroup
                      row
                      aria-label="gender"
                      name="gender1"
                      value={valueGarantia}
                      onChange={handleGarantia}
                    >
                      <FormControlLabel
                        value="si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <br />

                  <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    required
                    id="Articulo"
                    label="Articulo"
                    value={articulo}
                    type="number"
                    fullWidth
                    variant="standard"
                    onChange={(v) => setArticulo(v.target.value)}
                  />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    required
                    multiline
                    id="NumProyecto"
                    label="Numero de Proyecto"
                    value={numProyecto}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(v) => setNumProyecto(v.target.value)}

                  />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    multiline
                    id="ConceptoEgreso"
                    label="ConceptoEgreso"
                    value={conceptoEgreso}
                    type="number"
                    fullWidth
                    variant="standard"
                    onChange={(v) => setConceptoEgreso(v.target.value)}
                  />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    multiline
                    id="Comentarios"
                    label="Comentarios"
                    value={comentarios}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(v) => setComentarios(v.target.value)}
                  />
                </Grid>

              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} sx={{ paddingRight: "2%", paddingLeft: "2%" }}   >

                <TextField
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                  id="Clasificador01"
                  label="Administrativo"
                  value={Clasificador01}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setClasificador01(v.target.value)}
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                  id="Clasificador02"
                  label="Funcional"
                  value={Clasificador02}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setClasificador02(v.target.value)}
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                  id="Clasificador02"
                  label="Programático"
                  value={Clasificador03}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setClasificador03(v.target.value)}
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                  id="Clasificador04"
                  label="Objeto de Gasto (Partida)"
                  value={Clasificador04}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setClasificador04(v.target.value)}
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                  id="Clasificador05"
                  label="Tipo de Gasto"
                  value={Clasificador05}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setClasificador05(v.target.value)}
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                  id="Clasificador06"
                  label="Fuente de Financiamiento"
                  value={Clasificador06}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setClasificador06(v.target.value)}
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                  id="Clasificador07"
                  label="Ramo-Fondo Convenio"
                  value={Clasificador07}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setClasificador07(v.target.value)}
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                  id="Clasificador08"
                  label="Año del Recurso"
                  value={Clasificador08}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setClasificador08(v.target.value)}
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                  id="Clasificador09"
                  label="Control Interno"
                  value={Clasificador09}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setClasificador09(v.target.value)}
                />

                <TextField
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                  id="Clasificador10"
                  label="Geográfica"
                  value={Clasificador10}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setClasificador10(v.target.value)}
                />

                <TextField
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                  id="Clasificador11"
                  label="Proyecto/Programa"
                  value={Clasificador11}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setClasificador11(v.target.value)}
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                  id="ClasificacionOP"
                  label="Clasificacion OP"
                  value={clasificacionOP}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setClasificacionOP(v.target.value)}


                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                  id="Orden"
                  label="Orden"
                  value={orden}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setOrden(v.target.value)}


                />


              </Grid>



            </Grid>


          </Box>
        </Grid>


        <Grid container
          sx={{
            mt: "2vh",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Grid item xs={4} sm={3} md={2} lg={1}
          >
            <Button className={tipo === 1 ? "guardar" : "actualizar"} onClick={() => handleSend()}>{tipo === 1 ? "Guardar" : "Actualizar"}</Button>
          </Grid>
        </Grid>


      </ModalForm>
    </div>
  );
};

export default FondosModal;
