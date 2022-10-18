import { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
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
  const [meses, setMeses] = useState<SelectValues[]>([]);

  useEffect(() => {
    setMeses(fmeses());
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
            width: "10%",
          }}
        >
         <SelectFrag options={meses} onInputChange={handleFilterChangeMes} placeholder={"Seleccione Mes"}></SelectFrag>
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
          <SelectFrag options={anios} onInputChange={handleFilterChangeAnio} placeholder={"Seleccione Año"}></SelectFrag>
        </FormControl>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Filtros;
