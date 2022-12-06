import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { getMenus } from "../../../services/localStorage";
import { MENU ,ITEMS} from "../../../interfaces/user/UserInfo";
	
const NombreCatalogo = ({
    controlInterno,
}: {
    controlInterno: string;
}) => {

    const menu: MENU[] = JSON.parse(String(getMenus()));
    const [nombreMenu, setNombreMenu] = useState("");
    useEffect(() => {
        menu.map((item: MENU) => {
            item.items.map((itemsMenu: ITEMS) => {
              if (String(itemsMenu.ControlInterno) === controlInterno) {
                setNombreMenu(itemsMenu.Menu);
              }
            });
          });
    }, [controlInterno]);


    return (
        <div>
            <Grid container >
                <Grid item sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                    <Typography variant='h3'>
                        {nombreMenu}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default NombreCatalogo;
