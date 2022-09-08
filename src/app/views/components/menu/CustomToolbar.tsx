import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridColTypeDef } from "@mui/x-data-grid";

export function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }



  export const currencyFormatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  });

  export const Moneda: GridColTypeDef = {
    type: "number",
    width: 130,
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    cellClassName: "font-tabular-nums",
  };


  export const percentFormatter = new Intl.NumberFormat('percent', {
    style: 'percent',
    //currency: 'MXN',
    maximumFractionDigits: 4,
    
  });

  export const porcentage: GridColTypeDef = {
    type: 'number',
    width: 130,
    valueFormatter: ({ value }) =>  percentFormatter.format(value/100),
    cellClassName: 'font-tabular-nums',
  };

