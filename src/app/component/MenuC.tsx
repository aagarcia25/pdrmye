import React from "react";

import { Button, Menu } from "@mui/material";
import { SubMenuC } from "./SubMenuC";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

interface Props {
  id?: string;
  menus: any[];
}

export const MenuC = ({ id, menus, ...props }: Props) => {
  return (
    <div>
      {menus.map((menu) => (
        <PopupState variant="popover" popupId={menu.ID} key={menu.ID}>
          {(popupState) => (
            <React.Fragment>
              <Button variant="contained" {...bindTrigger(popupState)}>
                {menu.Nombre}
              </Button>
              <Menu {...bindMenu(popupState)}>
                <SubMenuC
                  id={menu.ID}
                  menus={menu.CHILDREN ? menu.CHILDREN : []}
                />
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      ))}
    </div>
  );
};
