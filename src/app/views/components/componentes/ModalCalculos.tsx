import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import SelectValues from "../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../services/catalogosServices";
import SelectFrag from "../Fragmentos/SelectFrag";
import Slider from "../Slider";
import ModalForm from "./ModalForm";

const ModalCalculos = ({
  tipo,
  perfil,
  area,
  handleClose,
  handleAccion,
  visibleselect
}: {
  tipo: string;
  perfil: string;
  area: string;
  handleClose: Function;
  handleAccion: Function;
  visibleselect:Number
}) => {
  
  const [mensaje, setMensaje] = useState<string>();
  const [openSlider, setOpenSlider] = useState(true);
  const [usuarioSelect, setUsuarioSelect] = useState<SelectValues[]>([]);
  const [chuserDestin, setChuserDestin] = useState<string>("");

  const loadSelectUser = () => {
    let data = {
      NUMOPERACION: 18,
      AREA:area ,
      PERFIL:perfil
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



  useEffect(() => {
    loadSelectUser();
  }, []);


  return (
    <div>
      <ModalForm title={tipo} handleClose={handleClose}>
      <Slider open={openSlider}></Slider>


      {visibleselect === 1 ? (
        <>
            <Grid item xs={12}>
            <h3> Asignar a :</h3>
          </Grid>
          <Grid item xs={12}>
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
            
          ) : (
            ""
          )}


     
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
          <Grid item xs={12}>
            <textarea
              required
              spellCheck="true"
              rows={5}
              onChange={(v) => setMensaje(v.target.value)}
              style={{ width: "100%" }}
            />
          </Grid>

        

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
                <Button
                  className="actualizar"
                  onClick={() => handleAccion({mensaje:mensaje,usuario:chuserDestin})}
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
