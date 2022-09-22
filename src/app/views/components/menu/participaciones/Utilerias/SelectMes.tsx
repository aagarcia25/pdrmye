import { FormHelperText, Grid, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Imeses from "../../../../../interfaces/filtros/meses";
import { CatalogosServices } from "../../../../../services/catalogosServices";

const SelectMes = ({}: {}) => {
  const [mes, setMes] = useState("");
  const [meses, setMeses] = useState<Imeses[]>();

  const handleChange = (event: SelectChangeEvent) => {
    setMes(event.target.value);
  }

  const mesesc = () => {
    let data = {};
    CatalogosServices.meses(data).then((res) => {
      setMeses(res.RESPONSE);
    });
  };

  useEffect(() => {
    mesesc();
  }, []);

  return (
    <>
      <Grid
        item
        xs={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: "Bold" }}>Mes:</Typography>
      </Grid>
      <Grid item xs={1.6} sx={{}}>
        <Select
          id="mes"
          required
          onChange={(v) => setMes(v.target.value)}
          value={mes}
          // inputProps={{
          //   readOnly: tipo == 1 ? false : true,
          // }}
        >
          {meses?.map((item: Imeses) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.Descripcion}
              </MenuItem>
            );
          })}
        </Select>
        
        
      </Grid>
      <Grid item xs={6}></Grid>
    </>
  );
};

export default SelectMes;
