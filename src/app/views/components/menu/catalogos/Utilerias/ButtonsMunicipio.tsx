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

const ButtonsMunicipio = ({
  controlInterno,
  url,
  handleUpload,
  value,
  options,
  onInputChange,
  placeholder,
  label,
  disabled,
  handleOpen
}: {
  controlInterno: string;
  url: string;
  handleUpload: Function;
  value: string;
  options: SelectValues[];
  onInputChange: Function;
  placeholder: string;
  label: string;
  disabled: boolean;
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
      RUTA: '/PDRMYE/DAMOP/PLANTILLAS/',
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
        xs={9} md={12}
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >

        <Grid item xs={9} md={2}>
          <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
            {agregar ? (
                <Tooltip title="Agregar" >
                  <ToggleButton value="check" onClick={() => handleOpen()}>
                    <AddIcon />
                  </ToggleButton>
                </Tooltip>
            ) : (
              ""
            )}
            {descargarPlantilla ? (
              <Tooltip title={"Descargar Plantilla"}>
                <ToggleButton value="check" onClick={() => downloadplantilla()}>
                  <ArrowDownwardIcon />
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}
            {cargarPlantilla ? (
              <Tooltip title="Cargar Plantilla">
                <ToggleButton value="check">
                  <IconButton
                    aria-label="upload documento"
                    component="label"
                    size="small"
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
                <ToggleButton value="check">
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
        <Grid item xs={12} md={2}>
          {value === "na" ? (
            ""
          ) : (
            <FormControl sx={{ width: "100%" }}>
              <Select
                value={
                  value != null
                    ? options.find((element) => element.value === value)
                    : []
                }
                options={options}
                isDisabled={disabled}
                isClearable={true}
                isSearchable={true}
                backspaceRemovesValue={true}
                //styles={styles}
                onChange={(v) =>
                  v === null
                    ? onInputChange(String(disabled))
                    : onInputChange(v.value)
                }
                placeholder={label != "" ? label : placeholder}
                //  value={value}
                styles={{
                  menu: (base) => ({
                    position: "absolute",
                    paddingLeft: "1rem",
                    zIndex: 500,
                    ...base,
                  }),
                }}
              />
            </FormControl>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ButtonsMunicipio;
