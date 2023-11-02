import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { AlertS } from "../../../helpers/AlertS";
import { SireService } from "../../../services/SireService";
import MUIXDataGridid from "../MUIXDataGridid";
import ModalForm from "../componentes/ModalForm";
import { Moneda } from "../menu/CustomToolbar";

export const PagosParciales = ({
  handleClose,
  sp,
}: {
  handleClose: Function;
  sp: string;
}) => {
  // CAMPOS DE LOS FORMULARIOS
  const [dataRow, setdataRow] = useState([]);

  const columns: GridColDef[] = [
    {
      field: "SP",
      headerName: "Solicitud de Pago",
      description: "Solicitud de Pago",
      width: 100,
    },
    {
      field: "FECHA_PAGO",
      headerName: "Fecha de Pago",
      description: "Fecha de Pago",
      width: 100,
    },
    {
      field: "TOTAL_PAGO",
      headerName: "Pago",
      description: "Pago",
      width: 250,
      ...Moneda,
    },
    {
      field: "NO_CUENTA",
      headerName: "Número de Cuenta",
      description: "Número de Cuenta",
      width: 200,
    },
    {
      field: "NO_CHEQUE",
      headerName: "Número de Cheque",
      description: "Número de Cheque",
      width: 200,
    },
    {
      field: "BENEFICIARIOPAGO",
      headerName: "Beneficiario",
      description: "Beneficiario",
      width: 250,
    },
    {
      field: "TIPO_PAGO",
      headerName: "Tipo de Pago",
      description: "Tipo de Pago",
      width: 250,
    },
    {
      field: "CONCEPTO",
      headerName: "Concepto",
      description: "Concepto",
      width: 350,
    },
    {
      field: "COG",
      headerName: "Clave",
      description: "Clave",
      width: 100,
    },
    {
      field: "DESCOG",
      headerName: "Descripción",
      description: "Descripción",
      width: 450,
    },
  ];

  const consulta = () => {
    let data = {
      sp: sp,
    };

    SireService.getPagosbySP(data).then((res) => {
      if (res.SUCCESS) {
        setdataRow(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: "Sin Respuesta",
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    consulta();
  }, [sp]);

  return (
    <>
      <ModalForm title={"Pagos"} handleClose={handleClose}>
        <MUIXDataGridid columns={columns} rows={dataRow} />
      </ModalForm>
    </>
  );
};
