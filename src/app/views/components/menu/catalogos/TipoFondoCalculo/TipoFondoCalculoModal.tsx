import {
    DialogContent,
    TextField,
    Button,
    Grid,
    Box,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { AlertS } from "../../../../../helpers/AlertS";
  import { Toast } from "../../../../../helpers/Toast";
  import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
  import { CatalogosServices } from "../../../../../services/catalogosServices";
  import { getUser } from "../../../../../services/localStorage";
  import ModalForm from "../../../componentes/ModalForm";
  import Slider from "../../../Slider";
  
  const TipoFondoCalculoModal = ({
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
    const [id, setId] = useState<string>();
    const [descripcion, setDescripcion] = useState<string>();
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
  
    // const [value, setValue] = React.useState<string>();
    // const [value, setValue] = React.useState<string>();
    // const [value, setValue] = React.useState<string>();
  
    const user: RESPONSE = JSON.parse(String(getUser()));
  
    const [slideropen, setslideropen] = useState(false);
  
     
    const agregar = (data: any) => {
      CatalogosServices.TipoFondosCalculo(data).then((res) => {
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
      CatalogosServices.TipoFondosCalculo(data).then((res) => {
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
      if ( !descripcion) {
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
          DESCRIPCION: descripcion,
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
  
        };
  
        handleRequest(data);
      }
    };
  
    useEffect(() => {
  
      setslideropen(true);
  
      setTimeout(() => {
  
        if (dt === "") {
          //console.log(dt);
        } else {
  
          setId(dt?.row?.id);
          setDescripcion(dt?.row?.Descripcion);
          setNumProyecto(dt?.row?.NumProyecto);
          setConceptoEgreso(dt?.row?.ConceptoEgreso);
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
             
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      margin="dense"
                      required
                      id="Descripcion"
                      label="Descripcion"
                      value={descripcion}
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={(v) => setDescripcion(v.target.value)}
                      error={!descripcion}
                    />
                  </Grid>
  
                  <Grid item xs={12}>
                    <br />
             
                    {/* ////////////////////////// */}
  
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
              
                  </Grid>
  
                </Grid>
  
                <Grid item xs={12} sm={12} md={6} lg={6} sx={{ paddingRight: "2%", paddingLeft: "2%" }}   >
  
                
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
                    label="Clasificacion OP"
                    value={clasificacionOP}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(v) => setClasificacionOP(v.target.value)}
  
  
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
  
  export default TipoFondoCalculoModal;
  