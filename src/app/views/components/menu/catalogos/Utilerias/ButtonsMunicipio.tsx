import { Box, ToggleButtonGroup, Tooltip, ToggleButton, Link, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { PERMISO } from "../../../../../interfaces/user/UserInfo";
import { getPermisos } from "../../../../../services/localStorage";

const ButtonsMunicipio = ({
  controlInterno,
  url,
  handleUpload,
}: {
  controlInterno: string;
  url: string;
  handleUpload: Function;
}) => {
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [cargarPlantilla, setCargarPlantilla] = useState<boolean>(false);
  const [descargarPlantilla, setDescargarPlantilla] = useState<boolean>(false);


  useEffect(() => {


    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === controlInterno) {
        console.log(item)
        if (String(item.Referencia) == "IMPREG") {
          setCargarPlantilla(true);
        }
        if (String(item.Referencia) == "IMPORTPLANT") {
          setCargarPlantilla(true);
        }
        if (String(item.Referencia) == "DPLANTILLA") {
          setDescargarPlantilla(true);
        }

      }
    });




  }, []);



  return (

    <Box sx={{ alignItems: "center", }}>

      <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
        {descargarPlantilla ?
          <Tooltip title="Descargar Plantilla">
            <ToggleButton value="check" >
              <Link href={url}>
                <ArrowDownwardIcon />
              </Link>
            </ToggleButton>
          </Tooltip>
          : ""}
        {cargarPlantilla ?
          <Tooltip title="Cargar Plantilla">
              <IconButton aria-label="upload documento" component="label" size="large">
              <input   hidden accept=".xlsx, .XLSX, .xls, .XLS" type="file" value="" onChange={(v) => handleUpload(v)} />
              <DriveFolderUploadIcon />
              </IconButton>
          </Tooltip>
          : ""}

      </ToggleButtonGroup>
    </Box>
  );
};

export default ButtonsMunicipio;
