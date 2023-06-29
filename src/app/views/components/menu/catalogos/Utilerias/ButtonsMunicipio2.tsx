import {
    Box,
    ToggleButtonGroup,
    Tooltip,
    ToggleButton,
    Grid,
    FormControl,
    IconButton,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import Select from "react-select";
  import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
  import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
  import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
  import { PERMISO } from "../../../../../interfaces/user/UserInfo";
  import { getPermisos, getToken } from "../../../../../services/localStorage";
  import SelectValues from "../../../../../interfaces/Select/SelectValues";
  import { dowloandfile } from "../../../../../helpers/Files";
  import AddIcon from "@mui/icons-material/Add";
  
  const ButtonsMunicipio2 = ({
    controlInterno,
    url,
    handleUpload,
    handleOpen
  }: {
    controlInterno: string;
    url: string;
    handleUpload: Function;
    handleOpen: Function;
  
  }) => {
    const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
    const [cargarPlantilla, setCargarPlantilla] = useState<boolean>(false);
    const [descargarPlantilla, setDescargarPlantilla] = useState<boolean>(false);
    const [elimasiva, setelimasiva] = useState<boolean>(false);
    const [agregar, setAgregar] = useState<boolean>(false);
  
  
    const downloadplantilla = () => {
      let name = url;
      let data = {
        TOKEN: JSON.parse(String(getToken())),
        RUTA: '/DAMOP/PLANTILLAS/',
        NOMBRE: name,
      };
      dowloandfile(data);
  
    };
  
  
    useEffect(() => {
      permisos.map((item: PERMISO) => {
        if (String(item.ControlInterno) === controlInterno) {
          if (String(item.Referencia)  === "AGREG" ) {
            setAgregar(true);
          }
          if (String(item.Referencia) === "CARGPLAN") {
            setCargarPlantilla(true);
          }
          if (String(item.Referencia) === "DESPLAN") {
            setDescargarPlantilla(true);
          }
          if (String(item.Referencia) === "ELIMMAS") {
            setelimasiva(true);
          }
        }
      });
    }, []);
  
    return (
      <Box sx={{ alignItems: "center" }}>
        <Grid item
          xs={12} md={12}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          paddingTop={1}
          paddingBottom={1}
        >
          <Grid item  xs={12} sm={6} md={6} lg={3} >
            <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
              {agregar ? (
                  <Tooltip title="Agregar" >
                    <ToggleButton className="enviar-mensaje"  color="standard" value="check" onClick={() => handleOpen()}>
                      <AddIcon />
                    </ToggleButton>
                  </Tooltip>
              ) : (
                ""
              )}
              {descargarPlantilla ? (
                <Tooltip title={"Descargar Plantilla"}>
                  <ToggleButton className="enviar-mensaje"  color="standard" value="check" onClick={() => downloadplantilla()}>
                    <ArrowDownwardIcon />
                  </ToggleButton>
                </Tooltip>
              ) : (
                ""
              )}
              {cargarPlantilla ? (
                <Tooltip title="Cargar Plantilla">
                  <ToggleButton className="enviar-mensaje"  value="check">
                    <IconButton
                      aria-label="upload documento"
                      component="label"
                      size="small"
                      color="inherit" 
                    >
                      <input
                        hidden
                        accept=".xlsx, .XLSX, .xls, .XLS"
                        type="file"
                        value=""
                        onChange={(v) => handleUpload({ tipo: 1, data: v })}
                      />
                      <DriveFolderUploadIcon />
                    </IconButton>
                  </ToggleButton>
                </Tooltip>
              ) : (
                ""
              )}
  
  
  
              {elimasiva ? (
                <Tooltip title="Eliminación Masiva, Borra los Registros Seleccionados *No Requiere Autorización*">
                  <ToggleButton className="enviar-mensaje"  value="check">
                    <DeleteForeverIcon
                      onClick={() => handleUpload({ tipo: 2, data: {} })}
                    />
                  </ToggleButton>
                </Tooltip>
              ) : (
                ""
              )}
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default ButtonsMunicipio2;
  