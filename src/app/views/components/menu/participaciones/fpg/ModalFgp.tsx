import {
    Grid,
    IconButton,
    Input,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import { Alert } from "../../../../../helpers/Alert";
  import { Toast } from "../../../../../helpers/Toast";
  import Imeses from "../../../../../interfaces/filtros/meses";
  import { CatalogosServices } from "../../../../../services/catalogosServices";
  import { BtnRegresar } from "../../catalogos/Utilerias/AgregarCalculoUtil/BtnRegresar";
  import { SubTitulo } from "../../catalogos/Utilerias/AgregarCalculoUtil/SubTitulo";
  import { Titulo } from "../../catalogos/Utilerias/AgregarCalculoUtil/Titulo";
  import CalculateIcon from "@mui/icons-material/Calculate";
  import { COLOR } from "../../../../../styles/colors";
import { calculosServices } from "../../../../../services/calculosServices";
  
  const ModalFgp = ({
    titulo,
    onClickBack,
    handleClose,
    dt,
  }: {
    titulo: string;
    onClickBack: Function;
    handleClose:Function;
    dt:any;
  }) => {
    const [id, setId] = useState("");
  
    const [anio, setAnio] = useState("");
    const [mes, setMes] = useState("");
    const [monto, setMonto] = useState("");
    const [periodo, setPeriodo] = useState("");
    const [periodos, setPeriodos] = useState([]);
  
    const [meses, setMeses] = useState<Imeses[]>();
  
    let year: number = new Date().getFullYear();
  
    const handleSend = () => {
      if (monto == "") {
        Alert.fire({
          title: "Error!",
          text: "Favor de Completar los Campos",
          icon: "error",
        });
      } else {
        let data = {
            CHUSER: 1,
            NUMOPERACION: 1,
            IDESTATUS:1,
            CLAVEFONDO:"FGP",
            ANIO:year,
            MES:mes,
            ANIOPOBLACION:2020,
        };
  
        agregar(data);
      }
    };
  
    const agregar = (data: any) => {
      calculosServices.CalculoPrincipalindex(data).then((res) => {
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
  
    const handleChange = (event: SelectChangeEvent) => {
      setMes(event.target.value);
    };
  
    const mesesc = () => {
      let data = {};
      CatalogosServices.meses(data).then((res) => {
        setMeses(res.RESPONSE);
      });
    };
  
    const ajustesc = () => {
      let data = { NUMOPERACION: 4 };
      CatalogosServices.AjustesIndex(data).then((res) => {
        setPeriodos(res.RESPONSE || "");
      });
    };
  
    useEffect(() => {
      mesesc();
      ajustesc();
      if(dt === ''  ){
         
         
      }else{
          setId(dt?.row?.id)
          setAnio(dt?.row?.Anio)
          setMes(dt?.row?.Mes)
          setMonto(dt?.row?.Monto)
          setPeriodo(dt?.row?.Periodo)
      }
     
    }, [dt]);
    return (
      <Grid container spacing={3}>
        <Titulo name={titulo} />
        <BtnRegresar onClick={onClickBack} />
        <SubTitulo />
  
        <Grid
          item
          xs={3}
          sx={{
            //Anio
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontWeight: "Bold" }}>Año:</Typography>
        </Grid>
        <Grid item xs={3}>
          <Input id="anio" readOnly defaultValue={year}></Input>
        </Grid>
        <Grid item xs={6}></Grid>
  
        <Grid
          item
          xs={3}
          sx={{
            //Mes
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "Bold" }}>Mes:</Typography>
        </Grid>
        <Grid item xs={1.6} sx={{}}>
          <Select
            id="mes"
            value={mes}
            required
            onChange={(v) => setMes(v.target.value)}
            
            // inputProps={{
            //   readOnly: tipo == 1 ? false : true,
            // }}
          >
            {meses?.map((item: Imeses) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.Descripcion}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item xs={6}></Grid>
  
        <Grid
          item
          xs={3}
          sx={{
            //Monto
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontWeight: "Bold" }}>Monto:</Typography>
        </Grid>
        <Grid item xs={3}>
          <Input
            required
            placeholder="1500000*"
            id="monto"
            onChange={(v) => setMonto(v.target.value)}
            error={monto == "" ? true : false}
            type="number"
          ></Input>
        </Grid>
        <Grid item xs={6}></Grid>
  
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "Bold" }}>Periodo:</Typography>
        </Grid>
        <Grid item xs={1.6} sx={{}}>
          <Select
            id="periodo"
            required
            onChange={(v) => setPeriodo(v.target.value)}
            value={periodo}
            // inputProps={{
            //   readOnly: tipo == 1 ? false : true,
            // }}
          >
            {periodos?.map((item: any) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.Descripcion}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item xs={6}></Grid>
  
        <Grid
          item
          xs={3}
          sx={{ mt: 3, display: "flex", justifyContent: "center" }}
        >
          <IconButton
            onClick={handleSend}
            sx={{
              borderRadius: 1,
              border: 1,
              bgcolor: COLOR.negro,
              color: COLOR.blanco,
              "&:hover": {
                bgcolor: COLOR.grisTarjetaBienvenido,
                color: COLOR.negro,
              },
            }}
          >
            <CalculateIcon />
            Calcular
          </IconButton>
        </Grid>
      </Grid>
    );
  };
  
  export default ModalFgp;
  