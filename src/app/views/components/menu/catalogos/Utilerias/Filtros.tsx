import { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import Imeses from "../../../../../interfaces/general/Api_AdSisUs.type";
import Ianios from "../../../../../interfaces/general/Api_AdSisUs.type";

const Filtros = ({
  anioApply,
  mesApply,
  handleFilterChangeAnio,
  handleFilterChangeMes,
  valueFilterAnio,
  valueFilterMes,
}: {
  anioApply: boolean;
  mesApply: boolean;
  handleFilterChangeAnio: Function;
  handleFilterChangeMes: Function ;
  valueFilterAnio: any;
  valueFilterMes: any;
}) => {
  const [anios, setAnios] = useState<Ianios[]>();
  const [meses, setMeses] = useState<Imeses[]>();

  const mesesc = () => {
    let data = {};
    CatalogosServices.meses(data).then((res) => {
      setMeses(res.RESPONSE);
    });
  };

  const aniosc = () => {
    let data = {};
    CatalogosServices.anios(data).then((res) => {
      setAnios(res.RESPONSE);
    });
  };

  useEffect(() => {
    mesesc();
    aniosc();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "right",
        spacing: "1",
      }}
    >
      {mesApply  ? (
        <FormControl
          variant="standard"
          sx={{
            width: "5%",
          }}
        >
          <InputLabel>Mes</InputLabel>
          <Select
            onChange={(v) => handleFilterChangeMes(v)}
            value={valueFilterMes}
            label="Mes"
          >
            {meses?.map((item: Imeses) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.Descripcion}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      ) : (
        ""
      )}

      {anioApply ? (
        <FormControl
          variant="standard"
          sx={{
            width: "5%",
          }}
        >
          <InputLabel>Año</InputLabel>
          <Select
            onChange={(v) => handleFilterChangeAnio(v)}
            value={valueFilterAnio}
            label="Año"
          >
            {anios?.map((item: Ianios) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.anio}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Filtros;
