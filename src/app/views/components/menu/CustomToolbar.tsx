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
  GridColumnHeaderParams,
  GridColumnGroupHeaderClassNamePropType,
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
    return '0';
  }

  return clsx('super-app', {
    negative: params.value <= 0,
    positive: params.value > 0,
  });
},

headerClassName: (params: GridColumnHeaderParams<number>) => {
  if (params.field === null) {
    return '';
  }

  return clsx('super-app', {
    negative: Number(params.field) < 1,
    positive: Number(params.field) > 0,
  });
},
};







export const percentFormatter = new Intl.NumberFormat("percent", {
  style: "percent",
  //currency: 'MXN',
  maximumFractionDigits: 4,
});

export const porcentage: GridColTypeDef = { headerAlign:"left",align:"right", valueFormatter: ({ value }) => percentFormatter.format(value / 100),};
