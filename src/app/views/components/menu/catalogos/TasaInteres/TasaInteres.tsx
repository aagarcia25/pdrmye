import { useEffect, useState } from 'react'
import { GridColDef, GridColTypeDef } from '@mui/x-data-grid'
import { getUser } from '../../../../../services/localStorage'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import { messages } from '../../../../styles'
import MUIXDataGrid from '../../../MUIXDataGrid'
import { RESPONSE } from '../../../../../interfaces/user/UserInfo'

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
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [tasa, setTasa] = useState([]);
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
    CHUSER: user.id
  })


  useEffect(() => {
    CatalogosServices.getTasainteres(data).then((res) => {
      //  //console.log(res);
      setTasa(res.RESPONSE);
    });
  }, []);

  return (

 
    <div style={{ height: 600, width: "100%",}} >
      <MUIXDataGrid columns={columns} rows={tasa} />
    </div>


  )
}
