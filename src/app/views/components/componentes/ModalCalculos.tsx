import { Button, Grid, TextField, Checkbox,  FormControlLabel, } from "@mui/material";
import { useEffect, useState } from "react";
import SelectValues from "../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../services/catalogosServices";
import SelectFrag from "../Fragmentos/SelectFrag";
import Slider from "../Slider";
import ModalForm from "./ModalForm";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from "sweetalert2";

const ModalCalculos = ({
  tipo,
  perfil,
  area,
  handleClose,
  handleAccion,
  visibleselect,
}: {
  tipo: string;
  perfil: string;
  area: string;
  handleClose: Function;
  handleAccion: Function;
  visibleselect: Number;
}) => {
  const [mensaje, setMensaje] = useState<string>("");
  const [cuerpoCorreo, setCuerpoCorreo] = useState<string>("");
  const [openSlider, setOpenSlider] = useState(false);
  const [usuarioSelect, setUsuarioSelect] = useState<SelectValues[]>([]);
  const [chuserDestin, setChuserDestin] = useState<string>("");

  const [showInputs, setShowInputs] = useState(false);

  const loadSelectUser = () => {
    let data = {
      NUMOPERACION: 18,
      AREA: area,
      PERFIL: perfil,
    };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (res.SUCCESS) {
        setUsuarioSelect(res.RESPONSE);
        setOpenSlider(false);
      }
    });
  };

  const handleSelectUser = (e: any) => {
    setChuserDestin(e);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setShowInputs(checked);
    if (checked) {
      // Modo "Correo por defecto": ignora/quita el cuerpo personalizado
      setCuerpoCorreo("");
    } else {
      // Modo "Personalizado": ignora/quita el comentario por defecto
      setMensaje("");
    }
  };

  useEffect(() => {
    loadSelectUser();
  }, []);

  useEffect(() => {
  if (visibleselect === 0) {
    Swal.fire({
      title: "¿Confirmar envío?",
      text: "Se mandará a DAMPO",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, enviar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleAccion({
          mensaje: showInputs ? mensaje : "Mensaje",
          usuario: chuserDestin,
          cuerpoCorreo: cuerpoCorreo ? cuerpoCorreo : 0,
        });

        Swal.fire({
          title: "Enviado",
          text: "La acción fue procesada correctamente.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  }
}, [visibleselect]); // se ejecuta cuando cambia visibleselect


  return (
    <div>
      <ModalForm title={tipo} handleClose={handleClose}>
        <Slider open={openSlider} />
  
        {visibleselect == 1 ? (
          <Grid
            container
            spacing={2}
            sx={{
              mt: "2vh",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <>
              <Grid item xs={12}>
                <h3> Asignar a :</h3>
              </Grid>
              <Grid item xl={6} xs={12} lg={6} md={8} sm={6}>
                <SelectFrag
                  value={chuserDestin}
                  options={usuarioSelect}
                  onInputChange={handleSelectUser}
                  placeholder={"Seleccionar Usuario"}
                  label={""}
                  disabled={false}
                />
              </Grid>
            </>
          </Grid>
        ) : (
          ""
        )}

        {
          visibleselect == 0 ? <></> : <></>
        }


  
        {/* {visibleselect == 0 ? (
          <Grid
            container
            spacing={1}
            sx={{
              mt: "2vh",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showInputs}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Correo por defecto"
              />
            </Grid>
            {!showInputs && (
              <>
                <Grid item xs={12}>
                  <h3> Cuerpo del Correo:</h3>
                </Grid>
                <Grid item xl={6} xs={12} lg={6} md={8} sm={6}>
                  <ReactQuill
                    value={cuerpoCorreo}
                    onChange={setCuerpoCorreo}
                    placeholder="Escribe el cuerpo del correo..."
                    style={{ height: "250px", marginBottom: "50px" }}
                  />
                </Grid>
              </>
            )}
          </Grid>
        ) : (
          <>
            <Grid
              container
              spacing={1}
              sx={{
                mt: "2vh",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Grid item xs={12}>
                <h3> Comentarios:</h3>
              </Grid>
              <Grid item xl={6} xs={12} lg={6} md={8} sm={12}>
                <textarea
                  required
                  spellCheck="true"
                  rows={5}
                  onChange={(v) => setMensaje(v.target.value)}
                  style={{ width: "100%" }}
                />
              </Grid>
            </Grid>
          </>
        )} */}
  
        <Grid
          container
          spacing={1}
          sx={{
            mt: "2vh",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {showInputs && (
            <>
              <Grid item xs={12}>
                <h3> Comentarios:</h3>
              </Grid>
              <Grid item xl={6} xs={12} lg={6} md={8} sm={12}>
                <textarea
                  required
                  spellCheck="true"
                  rows={5}
                  onChange={(v) => setMensaje(v.target.value)}
                  style={{ width: "100%" }}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
              <Button
                className="actualizar"
                disabled={
                  visibleselect == 0 && 
                  (!showInputs ? !cuerpoCorreo?.trim() : !mensaje?.trim())
                }
                onClick={() =>
                  handleAccion({
                    mensaje: showInputs ? mensaje : "Mensaje",
                    usuario: chuserDestin,
                    cuerpoCorreo: cuerpoCorreo ? cuerpoCorreo : 0,
                  })
                }
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </ModalForm>
    </div>
  );
};

export default ModalCalculos;
