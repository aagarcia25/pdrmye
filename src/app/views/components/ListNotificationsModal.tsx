
import { useEffect, useState } from "react";
import {
  Dialog,
  Box,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";
import { AlertS } from "../../helpers/AlertS";
import SendIcon from '@mui/icons-material/Send';
import { Imunicipio } from "../../interfaces/municipios/FilterMunicipios";
import SelectFrag from "./Fragmentos/SelectFrag";
import SelectValues from "../../interfaces/Select/SelectValues";
import { getUser } from "../../services/localStorage";
import "../../styles/globals.css";
import { RESPONSE } from "../../interfaces/user/UserInfo";
import { MailServices } from "../../services/MailServices";
import { COLOR } from "../../styles/colors";

const ListNotificationsModal = ({
  open,
  modo,
  handleClose,
  tipo,
  dt,
  destinatario,
  remitente
}: {
  open: boolean;
  modo: string;
  tipo: number;
  handleClose: Function,
  dt: any,
  destinatario: string,
  remitente: string
}) => {

  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  ////////////////////////////
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [encabezado, setEncabezado] = useState<string>();
  const [mensaje, setMensaje] = useState<string>();
  const [newEncabezado, setNewEncabezado] = useState<string>();
  const [newMensaje, setNewMensaje] = useState<string>()
  const [id, setId] = useState<string>();
  const [values, setValues] = useState<Imunicipio[]>();
  const [usuarioSelect, setUsuarioSelect] = useState<SelectValues[]>([]);
  const [chuserDestin, setChuserDestin] = useState<string>("");

  const [name, setName] = useState<string>();




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
          title: "Mensaje Leido!",
        });

      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
    handleClose("8");


  }
  const handletest = () => {
    //console.log(newEncabezado + "---" + newMensaje + "---" + chuserDestin)





  }


  const handleUpload = () => {

    if (newEncabezado === null || newMensaje === null || chuserDestin === null) {
      AlertS.fire({
        title: "Verificar!",
        text: "Verificar los campos!",
        icon: "warning",
      });
    }
    else {
      let data = {
        NUMOPERACION: 1,
        CHUSER: user.id,
        DELETED: 0,
        VISTO: 0,
        ENCABEZADO: newEncabezado,
        DESCRIPCION: newMensaje,
        DESTINATARIO: chuserDestin,
      };
      CatalogosServices.Notificaciones(data).then((res) => {
        if (res.SUCCESS) {

          let jsonobj = {
            "texto":newMensaje
          }

          let obj ={
          referencia:1,
          data:jsonobj,
          to:"aagarcia@cecapmex.com",
          subject:newEncabezado
          };

          MailServices.sendMail(obj).then(() =>{

          });


          Toast.fire({
            icon: "success",
            title: "Mensaje Enviado!",
          });

        } else {
          AlertS.fire({
            title: "Error!",
            text: "Revisar Valores",
            icon: "error",
          });
        }
      });
      handleClose("9");

    }
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
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const handleSelectUser = (e: any) => {
    setChuserDestin(e);
    //console.log(e);

  };

  useEffect(() => {
    //console.log("data " + dt?.row);
    loadSelectUser();
    if (dt === '') {

    } else {
      setId(dt?.row?.id);
      setMensaje(dt?.row?.Descripcion);
      setEncabezado(dt?.row?.Encabezado);
      setName(dt?.row?.Nombre)


    }
  }, [dt]);

  ////previsualizar imagen




  return (
    <Dialog
    fullWidth
    fullScreen
    open={open}
    sx={{ margin:"0%",padding:"0%"}}
    >
      
      <Box maxWidth="100%" 
       sx={{
        // justifyContent: 'space-between',
        position: 'relative',
        flexDirection: 'column',
        margin:"4.5%",
        // borderRadius: 2
      }}>

        {(modo === "NewMessage") ?
          <Box boxShadow={2} maxWidth="95%">
            <Box sx={{
              height: "60%",
              justifyContent: 'space-between',
              position: 'relative',
              flexDirection: 'column',
              // borderRadius: 1,
            }}>
              <Box sx={{
                bgcolor: COLOR.grisDivisionEntreElementos,
                display: 'flex',
                justifyContent: 'space-between',
                position: 'relative',
                
              }}>
                <Box sx={{
                  position: 'relative',
                  flexDirection: 'column',
                  top: 1, left: 20,
                  borderRadius: 0,
                }}>
                  <Typography variant="h5" color="white" paddingTop={1} paddingBottom={1}> Nuevo Mensaje </Typography>
                </Box>
                <Box padding={1}>
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
                  borderRadius: 1,
                  marginLeft: "2%",
                }}>
                <Typography variant="h6" paddingBottom={.5}> Para.. </Typography>
                <SelectFrag
                  value={chuserDestin}
                  options={usuarioSelect}
                  onInputChange={handleSelectUser}
                  placeholder={"Seleccionar Usuario"}
                  label={""}
                  disabled={false}
                />
              </Box>
              <Box sx={{
                height: "90%",
                width: "95%",
                justifyContent: 'space-between',
                position: 'relative',
                left: 5,
                display: 'flex',
                flexDirection: 'column',
                marginLeft: "2%",
              }}>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    paddingBottom:"1%"
                  }}>
                  <Typography variant="h6" paddingBottom={.2}> Asunto.. </Typography>
                  <textarea
                    required
                    spellCheck='true'
                    rows={2}
                    onChange={(v) => setNewEncabezado(v.target.value)}
                    style={{ width: "100%", borderRadius: 10, fontFamily:"sans-serif"}} />
                </Box>
              
                <Box
                  sx={{
                    paddingTop:"1%",
                    borderRadius: 2,
                    height: "95%",
                    width: "100%",
                  }}>
                    <Typography variant="h6" paddingBottom={.2}> Mensaje.. </Typography>
                 
                  <textarea
                    required
                    spellCheck='true'
                    rows={8}
                    onChange={(v) => setNewMensaje(v.target.value)}
                    style={{ width: "100%", borderRadius: 10, }} />
                </Box>
              </Box>

              {////// boton de enviar mensaje nuevo
              }
              <Box sx={{ position: 'relative', right: 5, top: -3, display: 'flex', flexDirection: 'row-reverse', }} >

                <Box sx={{ width: "12%", padding:"1%"}} >
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

                <label>De: {" " + remitente}</label>
                <br />
                <label>Para: {" " + destinatario}</label>

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
                <label>De: {" " + remitente}</label>
                <br />
                <label>Para: {" " + destinatario}</label>

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
                rows={15}
                style={{ width: "100%", borderRadius: 15 }} />

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

                <label>De: {" " + remitente}</label>
                <br />
                <label>Para: {" " + destinatario}</label>

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

