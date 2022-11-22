import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Grid,
  Button,
} from "@mui/material";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { Imunicipio } from "../../../../../interfaces/municipios/FilterMunicipios";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getMunicipios, getUser,  validaLocalStorage } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import ModalForm from "../../../componentes/ModalForm";
import SelectValues from "../../../../../interfaces/Select/SelectValues";


const MunPobrezaExtremaModal = ({
  open,
  modo,
  handleClose,
  tipo,
  dt
}: {
  open: boolean;
  modo: string;
  tipo: number;
  handleClose: Function,
  dt: any
}) => {




  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState("");
  const [anio, setAnio] = useState<number>();
  const [poblacion, setPoblacion] = useState<number>();
  const [porcentaje, setPorcentage] = useState<number>();
  const [carenciaProm, setCarenciaProm] = useState<number>();
  const [IdMunicipio, setIdMunicipio] = useState<object>();
  const [values, setValues] = useState<Imunicipio[]>();
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [municipio, setMunicipios] = useState<SelectValues[]>([]);



  const municipiosc = () => {
    let data = {};
    if (!validaLocalStorage("FiltroMunicipios")) {
      CatalogosServices.Filtromunicipios(data).then((res) => {
        setMunicipios(res.RESPONSE);
      });
    }
    let m: Imunicipio[] = JSON.parse(getMunicipios() || "");
    setValues(m);
  };




  const handleSend = () => {
    if (poblacion == null || anio == null || carenciaProm == null || IdMunicipio == null) {
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
        ANIO: anio,
        IDMUNICIPIO: IdMunicipio,
        PERSONAS: poblacion,
        PORCENTAJE: porcentaje,
        CARENCIAPROMEDIO: carenciaProm,


      };

      handleRequest(data);
      handleClose("save");
    }
  };

  const handleRequest = (data: any) => {
    //console.log(data);
    if (tipo == 1) {
      //AGREGAR
      agregar(data);
    } else if (tipo == 2) {
      //EDITAR

      editar(data);
    }
  };



  const agregar = (data: any) => {
    CatalogosServices.munpobrezaext(data).then((res) => {
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
  const handle = () => {

  };

  const editar = (data: any) => {
    CatalogosServices.munpobrezaext(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Solicitud de Edicion Enviada!",
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



  useEffect(() => {
    municipiosc();

    if (dt === '') {
      //console.log(dt)

    } else {
      setId(dt?.row?.id)
      setAnio(dt?.row?.Anio)
      setPoblacion(dt?.row?.Personas)
      setIdMunicipio(dt?.row?.idmunicipio)
      setPorcentage(dt?.row?.Porcentaje)
      setCarenciaProm(dt?.row?.CarenciaProm)
    }

    let data = { NUMOPERACION: 5 };
    CatalogosServices.SelectIndex(data).then((res) => {
      setMunicipios(res.RESPONSE);
    });


  }, [dt]);



  return (


    <div>
      <ModalForm title={modo} handleClose={handleClose}>
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
          <Grid item xs={7} sm={8} md={8} lg={8}>
          <Box>
          <label className="Titulo">{dt?.row?.Nombre}</label>
          </Box>
          </Grid>
          <Grid item xs={7} sm={8} md={8} lg={8}>
            {(modo === "Agregar Registro") ?
              <TextField
                required
                margin="dense"
                id="anio"
                label="Año"
                value={anio}
                type="number"
                fullWidth
                variant="standard"
                onChange={(v) => setAnio(Number(v.target.value))}
                error={anio == null ? true : false}
                InputProps={{
                  readOnly: tipo == 1 ? false : true,

                }}
              />
              :
              <TextField
                required
                margin="dense"
                id="anio"
                label="Año"
                value={anio}
                type="number"
                fullWidth
                variant="standard"
                onChange={(v) => setAnio(Number(v.target.value))}
                error={anio == null ? true : false}
                InputProps={{
                  readOnly: tipo == 1 ? false : true,

                }}
              />
            }
          </Grid>
          <Grid item xs={7} sm={8} md={8} lg={8}>

            <TextField
              margin="dense"
              required
              id="pob"
              label="Total"
              value={poblacion}
              type="number"
              fullWidth
              variant="standard"
              onChange={(v) => setPoblacion(Number(v.target.value))}
              error={poblacion == null ? true : false}
            />
          </Grid>

          <Grid item xs={7} sm={8} md={8} lg={8}>

            <TextField

              margin="dense"
              required
              id="fac"

              label="Carencia Promedio"
              value={carenciaProm}
              type="percent"
              fullWidth
              variant="standard"
              onChange={(v) => setCarenciaProm(Number(v.target.value))}
              error={carenciaProm == null ? true : false}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">%</InputAdornment>
                ),
              }}
            />

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
              <Button className={tipo == 1 ? "guardar" : "actualizar"} onClick={() => handleSend()}>{tipo == 1 ? "Guardar" : "Actualizar"}</Button>
            </Grid>
          </Grid>
        </Grid>

      </ModalForm>
    </div>





  );
};

export default MunPobrezaExtremaModal;
