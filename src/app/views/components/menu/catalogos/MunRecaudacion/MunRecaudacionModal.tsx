import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  TextField,
  InputAdornment,
  Button,
  Grid,
} from "@mui/material";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import {  getUser } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { municipiosc } from "../../../../../share/loadMunicipios";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import ModalForm from "../../../componentes/ModalForm";


const MunRecaudacionModal = ({
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
  const [recaudacion, setRecaudacion] = useState<number>();
  const [IdMunicipio, setIdMunicipio] = useState<string>();
  const [municipios, setMunicipios] = useState<SelectValues[]>([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [municipio, setMunicipio] = useState("");





  const handleSend = () => {
    if (recaudacion === null || anio ===null || IdMunicipio === null) {
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
        RECAUDACION: recaudacion,



      };

      handleRequest(data);
      handleClose("save");
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

  const handleFilterChange = (event: SelectValues) => {
    setIdMunicipio(event.value);

  };


  const agregar = (data: any) => {
    CatalogosServices.munrecaudacion(data).then((res) => {
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
    CatalogosServices.munrecaudacion(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Solicitud De Edición Enviada!",
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
    setMunicipios(municipiosc());

    if (dt === '') {
      //console.log(dt)

    } else {
      setId(dt?.row?.id)
      setAnio(dt?.row?.Anio)
      setRecaudacion(dt?.row?.Recaudacion)
      setIdMunicipio(dt?.row?.idmunicipio)
      setMunicipio(dt?.row?.Nombre)



      //console.log(dt)



    }

  }, [dt]);



  return (

    <div>
    <ModalForm title={tipo === 1 ?"Agregar Registro" : "Editar Registro"} handleClose={handleClose}>
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
        <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box>
          <FormControl variant="standard" fullWidth>
          <Box>
          <label className="Titulo">{dt?.row?.Nombre}</label>
          </Box>
          </FormControl>
          <Box>
            <label ><br /> Año: <br />{anio}</label>
          </Box>

          <Box>
            <label > <br /> Recaudacion: <br /></label>
          </Box>

          <TextField
            margin="dense"
            required
            id="pob"
            value={recaudacion}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setRecaudacion(Number(v.target.value))}
            error={recaudacion === null ? true : false}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />


        </Box>
        </Grid>



        <Grid container sx={{ mt: "2vh", width: "100%",height: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row", }} >
          <Grid item xs={4} sm={3} md={2} lg={1} >
            <Button className={tipo===1?"guardar":"actualizar"} onClick={() => handleSend()}>{tipo===1?"Guardar":"Actualizar"}</Button>
          </Grid>
        </Grid>
      </Grid>

    </ModalForm>
  </div>


  );
};

export default MunRecaudacionModal;
