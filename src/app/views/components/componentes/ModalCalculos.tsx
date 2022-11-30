import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import ModalForm from "./ModalForm";
import Slider from "../Slider";
import { CatalogosServices } from "../../../services/catalogosServices";
import SelectValues from "../../../interfaces/Select/SelectValues";
import SelectFrag from "../Fragmentos/SelectFrag";

const ModalCalculos = ({
  tipo,
  handleClose,
  handleAccion,
}: {
  tipo: string;
  handleClose: Function;
  handleAccion: Function;
}) => {
  
  const [mensaje, setMensaje] = useState<string>();
  const [openSlider, setOpenSlider] = useState(false);
  const [usuarioSelect, setUsuarioSelect] = useState<SelectValues[]>([]);
  const [chuserDestin, setChuserDestin] = useState<string>("");

  const loadSelectUser = () => {
    let data = {
      NUMOPERACION: 18
    };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (res.SUCCESS) {
        setUsuarioSelect(res.RESPONSE);
      } 
    });
  };


  
  const handleSelectUser = (e: any) => {
    setChuserDestin(e);
    //console.log(e);

  };



  useEffect(() => {
    loadSelectUser();
  }, []);


  return (
    <div>
      <ModalForm title={tipo} handleClose={handleClose}>
      <Slider open={openSlider}></Slider>

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
