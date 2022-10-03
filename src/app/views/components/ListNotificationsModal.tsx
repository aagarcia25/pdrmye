
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  TextField,
  Container,
  IconButton,
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
import UploadFileIcon from '@mui/icons-material/UploadFile';
import imagenGenerica from '../../../../../../app/assets/img/archivoImagen.jpg'
import PdfLogo from '../../../../../../app/assets/img/PDF_file_icon.svg'
import PptxLogo from '../../../../../../app/assets/img/pptx_Logo.png'
import xlsxLogo from '../../../../../../app/assets/img/xlsx_Logo.png'
import docxLogo from '../../../../../../app/assets/img/docx_Logo.png'
import CloseIcon from '@mui/icons-material/Close';
import { ListNotification } from "./ListNotification";
import { Imunicipio } from "../../interfaces/municipios/FilterMunicipios";
import { getMunicipios, setMunicipios, validaLocalStorage } from "../../services/localStorage";
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";
import { Alert } from "../../helpers/Alert";
import { Label } from "@mui/icons-material";
import { borderColor } from "@mui/system";
import SendIcon from '@mui/icons-material/Send';



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




  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  ////////////////////////////
  const [mensaje, setMensaje] = useState("");
  const [id, setId] = useState("");

  const testeoVariables = () => {
    //console.log("inicio de evento   " + inicioEvento);
    //console.log("fin de evento   " + finEvento);
    //console.log("noombre de evento    " + nameAviso);
    ///console.log("fecha de hoy   " + Fecha_min);
    console.log("datos de dt  " + dt?.row + " ---- " + mensaje);

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


              <FormControl sx={{ m: 1, width: "50%" }}>
                <InputLabel id="demo-multiple-checkbox-label">Para</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
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
                sx={{ m: 1, width: "98%", height: "150px" }} />
            </Box>


          </Box>
          <Box sx={{  display: 'flex',
          flexDirection: 'row-reverse',}}   >
              <Box sx={{  width: "75px",
            
}} >
            <Button    
            className="enviar-mensaje" color="success" variant="contained" endIcon={<SendIcon />}
              onClick={() => handleClose()}>
              Enviar</Button>
          
              </Box>
          </Box>

        </Box>
      </Box>
    </Dialog>



  );
};

export default ListNotificationsModal;