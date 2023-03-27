

import { useEffect, useState } from "react";
import { CatalogosServices } from '../../../../../services/catalogosServices';
import { Toast } from '../../../../../helpers/Toast';
import ButtonsAdd from '../Utilerias/ButtonsAdd';
import { getPermisos, getUser } from '../../../../../services/localStorage';
import { PERMISO, RESPONSE } from '../../../../../interfaces/user/UserInfo';
import { AlertS } from '../../../../../helpers/AlertS';
import Swal from 'sweetalert2';
import BotonesAcciones from '../../../componentes/BotonesAcciones';
import { GridColDef } from '@mui/x-data-grid';
import MUIXDataGrid from '../../../MUIXDataGrid';
import { CatTPModal } from "./CatTPModal";
import NombreCatalogo from "../../../componentes/NombreCatalogo";

export const CatTP = () => {
  const [data, setData] = useState([]);
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);

  const columns: GridColDef[] = [
    { field: "id", hide: true },
    {
      field: "acciones", disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <BotonesAcciones
            handleAccion={handleAccion}
            row={v}
            editar={editar}
            eliminar={eliminar} />
        );
      },
    },
    { field: "Clave", headerName: "Clave", description: "Clave", width: 300 },
    { field: "Descripcion", headerName: "Descripción", description: "Descripción", width: 450 },
    { field: "Abreviacion", headerName: "Abreviación", description: "Abreviación", width: 300 },
    { field: "DescripcionTipoPAgo", headerName: "Descripción de Tipo de Pago", description: "Descripción de Tipo de Pago", width: 300 },
  ];

  const handleAccion = (v: any) => {
    if (v.tipo === 1) {
      //console.log(v);
      setTipoOperacion(2);
      setModo("Editar Registro");
      setOpen(true);
      setVrows(v.data);
    } else if (v.tipo == 2) {
      Swal.fire({
        icon: "info",
        title: "¿Estás seguro de eliminar este registro??",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          const user: RESPONSE = JSON.parse(String(getUser()));
          let data = {
            NUMOPERACION: 3,
            CHID: v.data.row.id,
            CHUSER: user.id,
          };

          CatalogosServices.TiposDePagoSP(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "Registro Eliminado!",
              });

              let data = {
                NUMOPERACION: 4,
              };
              consulta(data);
            } else {
              AlertS.fire({
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

  const handleClose = () => {
    setOpen(false);
    consulta({ NUMOPERACION: 4 });

  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setVrows(v);
  };

  const consulta = (data: any) => {
    CatalogosServices.TiposDePagoSP(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        //console.log(res);
        setData(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };


  useEffect(() => {

    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "CATTP") {
        //console.log(item)
        if (String(item.Referencia) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.Referencia) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) === "EDIT") {
          setEditar(true);
        }

      }
    });
    consulta({ NUMOPERACION: 4 });
  }, []);

  return (
    <div style={{ height: 600, width: "100%", padding: "1%" }}>
      {open ? (
        <CatTPModal
          open={open}
          modo={modo}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}
      <NombreCatalogo controlInterno={"CATTP"} />

      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
      <MUIXDataGrid columns={columns} rows={data} />
    </div>
  )
}
