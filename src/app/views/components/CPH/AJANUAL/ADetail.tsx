import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { AlertS } from "../../../../helpers/AlertS";
import { Toast } from "../../../../helpers/Toast";
import { calculosServices } from "../../../../services/calculosServices";
import ModalForm from "../../componentes/ModalForm";
import { Moneda } from "../../menu/CustomToolbar";
import MUIXDataGrid from "../../MUIXDataGrid";
import Slider from "../../Slider";

export const ADetail = ({
  handleClose,
  row,
}: {
  handleClose: Function;
  row: any;
}) => {
  const [slideropen, setslideropen] = useState(false);
  const [data, setData] = useState([]);

  const columnsParticipaciones = [
    { field: "id", hide: true },
    {
      field: "anio",
      headerName: "Año",
      width: 100,
    },
    {
      field: "Descripcion",
      headerName: "Fondo",
      width: 300,
      description: "Fondo",
    },
    {
      field: "nombre",
      headerName: "Municipio",
      description: "Municipio",
      width: 200,
    },
    {
      field: "distribuido",
      headerName: "Importe Distribuido",
      width: 200,
      description: "Importe Distribuido",
      ...Moneda,
    },
    {
      field: "distribucionactualizada",
      headerName: "Distribución Actualizada",
      width: 200,
      description: "Distribución Actualizada",
      ...Moneda,
    },
    {
      field: "diferencia",
      headerName: "Diferencia",
      width: 200,
      description: "Diferencia",
      ...Moneda,
    },
    {
      field: "mes",
      headerName: "Diferencia a descontar por Mes",
      width: 200,
      description: "Diferencia a descontar por Mes",
      ...Moneda,
    },
  ];

  const handleClick = () => {
    setslideropen(true);
    let data = {
      NUMOPERACION: 3,
      P_IDANIO: row.row.anio,
      P_FONDO: row.row.id,
    };
    calculosServices.AjusteAnualIndex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setData(res.RESPONSE);
        setslideropen(false);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
        setslideropen(false);
      }
    });
  };

  useEffect(() => {
    handleClick();
  }, [row]);

  return (
    <>
      <ModalForm title={"Ajuste Anual Detalle"} handleClose={handleClose}>
        <Slider open={slideropen}></Slider>
        <div>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <MUIXDataGrid columns={columnsParticipaciones} rows={data} />
          </Grid>
        </div>
      </ModalForm>
    </>
  );
};
