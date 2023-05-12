import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { getMenus } from "../../../services/localStorage";
import { MENU, ITEMS } from "../../../interfaces/user/UserInfo";
import { TooltipPersonalizado } from "./CustomizedTooltips";
import React from "react";

const NombreCatalogo = ({
    controlInterno,
}: {
    controlInterno: string;
}) => {

    const menu: MENU[] = JSON.parse(String(getMenus()));
    const [nombreMenu, setNombreMenu] = useState("");
    const [desMenu, setDesMenu] = useState("");

    useEffect(() => {
        menu.map((item: MENU) => {
            item.items.map((itemsMenu: ITEMS) => {
                if (String(itemsMenu.ControlInterno) === controlInterno) {
                    setNombreMenu(itemsMenu.Menu);
                    setDesMenu(itemsMenu.Descripcion);

                }
            });
        });
    }, [controlInterno]);


    return (
        <div>
            <Grid container >
                <Grid item sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                    <TooltipPersonalizado title={
                        <React.Fragment>
                            <Typography variant='h6'>
                                {desMenu}
                            </Typography>

                        </React.Fragment>
                    }>
                        <Typography variant='h3'>
                            {nombreMenu}
                        </Typography>
                    </TooltipPersonalizado>

                </Grid>
            </Grid>
        </div>
    );
};

export default NombreCatalogo;
