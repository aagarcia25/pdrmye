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
import { porcentage } from "../../CustomToolbar";

const FondosModal = ({
  modo,
  handleClose,
  tipo,
  dt,
}: {
  modo: string;
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {
  const [tipofondoSelect, setTipoFondoSelect] = useState([]);
  const [id, setId] = useState<string>();
  const [clave, setClave] = useState<string>();
  const [descripcion, setDescripcion] = useState<string>();
  const [aplicaCalculo, setAplicaCalculo] = useState(false);
  const [vigente, setVigente] = useState(false);
  const [estatal, setEstatal] = useState<boolean>();
  const [federal, setFederal] = useState<boolean>();
  const [subTipo, setSubTipo] = useState<boolean>(false);

  const [tipofondo, setTipoFondo] = useState("");
  const [tipofondoLabel, setTipoFondoLabel] = useState<string>();
  const [value, setValue] = React.useState<string>();
  const [valueGarantia, setValueGarantia] = React.useState<string>();
  const [orden, setOrden] = React.useState<string>();
  const [porDis, setPorDis] = React.useState<string>();
  const [garantia, setGarantia] = React.useState<boolean>(false);
  const [articulo, setArticulo] = React.useState<string>();
  const [comentarios, setComentarios] = React.useState<string>();
  const [numProyecto, setNumProyecto] = React.useState("");
  const [clasificacionOP, setClasificacionOP] = React.useState<string>();
  const [conceptoEgreso, setConceptoEgreso] = React.useState("");
  const [clasificador01, setClasificador01] = React.useState<string>();
  const [clasificador02, setClasificador02] = React.useState<string>();
  const [clasificador03, setClasificador03] = React.useState<string>();
  const [clasificador04, setClasificador04] = React.useState<string>();
  const [clasificador05, setClasificador05] = React.useState<string>();
  const [clasificador06, setClasificador06] = React.useState<string>();
  const [clasificador07, setClasificador07] = React.useState<string>();
  const [clasificador08, setClasificador08] = React.useState<string>();
  const [clasificador09, setClasificador09] = React.useState<string>();
  const [clasificador10, setClasificador10] = React.useState<string>();
  const [clasificador11, setClasificador11] = React.useState<string>();


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
    setSubTipo(true);
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
    } else {
      setGarantia(false);

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

  const editar = (data: any) => {
    CatalogosServices.fondos(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Editado!",
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
    if (
      clave === null
      || descripcion === null
      || aplicaCalculo === null
      || vigente === null
      //|| subTipo === false
      || estatal === null
      || federal === null
      || porDis === null
      || tipofondo === null) {
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
        CLAVE: clave,
        DESCRIPCION: descripcion,
        APLICACALCULO: aplicaCalculo,
        VIGENTE: vigente,
        ESTATAL: estatal,
        FEDERAL: federal,
        TIPO: tipofondo,
        PORDISTRIBUCION: porDis,
        GARANTIA: garantia,
        ARTICULO: articulo,
        COMENTARIO: comentarios,
        NUMPROYECTO: numProyecto,
        CONCEPTOEGRESO: conceptoEgreso,
        CLASIFICADOR01: clasificador01,
        CLASIFICADOR02: clasificador02,
        CLASIFICADOR03: clasificador03,
        CLASIFICADOR04: clasificador04,
        CLASIFICADOR05: clasificador05,
        CLASIFICADOR06: clasificador06,
        CLASIFICADOR07: clasificador07,
        CLASIFICADOR08: clasificador08,
        CLASIFICADOR09: clasificador09,
        CLASIFICADOR10: clasificador10,
        CLASIFICADOR11: clasificador11,
        CLASIFICACIONOP: clasificacionOP,
        ORDEN: orden,

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

        console.log(dt)
        setId(dt?.row?.id);
        setClave(dt?.row?.Clave);
        setDescripcion(dt?.row?.Descripcion);
        setTipoFondo(dt?.row?.idtipo);
        setTipoFondoLabel(dt?.row?.dtipo);
        setPorDis(dt?.row?.PorcentajeDistribucion);
        setArticulo(dt?.row?.Articulo);
        setNumProyecto(dt?.row?.NumProyecto);
        setConceptoEgreso(dt?.row?.ConceptoEgreso);
        setComentarios(dt?.row?.Comentarios);
        setClasificador01(dt?.row?.Clasificador01);
        setClasificador02(dt?.row?.Clasificador02);
        setClasificador03(dt?.row?.Clasificador03);
        setClasificador04(dt?.row?.Clasificador04);
        setClasificador05(dt?.row?.Clasificador05);
        setClasificador06(dt?.row?.Clasificador06);
        setClasificador07(dt?.row?.Clasificador07);
        setClasificador08(dt?.row?.Clasificador08);
        setClasificador09(dt?.row?.Clasificador09);
        setClasificador10(dt?.row?.Clasificador10);
        setClasificador11(dt?.row?.Clasificador11);
        setClasificacionOP(dt?.row?.ClasificacionOP);
        setOrden(dt?.row?.Orden);

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
        }
        if (dt?.row?.Federal === 1) {
          setValue("Federal");
          setEstatal(false);
          setFederal(true);
        }
        if (dt?.row?.Federal === 0 && dt?.row?.Estatal === 0) {
          setValue("");
          setEstatal(false);
          setFederal(false);
        }
        if (dt?.row?.Garantia === 1) {
          setGarantia(true);

        } else {
          setGarantia(false);
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
                    value={clave}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(v) => setClave(v.target.value)}
                    error={!clave}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    required
                    id="Descripción"
                    label="Descripción"
                    value={descripcion}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(v) => setDescripcion(v.target.value)}
                    error={!descripcion}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    value={aplicaCalculo}
                    control={
                      <Checkbox
                        checked={aplicaCalculo}
                        onChange={handleAplicaCalculo}
                      />
                    }
                    label="Aplica Cálculo"
                  />

                  <FormControlLabel
                    value={vigente}
                    control={
                      <Checkbox
                        checked={vigente}
                        onChange={handleChangeVigencia} />
                    }
                    label="Vigente"
                  />
                </Grid>

                <Grid item xs={12}>
                  <br />
                  <FormControl variant="standard" fullWidth>
                    <InputLabel>{tipofondo ? "Tipo Fondo" : tipofondoLabel}</InputLabel>
                    <Select
                      required
                      onChange={(v) => setTipoFondo(v.target.value)}
                      value={tipofondo}
                      label={tipofondoLabel ? tipofondoLabel : "Tipo Fondo"}
                    >
                      {tipofondoSelect?.map((item: any) => {
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
                      onChange={handleChange}
                      defaultValue={tipo === 2 ?
                        dt?.row?.Estatal === 1 ? "Estatal" :
                          dt?.row?.Federal === 1 ? "Federal" : ""
                        :
                        ""}
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
                    label="Porcentaje de Distribución"
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

                    <FormLabel component="legend">Garantía</FormLabel>
                    <RadioGroup
                      row
                      aria-label="gender"
                      name="gender1"
                      value={valueGarantia}
                      onChange={handleGarantia}
                      defaultValue={(tipo === 2) ? dt?.row?.Garantia === 1 ? "si" : "no" : ""}
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
                    label="Artículo"
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
                    label="Número de Proyecto"
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
                    label="Concepto De Egreso"
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
                  value={clasificador01}
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
                  value={clasificador02}
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
                  value={clasificador03}
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
                  value={clasificador04}
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
                  value={clasificador05}
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
                  value={clasificador06}
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
                  value={clasificador07}
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
                  value={clasificador08}
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
                  value={clasificador09}
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
                  value={clasificador10}
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
                  value={clasificador11}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setClasificador11(v.target.value)}
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                  id="ClasificacionOP"
                  label="Clasificación OP"
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
