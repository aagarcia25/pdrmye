
import React, { useEffect, useState } from "react";
import {
  Dialog,
  Box,
  Button,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";
import { Alert } from "../../helpers/Alert";
import SendIcon from '@mui/icons-material/Send';
import { Imunicipio } from "../../interfaces/municipios/FilterMunicipios";
import SelectFrag from "./Fragmentos/Select/SelectFrag";
import SelectValues from "../../interfaces/Select/SelectValues";
import {getUser } from "../../services/localStorage";
import "../../styles/globals.css";
import { RESPONSE } from "../../interfaces/user/UserInfo";

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
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [encabezado, setEncabezado] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [newEncabezado, setNewEncabezado] = useState("");
  const [newNensaje, setNewMensaje] = useState("");
  const [id, setId] = useState("");
  const [values, setValues] = useState<Imunicipio[]>();
  const [usuarioSelect, setUsuarioSelect] = useState<SelectValues[]>([]);
  const [chuserDestin, setChuserDestin] = useState("");

  const [personName, setPersonName] = React.useState<string[]>([]);




  const handleViewChange = () => {

    let data = {
      NUMOPERACION: tipo,
      CHUSER: user.id,
      CHID: id,

    };
    CatalogosServices.Notificaciones(data).then((res) => {
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
    handleClose("8");


  }

  const handleUpload = () => {
    let data = {
      NUMOPERACION: 1,
      CHUSER: user.id,
      DELETED: 0,
      VISTO: 0,
      ENCABEZADO: newEncabezado,
      DESCRIPCION: newNensaje,
      DESTINATARIO: chuserDestin,
    };
    CatalogosServices.Notificaciones(data).then((res) => {
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
    handleClose("9");


  }

  const loadSelectUser = () => {
    let data = {
      NUMOPERACION: 1,
      CHUSER: user.id
    };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (res.SUCCESS) {
        setUsuarioSelect(res.RESPONSE);
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const handleSelectUser = (e: any) => {
    setChuserDestin(e.value);

  };

  useEffect(() => {
    console.log("modo en list notificaciones modal  " + modo);
    loadSelectUser();
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

        {(modo === "NewMessage") ?
          <Box>
            <Box sx={{
              height: "100%",
              justifyContent: 'space-between',
              position: 'relative',
              flexDirection: 'column',
              borderRadius: 1
            }}>
              <Box sx={{
                bgcolor: "rgb(246,246,246)",
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
                  <label> <h3> Nuevo Mensaje</h3> </label>
                </Box>
                <Box>
                  <button className="cerrar-nuevo-mensaje" color="error"
                    onClick={() => handleClose("cerrar")}>
                    <CloseIcon />
                  </button>
                </Box>
              </Box>


              <Box
                sx={{

                  height: "100px",
                  position: 'relative',
                  flexDirection: 'column',
                  top: 10, left: 7, width: "95%",
                  display: 'flex',
                  borderRadius: 1
                }}>

                <label> Para..</label>

                <SelectFrag options={usuarioSelect} onInputChange={handleSelectUser} placeholder={"Seleccione Usuario"}></SelectFrag>
              </Box>



              <Box sx={{
                height: "90%",
                width: "98%",
                justifyContent: 'space-between',
                position: 'relative',
                left: 5,
                display: 'flex',
                flexDirection: 'column',
              }}>
                <Box
                  sx={{
                    width: "100%",
                    height: "60%",
                  }}>
                  <label > Asunto.. </label>
                  <textarea
                    required
                    spellCheck='true'
                    rows={2}
                    onChange={(v) => setNewEncabezado(v.target.value)}
                    style={{ width: "100%", borderRadius: 12, }} />
                </Box>
                <Box
                  sx={{
                    width: "90%",
                    height: "10px",
                  }}>

                </Box>
                <Box
                  sx={{
                    borderRadius: 2,
                    height: "98%",
                    width: "100%",
                    bgcolor: "rgb(246,246,246)",
                  }}>
                  <label >
                    Mensaje..
                  </label>
                  <textarea
                    required
                    spellCheck='true'
                    rows={20}
                    onChange={(v) => setNewMensaje(v.target.value)}
                    style={{ width: "100%", borderRadius: 15, }} />
                </Box>
              </Box>



              {////// boton de enviar mensaje nuevo
              }
              <Box sx={{ position: 'relative',right:5,top:-3, display: 'flex', flexDirection: 'row-reverse', }} >

                <Box sx={{ width: "18%",  }} >
                  <Button
                    className="enviar-mensaje" color="success" variant="contained" endIcon={<SendIcon />}
                    onClick={() => handleUpload()}>
                    Enviar</Button>

                </Box>
              </Box>
            </Box>

          </Box>
          : ""
        }

        {(modo === "ViewMessage") ?
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
                width: "100%",
                position: 'relative',
                flexDirection: 'column',
                top: 1, left: 20,
                borderRadius: 1
              }}>
                <label >
                  <h3>Asunto</h3>
                </label>
                <textarea
                  value={encabezado}
                  readOnly
                  rows={2}
                  onChange={(v) => setMensaje(v.target.value)}
                  style={{ width: "100%", borderRadius: 15, }} />

                <label

                > <h2> { } </h2>
                </label>
              </Box>
              <Box>
                <button className="cerrar-mensaje" color="error"
                  onClick={() =>
                    handleViewChange()}>
                  <CloseIcon />
                </button>


              </Box>
            </Box>

            <Box sx={{
              width: "91%",
              position: 'relative',

              left: 20,
              flexDirection: 'column',
              borderRadius: 1,
              bgcolor: "rgb(245,245,245)",
              borderColor: "rgb(255,240,225)",
            }}>
              <label >
                <h3>Mensaje.. </h3>
              </label>
              <textarea
                value={mensaje}
                readOnly
                rows={20}
                onChange={(v) => setMensaje(v.target.value)}
                style={{ width: "100%", borderRadius: 15, }} />

            </Box>


          </Box>
          :
          ""
        }

        {(modo === "viewMessageReading") ?
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
                width: "100%",
                borderRadius: 1
              }}>
                <label >
                  <h3>Asunto</h3>
                </label>
                <textarea

                  value={encabezado}
                  readOnly
                  rows={2}
                  style={{ width: "100%", borderRadius: 15, }} />
              </Box>
              <Box>
                <button className="cerrar-mensaje" color="error"
                  onClick={() => handleClose("7")}>
                  <CloseIcon />
                </button>


              </Box>
            </Box>

            <Box sx={{
              width: "91%",
              position: 'relative',

              left: 20,
              flexDirection: 'column',
              borderRadius: 1,
              bgcolor: "rgb(245,245,245)",
              borderColor: "rgb(255,240,225)",
            }}>
              <label >
                <h3>Mensaje</h3>
              </label>
              <textarea
                value={mensaje}
                readOnly
                rows={20}
                style={{ width: "100%", borderRadius: 15, }} />

            </Box>


          </Box>
          :
          ""
        }


        {(modo === "MessageSend") ?
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
                width: "100%",
                position: 'relative',
                flexDirection: 'column',
                top: 1, left: 20,
                borderRadius: 1
              }}>
                <label >
                  <h3>Asunto</h3>
                </label>
                <textarea
                  value={encabezado}
                  readOnly
                  rows={2}
                  style={{ width: "100%", borderRadius: 15, }} />

              </Box>
              <Box>
                <button className="cerrar-mensaje" color="error"
                  onClick={() => handleClose("9")}>
                  <CloseIcon />
                </button>


              </Box>
            </Box>

            <Box sx={{
              width: "91%",
              position: 'relative',
              left: 20,
              flexDirection: 'column',
              borderRadius: 1,
              bgcolor: "rgb(245,245,245)",
              borderColor: "rgb(255,240,225)",
            }}>
              <label >
                <h3>Mensaje</h3>
              </label>
              <textarea
                value={mensaje}
                readOnly
                rows={20}
                onChange={(v) => setMensaje(v.target.value)}
                style={{ width: "100%", borderRadius: 15, }} />

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

