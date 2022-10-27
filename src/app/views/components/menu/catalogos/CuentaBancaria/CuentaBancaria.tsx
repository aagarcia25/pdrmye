import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { messages } from "../../../../styles";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import MUIXDataGrid from "../../../MUIXDataGrid";
import ButtonsAdd from "../Utilerias/ButtonsAdd";
import { CuentaBancariaModal } from "./CuentaBancariaModal";


export const CuentaBancaria = () => {
    const [modo, setModo] = useState("");
    const [open, setOpen] = useState(false);
    const [tipoOperacion, setTipoOperacion] = useState(0);
    const [vrows, setVrows] = useState({});
    const [cuentaBancaria, setCuentaBancaria] = useState([]);
    const user: RESPONSE = JSON.parse(String(getUser()));

    const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
    const [agregar, setAgregar] = useState<boolean>(false);
    const [editar, setEditar] = useState<boolean>(false);
    const [eliminar, setEliminar] = useState<boolean>(false);

    console.log("cuentabancaria: ", cuentaBancaria);

    const handleAccion = (v: any) => {
        if (v.tipo == 1) {
          console.log(v);
          setTipoOperacion(2);
          setModo("Editar Registro");
          setOpen(true);
          setVrows(v.data);
        } else if (v.tipo == 2) {
          Swal.fire({
            icon: "info",
            title: "Estas seguro de eliminar este registro?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Confirmar",
            denyButtonText: `Cancelar`,
          }).then((result) => {
            if (result.isConfirmed) {
              let data = {
                NUMOPERACION: 3,
                CHID: v.data.row.id,
                CHUSER: user.id,
              };
              console.log(data);
    
              CatalogosServices.CuentaBancaria(data).then((res) => {
                if (res.SUCCESS) {
                  Toast.fire({
                    icon: "success",
                    title: "Registro Eliminado!",
                  });
    
                  consulta({ NUMOPERACION: 4 });
                } else {
                  Alert.fire({
                    title: "Error!",
                    text: res.STRMESSAGE,
                    icon: "error",
                  });
                }
              });
            } else if (result.isDenied) {
              Swal.fire("No se realizaron cambios", "", "info");
            }
          });
        }
      };

      const columns: GridColDef[] = [
        {
          field: "id",
          headerName: "Identificador",
          hide: true,
          width: 150,
          description: messages.dataTableColum.id,
        },
        { field: "IdBancos", headerName: "ID BANCOS", width: 250 },

        { field: "IdUsuarios", headerName: "ID USUARIOS", width: 250 },
        { field: "NumeroCuenta", headerName: "Cuenta", width: 250 },
        { field: "ClabeBancaria", headerName: "Clabe", width: 250 },
        { field: "deleted", headerName: "Estatus", width: 100,
         },
    
        {
          field: "acciones",
          headerName: "Acciones",
          description: "Campo de Acciones",
          sortable: false,
          width: 200,
          renderCell: (v) => {
            return (
              <BotonesAcciones
                handleAccion={handleAccion}
                row={v}
                editar={editar}
                eliminar={eliminar}
              />
            );
          },
        },
      ];

      const handleClose = () => {
        setOpen(false);
        consulta({ NUMOPERACION: 4 });
      };
    
      const handleOpen = (v: any) => {
        setTipoOperacion(1);
        setModo("Agregar Registro");
        setOpen(true);
        setVrows("");
      };
    
      const consulta = (data: any) => {
        CatalogosServices.CuentaBancaria(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Consulta Exitosa!",
            });
            console.log(res.RESPONSE);
            setCuentaBancaria(res.RESPONSE);
          } else {
            Alert.fire({
              title: "Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });
      };

      useEffect(() => {
        permisos.map((item: PERMISO) => {
          if (String(item.ControlInterno) === "CUENTABANCARIA") {
            console.log(item);
            if (String(item.Referencia) == "AGREG") {
              setAgregar(true);
            }
            if (String(item.Referencia) == "ELIM") {
              setEliminar(true);
            }
            if (String(item.Referencia) == "EDIT") {
              setEditar(true);
            }
          }
        });
        consulta({ NUMOPERACION: 4 });
      }, []);

      return (
        <div style={{ height: 600, width: "100%" }}>
          {open ? (
             <CuentaBancariaModal
             open={open}
             tipo={tipoOperacion}
             handleClose={handleClose}
             dt={vrows}
           />
          ) : ""}
    
          <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
          <MUIXDataGrid columns={columns} rows={cuentaBancaria} />
        </div>
      );
}