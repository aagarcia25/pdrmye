import { Grid } from '@mui/material';
import { useEffect, useState } from 'react'
import { RESPONSE, RESPONSESTORAGE } from '../../../interfaces/user/UserInfo';
import { AuthService } from '../../../services/AuthService';
import { getUser, setPerfilFoto } from '../../../services/localStorage';
interface Props {
    disable: boolean;
    valor: number;
    handleSetValor: Function;
    error: boolean;
}

export const ProfilePhoto = ( ) => {
    const user: RESPONSE = (JSON.parse(String(getUser())));
    const [responseStorage, setResponseStorage] = useState<RESPONSESTORAGE>();

    const GetImage = () => {
        AuthService.GetImagenProfile("/PDRMYE/USUARIOS/FOTOPERFIL/", user.RutaFoto).then((res) => {
            if (res.SUCCESS) {
                const response: RESPONSESTORAGE = (res.RESPONSE.RESPONSE);
                setResponseStorage(res.RESPONSE.RESPONSE);
                setPerfilFoto(res.RESPONSE.RESPONSE);
            }
        });
    };

    useEffect(() => {
        // GetImage()

    }, []);


    return (
        <Grid sx={{ width: "100%", height: "60vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img style={{ objectFit: "scale-down", width: "100%", height: "100%", }}
                src={"data:" + responseStorage?.TIPO + ";base64," + String(responseStorage?.FILE)} />
        </Grid>

    )
}



