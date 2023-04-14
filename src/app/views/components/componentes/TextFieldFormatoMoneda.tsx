import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { NumericFormatCustom } from '../menu/CustomToolbar';


interface Props {
    disable: boolean;
    valor: number;
    handleSetValor: Function;
    error: boolean;
}

export const TextFieldFormatoMoneda = ({ error, disable, valor, handleSetValor }: Props) => {
    const [values, setValues] = useState({
        numberformat: valor,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
        handleSetValor(event.target.value);
    };

    useEffect(() => {
        setValues({
            numberformat: valor,
        });

    }, [valor]);


    return (
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
    )
}
