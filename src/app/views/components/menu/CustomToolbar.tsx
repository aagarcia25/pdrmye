import {
  GridCellParams,
  GridColTypeDef,
  GridColumnHeaderParams,
} from "@mui/x-data-grid";
import clsx from "clsx";
import React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const NumericFormatCustom = React.forwardRef<
  NumericFormatProps,
  CustomProps
>(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="$"
    />
  );
});

export const currencyFormatter = new Intl.NumberFormat("es-US", {
  style: "currency",
  currency: "USD",
});

export const Moneda: GridColTypeDef = {
  type: "number",
  valueFormatter: ({ value }) => currencyFormatter.format(value),
  headerAlign: "left",
  cellClassName: (params: GridCellParams<number>) => {
    if (params.value == null) {
      return "0";
    }

    return clsx("super-app", {
      negative: params.value <= 0,
      positive: params.value > 0,
    });
  },

  headerClassName: (params: GridColumnHeaderParams<number>) => {
    if (params.field == null) {
      return "";
    }

    return clsx("super-app", {
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

export const porcentage: GridColTypeDef = {
  headerAlign: "left",
  align: "right",
  valueFormatter: ({ value }) => percentFormatter.format(value / 100),
};
