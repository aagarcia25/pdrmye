import { Grid, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Iajustes } from "../../../../../interfaces/general/app.type";
import { CatalogosServices } from "../../../../../services/catalogosServices";

const SelectPeriodo = ({}: {}) => {
  const [periodo, setPeriodo] = useState("");
  const [periodos, setPeriodos] = useState<Iajustes[]>();

  const ajustesc = () => {
    let data = {};
    CatalogosServices.AjustesIndex(data).then((res) => {
      setPeriodos(res.RESPONSE);
    });
  };

  useEffect(() => {
    ajustesc();
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
          required
          onChange={(v) => setPeriodo(v.target.value)}
          value={periodo}
          // inputProps={{
          //   readOnly: tipo == 1 ? false : true,
          // }}
        >
         {/*} {periodos?.map((item: Iajustes) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.Descripcion}
              </MenuItem>
            );
          })}{*/}
        </Select>
      </Grid>
      <Grid item xs={6}></Grid>
    </>
  );
};

export default SelectPeriodo;
