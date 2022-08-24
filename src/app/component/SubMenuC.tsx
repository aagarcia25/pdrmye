import { MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  menus: any[];
}

export const SubMenuC = ({ id, menus, ...props }: Props) => {
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    navigate(event.currentTarget.id);
  };

  return (
    <>
      {menus.map((menu) => (
        <MenuItem key={menu.Path} id={menu.Path} onClick={handleClick}>
          {menu.Nombre}
        </MenuItem>
      ))}
    </>
  );
};
