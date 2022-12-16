import clsx from 'clsx';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridColTypeDef,
  GridToolbarQuickFilter,
  GridCellParams,
} from "@mui/x-data-grid";

export function CustomToolbar() {
  return (
   <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <GridToolbarQuickFilter />
     </GridToolbarContainer>
  );
}



export const currencyFormatter = new Intl.NumberFormat("es-US", {
  style: "currency",
  currency: "USD",
});

export const Moneda: GridColTypeDef = { type: "number", valueFormatter: ({ value }) => currencyFormatter.format(value),headerAlign:"left",
cellClassName: (params: GridCellParams<number>) => {
  if (params.value == null) {
    return '';
  }

  return clsx('super-app', {
    negative: params.value < 0,
    positive: params.value > 0,
  });
},
};





export const percentFormatter = new Intl.NumberFormat("percent", {
  style: "percent",
  //currency: 'MXN',
  maximumFractionDigits: 4,
});

export const porcentage: GridColTypeDef = { headerAlign:"left",align:"right", valueFormatter: ({ value }) => percentFormatter.format(value / 100),};
