import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getUser } from "../../../../../services/localStorage";
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
  const user = getUser();
  const [id, setId] = useState("");
  const [Clave, setClave] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [AplicaCalculo, setAplicaCalculo] = useState(false);
  const [Vigente, setVigente] = useState(false);
  const [Estatal, setEstatal] = useState(false);
  const [Federal, setFederal] = useState(false);
  const [Tipofondo, setTipoFondo] = useState("");
  const [value, setValue] = React.useState("");

  const [slideropen, setslideropen] = useState(false);




  const handleChangeVigencia = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVigente(event.target.checked);
  };

  const handleAplicaCalculo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAplicaCalculo(event.target.checked);
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    if((event.target as HTMLInputElement).value == "Estatal"){
      setEstatal(true);
      setFederal(false);
    }else{
      setEstatal(false);
      setFederal(true);
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
        Alert.fire({
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
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
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

  const handleSend = () => {
    if (Clave == "" || Descripcion == "") {
      Alert.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: 1,
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

    setslideropen(true)
    setTimeout(() => {
    
      if (dt === "") {
        console.log(dt);
      } else {
        setId(dt?.row?.id);
        setClave(dt?.row?.Clave);
        setDescripcion(dt?.row?.Descripcion);
        setTipoFondo(dt?.row?.idtipo);
  
        if(dt?.row?.AplicaCalculo == 1){
          setAplicaCalculo(true);
        }else{
          setAplicaCalculo(false);
        }
  
        if(dt?.row?.Vigente == 1){
          setVigente(true);
        }else{
          setVigente(false);
        }
      
       
        if(dt?.row?.Estatal == 1){
          setValue("Estatal");
          setEstatal(true);
          setFederal(false);
        }else{
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
      <Dialog open={open}>
        <DialogTitle>{modo}</DialogTitle>
        <DialogContent>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                required
                id="Clave"
                label="Clave"
                value={Clave}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setClave(v.target.value)}
                error={Clave == "" ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                required
                id="Descripcion"
                label="Descripcion"
                value={Descripcion}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setDescripcion(v.target.value)}
                error={Descripcion == "" ? true : false}
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
                  <Checkbox checked={Vigente} onChange={handleChangeVigencia} />
                }
                label="Vigente"
              />
            </Grid>

            <Grid item xs={12}>
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
              <FormControl component="fieldset">
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
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSend()}>Guardar</Button>
          <Button onClick={() => handleClose()}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FondosModal;
