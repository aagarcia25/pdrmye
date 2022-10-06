import { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Imeses from "../../../../../interfaces/filtros/meses";
import Ianios from "../../../../../interfaces/filtros/anios";
import { fanios } from "../../../../../share/loadAnios";
import { fmeses } from "../../../../../share/loadMeses";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import SelectFrag from "../../../Fragmentos/Select/SelectFrag";

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
  const [anios, setAnios] = useState<SelectValues[]>([]);
  const [meses, setMeses] = useState<Imeses[]>();

  useEffect(() => {
    setMeses(fmeses);
    setAnios(fanios());
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
            width: "10%",
          }}
        >
          <SelectFrag options={anios} onInputChange={handleFilterChangeAnio}></SelectFrag>
        </FormControl>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Filtros;
