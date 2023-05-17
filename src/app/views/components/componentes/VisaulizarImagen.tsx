import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { AuthService } from '../../../services/AuthService';
import { Blanco } from '../../../styles/imagen';
import SliderProgress from '../SliderProgress';
import SliderProgressLoading from '../SliderProgressLoading';
interface Props {
    ubicacion: string;
    name: string;
}

export const VisaulizarImagen = (
    {
        ubicacion,
        name
    }: Props) => {
    const [TIPO, setTIPO] = useState<string>("");
    const [FILE, setFILE] = useState<string>("");

    const GetImage = () => {
        AuthService.GetImagen(ubicacion, name).then((res) => {
            if (res.RESPONSE.SUCCESS) {
                setTIPO(res.RESPONSE.RESPONSE.TIPO);
                setFILE(res.RESPONSE.RESPONSE.FILE);
            }
        });
    };

    useEffect(() => {
        GetImage()

    }, [name]);


    return (
        <div className='containerCenterGenerico' >
            {FILE ?
            // <SliderProgressLoading />
                <img  style={{ objectFit: "scale-down", width: "100%", height: "100%", }}
                    src={"data:" + TIPO + ";base64," + FILE} />
                :
                <SliderProgressLoading />
                    
            }
        </div>

    )
}



