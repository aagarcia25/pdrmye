import { Grid, ToggleButton } from "@mui/material";
import { useEffect, useState } from "react";
import Imeses from "../../../../../interfaces/filtros/meses";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { AnioReadOnly } from "../../catalogos/Utilerias/AgregarCalculoUtil/AnioReadOnly";
import { BtnCalcular } from "../../catalogos/Utilerias/AgregarCalculoUtil/BtnCalcular";
import { BtnRegresar } from "../../catalogos/Utilerias/AgregarCalculoUtil/BtnRegresar";
import { FormTextField } from "../../catalogos/Utilerias/AgregarCalculoUtil/FormTextField";
import { SubTitulo } from "../../catalogos/Utilerias/AgregarCalculoUtil/SubTitulo";
import { Titulo } from "../../catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import SelectMes from "./SelectMes";
import SelectPeriodo from "./SelectPeriodo";

const AgregarCalculoForm = ({
  titulo,
  onClickBack,
}: {
  titulo: string;
  onClickBack: Function;
}) => {

    const onClickBtnCalculator = () => {};

  return (
    <Grid container spacing={3}>
        <Titulo name={titulo}/>
        <BtnRegresar onClick={onClickBack}/>
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
