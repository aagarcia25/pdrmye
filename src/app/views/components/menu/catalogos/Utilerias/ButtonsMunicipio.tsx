import { Box, ToggleButtonGroup, Tooltip, Link, IconButton, ToggleButton } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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
  const [elimasiva, setelimasiva] = useState<boolean>(false);


  useEffect(() => {


    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === controlInterno) {
        if (String(item.Referencia) === "AGREG") {
          setCargarPlantilla(true);
        }
        if (String(item.Referencia) === "AGREG") {
          setCargarPlantilla(true);
        }
        if (String(item.Referencia) === "AGREG") {
          setDescargarPlantilla(true);
        }
        if (String(item.Referencia) === "ELIM") {
          setelimasiva(true);
        }

      }
    });
  }, []);

  return (
    <Box sx={{ alignItems: "center", }}>

      <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
        {descargarPlantilla ?
          <Tooltip title="Descargar Plantilla">
            <ToggleButton value="check"  >
              <ArrowDownwardIcon onClick={() => window.open(url)} />
            </ToggleButton>
          </Tooltip>
          : ""}
        {cargarPlantilla ?
          <Tooltip title="Cargar Plantilla">
            <ToggleButton value="check">
              <input hidden accept=".xlsx, .XLSX, .xls, .XLS" type="file" value="" onChange={(v) => handleUpload({ tipo: 1, data: v })} />
              <DriveFolderUploadIcon />
            </ToggleButton>
          </Tooltip>
          : ""}

        {elimasiva ?
          <Tooltip title="Eliminación Masiva">
            <ToggleButton value="check">
              <DeleteForeverIcon onClick={() => handleUpload({ tipo: 2, data: {} })} />
            </ToggleButton >
          </Tooltip>
          : ""}


      </ToggleButtonGroup>
    </Box>
  );
};

export default ButtonsMunicipio;
