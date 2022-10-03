import { useEffect, useState } from 'react'
import { LinearProgress } from '@mui/material'
import { DataGrid, esES, GridColDef, GridColTypeDef } from '@mui/x-data-grid'
import { CustomNoRowsOverlay } from '../../CustomNoRowsOverlay'
import { CustomToolbar } from '../../CustomToolbar'
import { getUser } from '../../../../../services/localStorage'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import { messages } from '../../../../styles'
import MUIXDataGrid from '../../../MUIXDataGrid'

export const TasaInteres = () => {



  const currencyFormatter = new Intl.NumberFormat('percent', {
    style: 'percent',
    //currency: 'MXN',
    maximumFractionDigits: 2,

  });

  const porcentage: GridColTypeDef = {
    type: 'number',
    width: 130,
    valueFormatter: ({ value }) => currencyFormatter.format(value / 100),
    cellClassName: 'font-tabular-nums',
  };
  const user = getUser();
  const [tasa, setTasa] = useState([]);

  const [open, setOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150, hide: true, description: messages.dataTableColum.id },
    { field: "Fecha", headerName: "Fecha", width: 150 },
    { field: "Interes", headerName: "Tasa", width: 150, ...porcentage },

  ];


  let data = ({
    NUMOPERACION: 4,
    CHID: "",
    NUMANIO: "",
    NUMTOTALPOB: "",
    CHUSER: 1
  })


  useEffect(() => {
    CatalogosServices.getTasainteres(data).then((res) => {
      //  console.log(res);
      setTasa(res.RESPONSE);
    });
  }, []);

  return (


    <div style={{ height: 600, width: "100%" }} >
      <MUIXDataGrid columns={columns} rows={tasa} />
    </div>


  )
}
