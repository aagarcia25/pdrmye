"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_router_dom_2 = require("react-router-dom");
var material_1 = require("@mui/material");
var CustomToolbar_1 = require("../../CustomToolbar");
var Toast_1 = require("../../../../../helpers/Toast");
var Alert_1 = require("../../../../../helpers/Alert");
var calculosServices_1 = require("../../../../../services/calculosServices");
var MUIXDataGrid_1 = require("../../../MUIXDataGrid");
var Slider_1 = require("../../../Slider");
var DoneAll_1 = require("@mui/icons-material/DoneAll");
var ArrowBack_1 = require("@mui/icons-material/ArrowBack");
var Send_1 = require("@mui/icons-material/Send");
var Insights_1 = require("@mui/icons-material/Insights");
var CancelPresentation_1 = require("@mui/icons-material/CancelPresentation");
var DetalleFgp = function () {
    var navigate = react_router_dom_2.useNavigate();
    var _a = react_1.useState([]), data = _a[0], setData = _a[1];
    var _b = react_1.useState(""), fondo = _b[0], setFondo = _b[1];
    var _c = react_1.useState(false), openSlider = _c[0], setOpenSlider = _c[1];
    var _d = react_1.useState(false), pa = _d[0], setPa = _d[1];
    var _e = react_1.useState(false), sa = _e[0], setSa = _e[1];
    var _f = react_1.useState(false), ta = _f[0], setTa = _f[1];
    var _g = react_1.useState(false), ca = _g[0], setCa = _g[1];
    var _h = react_1.useState(false), ad = _h[0], setAd = _h[1];
    var _j = react_1.useState(false), as = _j[0], setAs = _j[1];
    var _k = react_1.useState(false), aa = _k[0], setAa = _k[1];
    var _l = react_1.useState(false), rf = _l[0], setRf = _l[1];
    var _m = react_1.useState(false), cf = _m[0], setCf = _m[1];
    var _o = react_1.useState(false), ae = _o[0], setAe = _o[1];
    var _p = react_1.useState(false), af = _p[0], setAf = _p[1];
    var handleBack = function (v) {
        navigate("/inicio/participaciones/" + fondo);
    };
    var columnas = function (data) {
        setOpenSlider(true);
        calculosServices_1.calculosServices.getColumns(data).then(function (res) {
            if (res.SUCCESS) {
                var cl = res.RESPONSE;
                cl.map(function (item) {
                    console.log(item.keys);
                    switch (item.keys) {
                        case 0:
                            break;
                        case 1:
                            setPa(true);
                            break;
                        case 2:
                            setSa(true);
                            break;
                        case 3:
                            setTa(true);
                            break;
                        case 4:
                            setCa(true);
                            break;
                        case 5:
                            setAd(true);
                            break;
                        case 6:
                            setAa(true);
                            break;
                        case 7:
                            setAs(true);
                            break;
                        case 8:
                            setRf(true);
                            break;
                        case 9:
                            setCf(true);
                            break;
                        case 10:
                            setAe(true);
                            break;
                        case 11:
                            setAf(true);
                            break;
                        default:
                            break;
                    }
                });
                setOpenSlider(false);
            }
            else {
                setOpenSlider(false);
                Alert_1.Alert.fire({
                    title: "Error!",
                    text: res.STRMESSAGE,
                    icon: "error"
                });
            }
        });
    };
    var consulta = function (data) {
        setOpenSlider(true);
        calculosServices_1.calculosServices.calculosInfodetalle(data).then(function (res) {
            if (res.SUCCESS) {
                Toast_1.Toast.fire({
                    icon: "success",
                    title: "Consulta Exitosa!"
                });
                setData(res.RESPONSE);
                setOpenSlider(false);
            }
            else {
                setOpenSlider(false);
                Alert_1.Alert.fire({
                    title: "Error!",
                    text: res.STRMESSAGE,
                    icon: "error"
                });
            }
        });
    };
    var columns = [
        { field: "id", headerName: "Identificador", width: 150, hide: true },
        {
            field: "ClaveEstado",
            headerName: "Clave Estado",
            width: 150,
            description: "Identificador del Municipio"
        },
        {
            field: "Nombre",
            headerName: "Municipio",
            width: 150,
            description: "Nombre del Municipio"
        },
        __assign({ field: "Mensual", headerName: "Importe", width: 150, description: "Importe" }, CustomToolbar_1.Moneda),
        __assign({ hide: pa ? false : true, field: "PrimerAjuste", headerName: "Primer Ajuste", width: 150, description: "Importe" }, CustomToolbar_1.Moneda),
        __assign({ hide: sa ? false : true, field: "SegundoAjuste", headerName: "Segundo Ajuste", width: 150, description: "Importe" }, CustomToolbar_1.Moneda),
        __assign({ hide: ta ? false : true, field: "TercerAjuste", headerName: "Tercer Ajuste", width: 150, description: "Importe" }, CustomToolbar_1.Moneda),
        __assign({ hide: ca ? false : true, field: "CuartoAjuste", headerName: "Cuarto Ajuste", width: 150, description: "Importe" }, CustomToolbar_1.Moneda),
        __assign({ hide: ad ? false : true, field: "AjusteAnual", headerName: "Ajuste Anual", width: 150, description: "Importe" }, CustomToolbar_1.Moneda),
        __assign({ hide: as ? false : true, field: "AjusteSemestral", headerName: "Ajuste Semestral", width: 150, description: "Importe" }, CustomToolbar_1.Moneda),
        __assign({ hide: aa ? false : true, field: "AjusteDefinitivo", headerName: "Ajuste Definitivo", width: 150, description: "Importe" }, CustomToolbar_1.Moneda),
        __assign({ hide: ae ? false : true, field: "AjusteEstatal", headerName: "Ajuste Estatal", width: 150, description: "Importe" }, CustomToolbar_1.Moneda),
        __assign({ hide: rf ? false : true, field: "CompensacionFEIF", headerName: "Compensación FEIF", width: 150, description: "Compensación FEIF" }, CustomToolbar_1.Moneda),
        __assign({ hide: cf ? false : true, field: "RetencionFEIF", headerName: "Retención FEIF", width: 150, description: "Retención FEIF" }, CustomToolbar_1.Moneda),
        __assign({ hide: af ? false : true, field: "AjusteFofir", headerName: "Ajuste FOFIR", width: 150, description: "Ajuste FOFIR" }, CustomToolbar_1.Moneda),
        __assign({ field: "total", headerName: "Total", width: 150, description: "Total" }, CustomToolbar_1.Moneda),
    ];
    var params = react_router_dom_1.useParams();
    react_1.useEffect(function () {
        setFondo(String(params.fondo));
        setTimeout(function () {
            columnas({ IDCALCULOTOTAL: params.id });
            consulta({ IDCALCULOTOTAL: params.id });
        }, 2000);
    }, []);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(material_1.Box, null,
            react_1["default"].createElement(Slider_1["default"], { open: openSlider }),
            react_1["default"].createElement(material_1.Box, { sx: {} },
                react_1["default"].createElement(material_1.ToggleButtonGroup, { color: "primary", exclusive: true, "aria-label": "Platform" },
                    react_1["default"].createElement(material_1.Tooltip, { title: "Regresar" },
                        react_1["default"].createElement(material_1.ToggleButton, { value: "check", onClick: function () { return handleBack(1); } },
                            react_1["default"].createElement(ArrowBack_1["default"], null))),
                    react_1["default"].createElement(material_1.Tooltip, { title: "Autorizar" },
                        react_1["default"].createElement(material_1.ToggleButton, { value: "check", onClick: function () { return handleBack(1); } },
                            react_1["default"].createElement(DoneAll_1["default"], null))),
                    react_1["default"].createElement(material_1.Tooltip, { title: "Cancelar" },
                        react_1["default"].createElement(material_1.ToggleButton, { value: "check", onClick: function () { return handleBack(1); } },
                            react_1["default"].createElement(CancelPresentation_1["default"], null))),
                    react_1["default"].createElement(material_1.Tooltip, { title: "Enviar" },
                        react_1["default"].createElement(material_1.ToggleButton, { value: "check", onClick: function () { return handleBack(1); } },
                            react_1["default"].createElement(Send_1["default"], null))),
                    react_1["default"].createElement(material_1.Tooltip, { title: "Ver Trazabilidad" },
                        react_1["default"].createElement(material_1.ToggleButton, { value: "check", onClick: function () { return handleBack(1); } },
                            react_1["default"].createElement(Insights_1["default"], null))))),
            react_1["default"].createElement(MUIXDataGrid_1["default"], { columns: columns, rows: data }))));
};
exports["default"] = DetalleFgp;
