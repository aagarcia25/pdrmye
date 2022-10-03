
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  TextField,
  Container,
  IconButton,
  FormLabel,
} from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import imagenGenerica from '../../../../../../app/assets/img/archivoImagen.jpg'
import PdfLogo from '../../../../../../app/assets/img/PDF_file_icon.svg'
import PptxLogo from '../../../../../../app/assets/img/pptx_Logo.png'
import xlsxLogo from '../../../../../../app/assets/img/xlsx_Logo.png'
import docxLogo from '../../../../../../app/assets/img/docx_Logo.png'

import { ListNotification } from "./ListNotification";
import { Imunicipio } from "../../interfaces/municipios/FilterMunicipios";
import { getMunicipios, setMunicipios, validaLocalStorage } from "../../services/localStorage";
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";
import { Alert } from "../../helpers/Alert";


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
  const [mensaje, setMensaje] = useState("");
  const [id, setId] = useState("");

  const testeoVariables = () => {
    //console.log("inicio de evento   " + inicioEvento);
    //console.log("fin de evento   " + finEvento);
    //console.log("noombre de evento    " + nameAviso);
    ///console.log("fecha de hoy   " + Fecha_min);
    console.log("datos de dt  " + dt?.row + " ---- "+ mensaje); 

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
      <DialogTitle>Notificaciones</DialogTitle>
      <Box>
        <Box>

          <FormLabel focused>
            {mensaje}            
          </FormLabel>

        </Box>
        <Box sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', display: 'flex', flexDirection: 'row-reverse', }}>

<button className="button cerrar" onClick={() => handleClose()}  >Cerrar</button>

<button className="button cerrar" onClick={() => testeoVariables()}  >test</button>





</Box>

      </Box>
    </Dialog>



  );
};

export default ListNotificationsModal;