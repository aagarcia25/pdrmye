import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getRfToken, getToken, getUser } from '../../../services/localStorage';
import { ParametroServices } from '../../../services/ParametroServices';
import IFrame from '../Herramientas/IFrame';




const ReporteadorAdmin = () => {
    const [URL, setURL] = useState("");
    const jwtToken = String(getToken()).replace(/["']/g, "");
    const RFToken = String(getRfToken()).replace(/["']/g, "");


    const handleURL = () => {
        let dataAppId = {
            NUMOPERACION: 5,
            NOMBRE: "URL_GEN_REP",
        }
        ParametroServices.ParametroGeneralesIndex(dataAppId).then((resURL) => {
            setURL(String(resURL?.RESPONSE?.Valor));
        });
    }
    useEffect(() => {

        handleURL();
    }, []);

    return (
        <div >

            <Grid container sx={{ justifyContent: "center" }}>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Typography variant="h5" paddingBottom={2}>
                        Administrar Reportes
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default ReporteadorAdmin;
