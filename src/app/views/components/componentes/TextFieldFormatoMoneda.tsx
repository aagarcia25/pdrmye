import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import { NumericFormatCustom } from "../menu/CustomToolbar";

interface Props {
  disable: boolean;
  valor: number;
  handleSetValor: Function;
  error: boolean;
  modo: string;
}
interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const TextFieldFormatoMoneda = ({
  modo,
  error,
  disable,
  valor,
  handleSetValor,
}: Props) => {
  const [values, setValues] = useState({
    numberformat: valor,
    textmask: valor,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    handleSetValor(event.target.value);
  };

  const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
    function TextMaskCustom(props, ref) {
      const { onChange, ...other } = props;
      return (
        <IMaskInput
          {...other}
          mask="(#00) 000-0000"
          definitions={{
            "#": /[1-9]/,
          }}
          //   inputRef={ref}
          onAccept={(value: any) =>
            onChange({ target: { name: props.name, value } })
          }
          overwrite
        />
      );
    }
  );

  interface State {
    textmask: string;
    numberformat: string;
  }

  useEffect(() => {
    setValues({
      numberformat: valor,
      textmask: valor,
    });
  }, [valor]);

  return (
    <>
      {
        modo == "moneda" ? (
          <TextField
            size="small"
            disabled={disable}
            value={values.numberformat}
            onChange={handleChange}
            name="numberformat"
            id="formatted-numberformat-input"
            InputProps={{
              inputComponent: NumericFormatCustom as any,
            }}
            variant="outlined"
            error={error}
          />
        ) : (
          ""
        )
        // <Input
        //   value={values.textmask}
        //   onChange={handleChange}
        //   name="textmask"
        //   id="formatted-text-mask-input"
        //   inputComponent={TextMaskCustom as any}
        // />
      }
    </>
  );
};
