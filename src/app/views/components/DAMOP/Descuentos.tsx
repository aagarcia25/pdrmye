import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import { AlertS } from "../../../helpers/AlertS";
import { Toast } from "../../../helpers/Toast";
import {
  default as SelectValues,
  default as SelectValuesCatRetenciones,
} from "../../../interfaces/Select/SelectValues";
import {
  USUARIORESPONSE,
  getDescuentos,
} from "../../../interfaces/user/UserInfo";
import { DPCPServices } from "../../../services/DPCPServices";
import { CatalogosServices } from "../../../services/catalogosServices";
import { getUser } from "../../../services/localStorage";
import MUIXDataGrid from "../MUIXDataGrid";
import ModalForm from "../componentes/ModalForm";
import { Moneda, currencyFormatter } from "../menu/CustomToolbar";
import ButtonsAdd from "../menu/catalogos/Utilerias/ButtonsAdd";

export const Descuentos = ({
  handleClose,
  tipo,
  dt,
  permisoEliminarDescuento,
  permisoEditarDescuento,
  permisoAgregarDescuento,
}: {
  handleClose: Function;
  tipo: number;
  dt: any;
  permisoEliminarDescuento: boolean;
  permisoEditarDescuento: boolean;
  permisoAgregarDescuento: boolean;
}) => {
  // CAMPOS DE LOS FORMULARIOS
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [id, setId] = useState("");

  const [dataRow, setdataRow] = useState([]);
  const [openModalDes, setOpenModalDes] = useState<boolean>(false);
  const [editarRegistro, setEditarRegistro] = useState<boolean>(false);
  const [idRegistro, setIdRegistro] = useState<string>();

  const [value, setValue] = useState("");
  const [desPar, setDesPar] = useState<string>();
  const [otrosCar, setOtrosCar] = useState<string>();
  const [ComentariosDes, setComentariosDes] = useState("");
  const [numOperacion, setNumOperacion] = useState("");
  const [numOperacionOp, setNumOperacionOp] = useState<SelectValues[]>([]);
  const [cveReten, setCveReten] = useState("");
  const [cveRetenOp, setCveRetenOp] = useState<SelectValues[]>([]);
  const [sumDes, setSumDes] = useState<number>(0);
  const [sumret, setSumRet] = useState<number>(0);
  const [sumaTotal, setSumaTotal] = useState<Number>();
  const [claveRetencionOp, setclaveRetencionOp] = useState<
    SelectValuesCatRetenciones[]
  >([]);
  const [claveRet, setClaveRet] = useState("");
  const [descRet, setDescRet] = useState("");
  const [ValRet, setValRet] = useState("");
  const [idRetencion, setIdRetencion] = useState("");

  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", hide: true, width: 150 },
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <Box>
            {permisoEliminarDescuento ? (
              <Tooltip title="Eliminar Descuento">
                <IconButton onClick={() => handleEliminarDescuento(v)}>
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
            {permisoEditarDescuento ? (
              <Tooltip title="Editar Descuento">
                <IconButton onClick={() => handleOpen(true, v)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
          </Box>
        );
      },
    },
    {
      field: "Tipo",
      headerName: "Tipo",
      description: "Tipo",
      width: 200,
      renderCell: (v) => {
        return (
          <Box>
            {v.row.Tipo == "1" ? "Descuentos" : "Recuperacion de Adeudos"}
          </Box>
        );
      },
    },
    {
      field: "NumOperacion",
      headerName: "Num De Operación",
      description: "Numero De Operación",
      width: 200,
    },
    {
      field: "ParcialDescuento",
      headerName: "Descuento Parcial",
      description: "Descuento Parcial",
      width: 200,
      ...Moneda,
    },
    {
      field: "OtrosCargos",
      headerName: "Otros Cargos",
      description: "Otros Cargos",
      width: 200,
      ...Moneda,
    },
    {
      field: "total",
      headerName: "Total",
      description: "Total",
      width: 200,
      ...Moneda,
      renderHeader: () => (
        <>
          {"Total: " +
            (sumaTotal == undefined
              ? "0"
              : currencyFormatter.format(Number(sumaTotal)))}
        </>
      ),
    },
    {
      field: "cveRetencion",
      headerName: "Retención CVE",
      description: "Retención CVE",
      width: 150,
    },
    {
      field: "DescripcionDescuento",
      headerName: "Descripción De Descuento",
      description: "Descripción De Descuento",
      width: 500,
    },
  ];

  const handleRequest = (data: any) => {
    if (tipo == 1) {
      //AGREGAR
      agregar(data);
    } else if (tipo == 2) {
      //EDITAR

      editar(data);
    }
  };

  const agregar = (data: any) => {
    CatalogosServices.Bancos(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Agregado!",
        });
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const editar = (data: any) => {
    CatalogosServices.Bancos(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Editado!",
        });
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const consulta = (v: string) => {
    let data = {
      CHID: dt.row.id,
    };

    DPCPServices.getDescuentos(data).then((res) => {
      if (res.SUCCESS) {
        setdataRow(res.RESPONSE);
        var sumaDes = 0;
        var sumaRet = 0;
        var sumatotal = 0;
        // if (v == "add") {
        res.RESPONSE.map((item: getDescuentos) => {
          if (item.Tipo == "1") {
            sumaDes = sumaDes + Number(item.total);
          } else if (item.Tipo == "2") {
            sumaRet = sumaRet + Number(item.total);
          }
        });
        res.RESPONSE.map((item: getDescuentos) => {
          sumatotal = sumatotal + Number(item.total);
          setSumaTotal(sumatotal);
        });
        if (res.RESPONSE.length == 0) {
          setSumaTotal(sumatotal);
        }

        setSumDes(sumaDes);
        setSumRet(sumaRet);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: "Sin Respuesta",
          icon: "error",
        });
      }
    });
  };

  const handleEliminarDescuento = (v: any) => {
    Swal.fire({
      icon: "warning",
      title: "Solicitar",
      text: "",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let data = {
          NUMOPERACION: 2,
          CHID: v.row.id,
          CHUSER: user.Id,
        };
        DPCPServices.setDescuentos(data).then((res) => {
          if (res.SUCCESS) {
            setValue("");
            setOtrosCar("0");
            setDesPar("0");
            setComentariosDes("");
            consulta("remove");

            setSumDes(sumDes - Number(v.row.total));

            Toast.fire({
              icon: "success",
              title: "Descuento Eliminado!",
            });
          } else {
            AlertS.fire({
              title: "¡Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });
      }
    });
  };

  const handleAplicarDescuento = () => {
    if (
      value.length < 1 ||
      desPar == "0" ||
      numOperacion == "" ||
      numOperacion == "false" ||
      (desPar !== undefined ? Number(desPar) : 0) +
        (otrosCar !== undefined ? Number(otrosCar) : 0) ==
        0
    ) {
      AlertS.fire({
        title: "¡Error!",
        text: "Verificar Campos",
        icon: "error",
      });
    } else {
      if (
        Number(dt.row.total) -
          (sumret + sumDes) -
          ((desPar !== undefined ? Number(desPar) : 0) +
            (otrosCar !== undefined ? Number(otrosCar) : 0)) >=
        0
      ) {
        Swal.fire({
          icon: "warning",
          title: "Solicitar",
          text: "",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            let data = {
              NUMOPERACION: !editarRegistro ? 1 : 3,
              CHID: dt.row.id,
              IDDESCUENTO: idRegistro,
              CHUSER: user.Id,
              IDMUN: dt.row.idmunicipio,
              TIPO: value == "Anticipo" ? 1 : 2,
              NUMOP: numOperacion,
              IDURES: "0405",
              IDDIVISA: dt.row.idDivisa,
              DESPARCIAL: desPar,
              TOTAL:
                (desPar !== undefined ? Number(desPar) : 0) + Number(otrosCar),
              OTROSCARGOS: otrosCar,
              CVERET: value == "Anticipo" ? "" : idRetencion,
              DESCRIPCION: ComentariosDes,
            };

            DPCPServices.setDescuentos(data).then((res) => {
              if (res.SUCCESS) {
                setValue("");
                setOtrosCar("0");
                setDesPar("0");
                setComentariosDes("");
                consulta("add");
                setEditarRegistro(false);
                Toast.fire({
                  icon: "success",
                  title: "Descuento Agregado!",
                });
                handleCloseModal();
              } else {
                AlertS.fire({
                  title: "¡Error!",
                  text: res.STRMESSAGE,
                  icon: "error",
                });
              }
            });
          }
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Solicitar",
          text: "El descuento no puede dar como resultado un numero negativo",
          showDenyButton: false,
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  const handleSelectNumOp = (e: any) => {
    // setNumOperacion(e);
  };

  const handleSelectCveRet = (e: any) => {
    // setCveReten(e);
  };

  const handleOpen = (editar: boolean, data: any) => {
    if (editar) {
      setClaveRet(String(data.row.cveRetencion));
      setEditarRegistro(true);
      setOpenModalDes(true);
      setCveReten(data.row.cveRetencion);
      setOtrosCar(data.row.OtrosCargos);
      setDesPar(data.row.ParcialDescuento);
      setNumOperacion(data.row.NumOperacion);
      setComentariosDes(data.row.DescripcionDescuento);
      setValue(data.row.Tipo == "1" ? "Anticipo" : "RecuperacionAdeudos");
      setIdRegistro(data.row.id);
    } else {
      setOpenModalDes(true);
    }
  };

  const handleCloseModal = () => {
    setValue("");
    setOpenModalDes(false);
    setEditarRegistro(false);
    setOtrosCar("0");
    setDesPar("0");
    setComentariosDes("");
    setNumOperacion("");
    setCveReten("");
    setClaveRet("");
    setDescRet("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setOtrosCar("0");
    setDesPar("0");
    setComentariosDes("");
    handleSelectNumOp("false");
    handleSelectCveRet("");
    setNumOperacion("");
  };

  const onInputChange = (v: any) => {
    if (v == "") {
      setClaveRet("");
      setDescRet("");
      setValRet("");
      setIdRetencion("");
    } else {
      setClaveRet(v.value);
      setDescRet(v.Descripcion);
      setValRet(v.retencion);
      setIdRetencion(v.id);
    }
  };
  useEffect(() => {
    setNumOperacionOp([
      {
        value: "1515",
        label: "Tipo 1515",
      },
      {
        value: "25252",
        label: "Tipo 25252",
      },
      {
        value: "1252515",
        label: "Tipo 1252515",
      },
      {
        value: "15252515",
        label: "Tipo 15252515",
      },
      {
        value: "252588",
        label: "Tipo 252588",
      },
    ]);
    setCveRetenOp([
      {
        value: "3553",
        label: "Tipo 3553",
      },
      {
        value: "35356",
        label: "Tipo 35356",
      },
      {
        value: "2344565",
        label: "Tipo 2344565",
      },
      {
        value: "666544",
        label: "Tipo 666544",
      },
      {
        value: "976866",
        label: "Tipo 976866",
      },
    ]);
    consulta("add");

    if (dt == "") {
    } else {
      setId(dt?.row?.id);
    }
    CatalogosServices.IndexCatRetenciones({ NUMOPERACION: 5 }).then((res) => {
      if (res.SUCCESS) {
        setclaveRetencionOp(res.RESPONSE);
        // handleClose();
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  }, [dt]);

  return (
    <>
      <ModalForm title={"Edición de Descuentos"} handleClose={handleClose}>
        <Grid container>
          <Grid item>
            <label>
              {"Año:  " + dt.row.Anio}
              <br />
              {" Mes: " + dt.row.Mes}
              <br />
              {" Municipio: " + dt.row.Nombre}
              <br />
              {" Total Bruto: $" + Number(dt.row.total).toLocaleString("es-US")}
              <br />
              {"Recuperación Adeudos:  $" +
                Number(sumret).toLocaleString("es-US")}
              <br />
              {"Descuentos: $" + Number(sumDes).toLocaleString("es-US")}
              <br />
              {"Retenciones: $" +
                Number(dt.row.Retenciones).toLocaleString("es-US")}
              <br />
              {"Total Neto: $" +
                (Number(dt.row.total) - (sumret + sumDes)).toLocaleString(
                  "es-US"
                )}
              <br />
              {/* {"Tipo de Solcitud: " + dt.row.TipoSolicitud} */}
              {/* <br /> */}
            </label>
          </Grid>

          <Grid item></Grid>
        </Grid>
        <ButtonsAdd
          handleOpen={() => handleOpen(false, null)}
          agregar={permisoAgregarDescuento}
        />
        <MUIXDataGrid columns={columns} rows={dataRow} />
      </ModalForm>

      {openModalDes ? (
        <Dialog open={openModalDes}>
          <Grid container justifyContent="space-between">
            <DialogTitle>Edición de Descuentos</DialogTitle>
            <Button variant="outlined" onClick={() => handleCloseModal()}>
              <Tooltip title="Salir">
                <CloseIcon color="error" onClick={() => handleCloseModal()} />
              </Tooltip>
            </Button>
          </Grid>
          <DialogContent dividers>
            <Grid container justifyContent="flex-end">
              <label>Tipo: </label>
              <RadioGroup
                row
                aria-label="ringtone"
                name="ringtone"
                value={value}
                onChange={handleChange}
                sx={{ paddingLeft: 2 }}
              >
                <FormControlLabel
                  value={"Anticipo"}
                  key={"Anticipo"}
                  control={<Radio />}
                  label={"Anticipo"}
                />
                <FormControlLabel
                  value={"RecuperacionAdeudos"}
                  key={"RecuperacionAdeudos"}
                  control={<Radio />}
                  label={"Recuperación Adeudos"}
                />
              </RadioGroup>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Grid>
                  <label>Numero: </label>
                  <label>
                    {value == ""
                      ? ""
                      : value == "Anticipo"
                      ? "Proveedor"
                      : "Deudor"}
                  </label>
                </Grid>

                <TextField
                  required
                  disabled
                  margin="dense"
                  id="Proveedor"
                  // label={value == "" ? "" : value == "Anticipo" ? "Proveedor" : "Deudor"}
                  value={
                    value == ""
                      ? ""
                      : value == "Anticipo"
                      ? dt.row.Proveedor
                      : dt.row.Deudor
                  }
                  type="text"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                {value == "RecuperacionAdeudos" ? (
                  <Grid item xs={11.99}>
                    <label> Num. Operación</label>

                    <TextField
                      required
                      // disabled
                      margin="dense"
                      id="NumOperacion"
                      value={numOperacion}
                      type="text"
                      variant="outlined"
                      onChange={(v) => setNumOperacion(v.target.value)}
                      inputProps={{ maxLength: 11 }}
                      InputLabelProps={{ shrink: true }}
                      error={String(Number(numOperacion)) == "NaN"}
                    />
                  </Grid>
                ) : (
                  <>
                    <label> Num. Operación</label>

                    <TextField
                      required
                      // disabled
                      margin="dense"
                      id="NumOperacion"
                      value={numOperacion}
                      type="text"
                      variant="outlined"
                      onChange={(v) => setNumOperacion(v.target.value)}
                      inputProps={{ maxLength: 11 }}
                      InputLabelProps={{ shrink: true }}
                      error={String(Number(numOperacion)) == "NaN"}
                    />
                  </>
                )}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <label>Unidad Responsable</label>
                <TextField
                  required
                  disabled
                  margin="dense"
                  id="uresclave"
                  value={dt.row.uresclave}
                  type="text"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={6}>
                <label> Divisa </label>
                <br />
                <TextField
                  required
                  disabled
                  margin="dense"
                  id="Divisa"
                  value={dt.row.Divisa}
                  type="text"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={4}>
                <label>Descuento Parcial</label>
                <TextField
                  disabled={value == ""}
                  required
                  margin="dense"
                  id="Proveedor"
                  // label="Descuento Parcial"
                  value={desPar}
                  type="text"
                  variant="outlined"
                  onChange={(v) => setDesPar(v.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 30 }}
                  error={String(Number(desPar)) == "NaN"}
                />
              </Grid>
              <Grid item xs={4}>
                <label>Otros Cargos</label>
                <TextField
                  disabled={value == "" || value == "Anticipo"}
                  required
                  margin="dense"
                  id="Proveedor"
                  value={otrosCar}
                  type="text"
                  variant="outlined"
                  onChange={(v) => setOtrosCar(v.target.value)}
                  InputLabelProps={{ shrink: true }}
                  error={String(Number(otrosCar)) == "NaN"}
                  inputProps={{ maxLength: 30 }}
                />
              </Grid>
              <Grid item xs={4}>
                <label>Descuento Total</label>
                <TextField
                  required
                  disabled
                  margin="dense"
                  id="Proveedor"
                  // label="Descuento Total"
                  value={
                    (desPar !== undefined ? Number(desPar) : 0) +
                    Number(otrosCar)
                  }
                  type="number"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            {value == "RecuperacionAdeudos" ? (
              <Grid container item xs={10} paddingBottom={2}>
                <label> Cve. Retención</label>
                {/* <SelectFrag
                  value={value == "RecuperacionAdeudos" ? cveReten : ""}
                  options={cveRetenOp}
                  onInputChange={handleSelectCveRet}
                  placeholder={"Cve. Retención"}
                  label={"Cve. Retención"}
                  disabled={value !== "RecuperacionAdeudos"}
                /> */}
                <FormControl sx={{ width: "100%" }}>
                  <Select
                    value={claveRetencionOp.find(
                      (element) => element.value == claveRet
                    )}
                    options={claveRetencionOp}
                    isDisabled={
                      numOperacion == "" ||
                      numOperacion == "false" ||
                      String(Number(numOperacion)) == "NaN"
                    }
                    isClearable={true}
                    isSearchable={true}
                    backspaceRemovesValue={true}
                    onChange={(v) =>
                      v == null ? onInputChange("") : onInputChange(v)
                    }
                    placeholder={descRet !== "" ? descRet : ""}
                    styles={{
                      menu: (base: any) => ({
                        position: "absolute",
                        paddingLeft: "1rem",
                        zIndex: 500,
                        ...base,
                      }),
                    }}
                  />
                </FormControl>
              </Grid>
            ) : (
              ""
            )}

            <Grid container>
              <label> Descripción del Descuento *Opcional*</label>
              <TextField
                disabled={value == ""}
                margin="dense"
                id="Proveedor"
                value={ComentariosDes}
                type="text"
                fullWidth
                multiline
                rows={4}
                inputProps={{ maxLength: 300 }}
                variant="outlined"
                onChange={(v) => setComentariosDes(v.target.value)}
                // error={!nombreCorto ? true : false}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              className="guardar"
              disabled={
                value.length < 1 ||
                desPar == "0" ||
                numOperacion == "" ||
                numOperacion == "false" ||
                (desPar !== undefined ? Number(desPar) : 0) +
                  (otrosCar !== undefined ? Number(otrosCar) : 0) ==
                  0 ||
                (value == "RecuperacionAdeudos" ? !claveRet : false) ||
                String(Number(desPar)) == "NaN" ||
                String(Number(numOperacion)) == "NaN" ||
                String(Number(otrosCar)) == "NaN" ||
                String(Number(claveRet)) == "NaN"
              }
              onClick={handleAplicarDescuento}
            >
              Aplicar
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        ""
      )}
    </>
  );
};
