import {
  Grid
} from "@mui/material";
import { useEffect, useState } from "react";
import { AlertS } from "../../../../helpers/AlertS";
import { Toast } from "../../../../helpers/Toast";
import { PERMISO } from "../../../../interfaces/user/UserInfo";
import { calculosServices } from "../../../../services/calculosServices";
import { getPermisos } from "../../../../services/localStorage";
import ModalForm from "../../componentes/ModalForm";
import { Moneda } from "../../menu/CustomToolbar";
import MUIXDataGrid from "../../MUIXDataGrid";
import Slider from "../../Slider";
export const AjAnualDetail = ({
  handleClose,
  row
}: {
  handleClose: Function;
  row :any;
}) => {
  const [slideropen, setslideropen] = useState(false);
  //MODAL
  //Constantes para las columnas
  const [data, setData] = useState([]);
  /// Permisos
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));

  const columnsParticipaciones = [
    { field: "id", hide: true },
    {
      field: "anio", headerName: "Año", width: 100,
    },
    {
      field: "Descripcion",
      headerName: "Fondo",
      width: 300,
      description: "Fondo",
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
    
  ];

 
  const handleClick = () => {
    setslideropen(true);
    let data = {
      NUMOPERACION: 3,
      P_IDANIO:row.row.anio,
      P_FONDO:row.row.id

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

    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "AJUSTESEMESTRAL") {
        if (String(item.Referencia) === "TRAZASPEIDAF") {
        }
        if (String(item.Referencia) === "POLIZASPEIDAF") {
        }
      }
    });
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

