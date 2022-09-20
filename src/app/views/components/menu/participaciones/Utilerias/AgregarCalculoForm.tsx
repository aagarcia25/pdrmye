import { Grid, ToggleButton } from "@mui/material";
import { useEffect, useState } from "react";
import Imeses from "../../../../../interfaces/filtros/meses";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { AnioReadOnly } from "../../catalogos/Utilerias/AgregarCalculoUtil/AnioReadOnly";
import { BtnCalcular } from "../../catalogos/Utilerias/AgregarCalculoUtil/BtnCalcular";
import { FormTextField } from "../../catalogos/Utilerias/AgregarCalculoUtil/FormTextField";
import { SubTitulo } from "../../catalogos/Utilerias/AgregarCalculoUtil/SubTitulo";
import { Titulo } from "../../catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import SelectMes from "./SelectMes";
import SelectPeriodo from "./SelectPeriodo";

const AgregarCalculoForm = ({
  titulo,
}: {
  titulo: string;
}) => {

    const onClickBtnCalculator = () => {};

  return (
    <Grid container spacing={3}>
        <Titulo name={titulo} />
        <SubTitulo />
        <AnioReadOnly />
        <SelectMes/>  
        <FormTextField text="Monto" inputPlaceholder="1000200" id={1}/>
        <SelectPeriodo/> 
      <BtnCalcular onClick={onClickBtnCalculator} />
    </Grid>
  );
};

export default AgregarCalculoForm;
