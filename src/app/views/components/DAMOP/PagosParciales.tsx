import { GridColDef } from "@mui/x-data-grid";
import MUIXDataGrid from "../MUIXDataGrid";
import ModalForm from "../componentes/ModalForm";
import { useState } from "react";

export const PagosParciales = ({ handleClose }: { handleClose: Function }) => {
  // CAMPOS DE LOS FORMULARIOS
  const [dataRow, setdataRow] = useState([]);
  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", hide: true, width: 100 },

    {
      field: "ClaveRetencion",
      headerName: "Clave Retención",
      description: "Numero De Operación",
      width: 150,
    },
    {
      field: "ClaveTipoRetencion",
      headerName: "Clave De Deudor/Acredor",
      description: "Clave De Deudor/Acredor",
      width: 250,
    },
  ];

  return (
    <>
      <ModalForm title={"Pagos"} handleClose={handleClose}>
        <MUIXDataGrid columns={columns} rows={dataRow} />
      </ModalForm>
    </>
  );
};
