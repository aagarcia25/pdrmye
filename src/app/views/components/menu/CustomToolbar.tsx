import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridColTypeDef,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

export function CustomToolbar() {
  return (
   <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      {/* <GridToolbarExport /> */}
      <GridToolbarQuickFilter />
     </GridToolbarContainer>
  );
}



export const currencyFormatter = new Intl.NumberFormat("es-US", {
  style: "currency",
  currency: "USD",
});

export const Moneda: GridColTypeDef = { type: "number", valueFormatter: ({ value }) => currencyFormatter.format(value),headerAlign:"left", 
};



export const percentFormatter = new Intl.NumberFormat("percent", {
  style: "percent",
  //currency: 'MXN',
  maximumFractionDigits: 4,
});

export const porcentage: GridColTypeDef = { headerAlign:"left",align:"right", valueFormatter: ({ value }) => percentFormatter.format(value / 100),};
