
import React, { useEffect, useState } from "react";
import {
  Dialog,
  Box,
  FormLabel,
  InputLabel,
  Input,
  Select,
  OutlinedInput,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  Button,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";
import { Alert } from "../../helpers/Alert";
import SendIcon from '@mui/icons-material/Send';
import { Imunicipio } from "../../interfaces/municipios/FilterMunicipios";



const ListNotificationsModal = ({
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

  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  ////////////////////////////
  const [encabezado, setEncabezado] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [id, setId] = useState("");
  const [values, setValues] = useState<Imunicipio[]>();

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  const [personName, setPersonName] = React.useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  const testeoVariables = () => {
    //console.log("inicio de evento   " + inicioEvento);
    //console.log("fin de evento   " + finEvento);
    //console.log("noombre de evento    " + nameAviso);
    ///console.log("fecha de hoy   " + Fecha_min);
    console.log("datos de dt  " + String(dt?.row?.Descripcion) + " ---- " +dt?.row?.Encabezado);
console.log("id  "+ id);
    

  }
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
    CatalogosServices.avisos(data).then((res) => {
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
    CatalogosServices.avisos(data).then((res) => {
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

    if (dt === '') {

    } else {
      setId(dt?.row?.id);
      setMensaje(dt?.row?.Descripcion);
      setEncabezado(dt?.row?.Encabezado);


    }
  }, [dt]);

  ////previsualizar imagen




  return (
    <Dialog
      fullWidth
      open={open}

    >

      <Box sx={{
        height: "100%",
        justifyContent: 'space-between',
        position: 'relative',
        flexDirection: 'column',
        borderRadius: 1
      }}>

        {(modo==="NewMessage")?
        <Box>
        <Box sx={{
          height: "100%",
          justifyContent: 'space-between',
          position: 'relative',
          flexDirection: 'column',

          display: 'flex',
          borderRadius: 1
        }}>
          <Box sx={{

            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',

            borderRadius: 1,

          }}>
            <Box sx={{
              position: 'relative',
              flexDirection: 'column',
              top: 1, left: 20,
              borderRadius: 1
            }}>
              <FormLabel
                focused
              > <h3> Nuevo Mensaje</h3>
              </FormLabel>
            </Box>
            <Box>
              <button className="cerrar-nuevo-mensaje" color="error"
                onClick={() => handleClose()}>
                <CloseIcon />
              </button>
            </Box>
          </Box>
          <Box
            sx={{
              height: "120px",
              justifyContent: 'space-between',
              position: 'relative',
              flexDirection: 'column',
              top: 10, left: 7, width: "95%",
              display: 'flex',
              borderRadius: 1
            }}>


            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel >Para</InputLabel>
              <Select
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Para" />}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}

                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>


          </Box>

          <Box sx={{
            width: "98%",
            position: 'relative',
                        
            left: 5,
            flexDirection: 'column',
            borderRadius: 1,
            bgcolor: "rgb(245,245,245)",
            borderColor: "rgb(255,240,225)",
          }}>
            <Input
              multiline
              placeholder="Mensaje"
              sx={{ m: 1, width: "95%", height: "150px" }} />
          </Box>


        </Box>
                    {////// boton de enviar mensaje nuevo
}
        <Box sx={{  display: 'flex',
        flexDirection: 'row-reverse',}}   >


           <Box sx={{  width: "18%",
          
}} >
          <Button    
          className="enviar-mensaje" color="success" variant="contained" endIcon={<SendIcon />}
            onClick={() => handleClose()}>
            Enviar</Button>
        
            </Box>
        </Box>

      </Box> 
      :""
        }

         {(modo==="ViewMessage")?
         <Box sx={{
          height: "100%",
          justifyContent: 'space-between',
          position: 'relative',
          flexDirection: 'column',

          display: 'flex',
          borderRadius: 1
        }}>
          <Box sx={{

            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',

            borderRadius: 1,

          }}>
            <Box sx={{
              position: 'relative',
              flexDirection: 'column',
              top: 1, left: 20,
              borderRadius: 1
            }}>
              <FormLabel
                focused
              > <h2> {encabezado} </h2>
              </FormLabel>
            </Box>
            <Box>
              <button className="cerrar-mensaje" color="error"
                onClick={() => handleClose()}>
                <CloseIcon />
              </button>
            
          
            </Box>
          </Box>       

          <Box sx={{
            width: "98%",
            position: 'relative',
                        
            left: 5,
            flexDirection: 'column',
            borderRadius: 1,
            bgcolor: "rgb(245,245,245)",
            borderColor: "rgb(255,240,225)",
          }}>
            <FormLabel
              focused
              sx={{ m: 1, width: "95%", height: "150px" }}>
                {mensaje}
                </FormLabel>
          </Box>


        </Box>
         :
         ""
      }


        
      </Box>
    </Dialog>



  );
};

export default ListNotificationsModal;

