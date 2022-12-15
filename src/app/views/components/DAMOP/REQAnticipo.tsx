import { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Input,
  FormControlLabel,
  Checkbox,
  Box
  
} from "@mui/material";
import ModalForm from "../componentes/ModalForm";
import { CatalogosServices } from "../../../services/catalogosServices";
import { AlertS } from "../../../helpers/AlertS";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import { getUser } from "../../../services/localStorage";
import { Toast } from "../../../helpers/Toast";
import SelectFrag from "../Fragmentos/SelectFrag";
import SelectValues from "../../../interfaces/Select/SelectValues";
import { InputAdornment } from "@mui/material";
export const REQAnticipo = ({
  handleClose,
  tipo,
  dt,
}: {
  handleClose: Function;
  tipo: number;
  dt: any;
}) => {
  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const user: RESPONSE = JSON.parse(String(getUser()));


  const [proveedores, setProveedores]= useState<SelectValues[]>([]);
  const [clasificiones, setClasificaciones]= useState<SelectValues[]>([]);
  const [tiposAnticipos, setTiposAnticipos]= useState<SelectValues[]>([]);

  const[idTipoAnticipo, setIdTipoAnticipo] = useState("");
  const[idProveedor, setIdProveedor] = useState("");
  const[monto, setMonto] = useState<number>();
  const[observaciones, setObservaciones]= useState("");
  const[ppt, setppt]= useState<boolean>(false);
  const[ddt, setddt]= useState<boolean>(false);
  const[clasificacion, setClasificacion]= useState("");

  const handleSelect01 = (v: SelectValues) => {
    if(String(v) === "1"){
      loadFilter(20);
    }else{
      loadFilter(21);
    }
    setIdTipoAnticipo(String(v));
  };

  const handleSelect02 = (v: SelectValues) => {
    setIdProveedor(String(v));
  };

  const handleSelect03 = (v: SelectValues) => {
    setClasificacion(String(v));
  };

  const handleChangeppt = (event: React.ChangeEvent<HTMLInputElement>) => {
    setppt(event.target.checked);
  };


  const handleChangeddt = (event: React.ChangeEvent<HTMLInputElement>) => {
    setddt(event.target.checked);
  };


  const handleSend = () => {
    if (!nombre || !descripcion) {
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
        NOMBRE: nombre,
        DESCRIPCION: descripcion,
      };

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
    CatalogosServices.Bancos(data).then((res) => {
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
    CatalogosServices.Bancos(data).then((res) => {
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

  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion === 2) {
        // setMeses(res.RESPONSE);
      } else if (operacion === 19) {
        setTiposAnticipos(res.RESPONSE);
      } else if (operacion === 20) {
        setProveedores(res.RESPONSE);
      } else if (operacion === 21) {
        setProveedores(res.RESPONSE);
      }else if (operacion === 22){
        setClasificaciones(res.RESPONSE)
      }
    });
  };


  useEffect(() => {

    loadFilter(19);
    loadFilter(22);

    if (dt === "") {
      //console.log(dt);
    } else {
      setId(dt?.row?.id);
      setNombre(dt?.row?.Nombre);
      setDescripcion(dt?.row?.Descripcion);
    }
  }, [dt]);

  return (
    <>
      <ModalForm
        title={"Generación de Requerimiento de Anticipo"}
        handleClose={handleClose}
      >
        <Box
        boxShadow={3}
        component={Grid}
        container
        direction="row"
        padding={4}
        >

        <Box
          component={Grid}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          paddingBottom={3}
        >
          <Box component={Grid} container spacing={2}>
            <Box  component={Grid} item xs={3}> </Box>
            <Box  component={Grid} item xs={3}> </Box>

            <Box component={Grid} item xs={3}>
            
             <FormControlLabel
                    value={ppt}
                    control={
                      <Checkbox
                        checked={ppt}
                        onChange={handleChangeppt} />
                    }
                    label="Para Pago a terceros "
                  />
            </Box>

            <Box component={Grid} item xs={3}>
            <FormControlLabel
                    value={ddt}
                    control={
                      <Checkbox
                        checked={ddt}
                        onChange={handleChangeddt} />
                    }
                    label="De Deposito a terceros"
                  />
           
            </Box>
          </Box>
        </Box>

        <Box
          component={Grid}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          paddingBottom={3}
        >
          <Box  component={Grid} container spacing={1}>

            <Box component={Grid} item xs={3}>
              Tipo:
            </Box>

            <Box  component={Grid} item xs={3}>
            <SelectFrag
                value={idTipoAnticipo}
                options={tiposAnticipos}
                onInputChange={handleSelect01}
                placeholder={"Seleccione el Tipo de Anticipo"}
                label={""}
                disabled={false}
              ></SelectFrag>
            </Box>

            <Box  component={Grid} item xs={3}>
              Clave:
            </Box>

            <Box component={Grid}  item xs={3}>
            <SelectFrag
                value={idProveedor}
                options={proveedores}
                onInputChange={handleSelect02}
                placeholder={"Seleccione el Municipio"}
                label={""}
                disabled={false}
              ></SelectFrag>
            </Box>

          </Box>

        </Box>

        <Box
          component={Grid} 
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          paddingBottom={3}
        >
          <Box component={Grid}  container spacing={1}>
            <Box  component={Grid} item xs={3}>
              Concepto:
            </Box>
            <Box  component={Grid} item xs={3}>
             
            <SelectFrag
                value={idProveedor}
                options={proveedores}
                onInputChange={handleSelect02}
                placeholder={"Seleccione el Concepto"}
                label={""}
                disabled={false}
              ></SelectFrag>

            </Box>
            <Box   component={Grid} item xs={3}>
            </Box>
            <Box component={Grid}  item xs={3}>
            </Box>
          </Box>

        </Box>

        <Box
          component={Grid}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          paddingBottom={3}
        >
          <Box component={Grid} container spacing={1}>

            <Box component={Grid} item xs={3}>
              Importe:
            </Box>
            <Box component={Grid} item xs={3}>
            <Input
                sx={{ fontWeight: "MontserratMedium" }}
                required
                placeholder="1500000*"
                id="monto"
                onChange={(v) => {
                    setMonto(Number(v.target.value))
                    
                }}
                error={monto? true : false}
                type="number"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              ></Input>
            </Box>
            <Box component={Grid} item xs={3}>
            </Box>
            <Box component={Grid} item xs={3}>
            </Box>

          </Box>
        </Box>

        <Box
          component={Grid}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          paddingBottom={3}
        >
          <Box component={Grid} container spacing={1}>

            <Box component={Grid} item xs={3}>
              Clasificación:
            </Box>

            <Box component={Grid} item xs={3}>
            <SelectFrag
                value={clasificacion}
                options={clasificiones}
                onInputChange={handleSelect03}
                placeholder={"Seleccione la Clasificación"}
                label={""}
                disabled={false}
              ></SelectFrag>
            </Box>

            <Box component={Grid}  item xs={3}>
            </Box>

            <Box component={Grid}  item xs={3}>
            </Box>

          </Box>

        </Box>

        <Box
          component={Grid} 
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          paddingBottom={7}
        >
        <Box component={Grid} container spacing={1}>
            <Box component={Grid} item xs={3}>
              Observaciones:
            </Box>
            <Box component={Grid} item xs={9}>
            <TextField fullWidth label="" id="fullWidth"  value={observaciones} 
             onChange={(v) => {
              setObservaciones(v.target.value)
          }}
            />
            </Box>
            
        </Box>
        </Box>

        <Box
          component={Grid} 
          container
          direction="row"
          justifyContent="right"
          alignItems="center" 
        >
         
          <Box  component={Grid} item alignItems="center" justifyContent="center" xs={2}>
            <button
              className={tipo === 1 ? "guardar" : "actualizar"}
              onClick={() => handleSend()}
            >
              {tipo === 1 ? "Agregar" : "Editar"}
            </button>
          </Box>
        </Box>
      
        </Box>
      </ModalForm>
    </>
  );
};
