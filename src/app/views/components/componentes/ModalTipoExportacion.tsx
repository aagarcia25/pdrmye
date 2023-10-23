import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReportesServices } from "../../../services/ReportesServices";
import { AlertS } from "../../../helpers/AlertS";
import ItipoExportacion from "../../../interfaces/Reportes/Ireportes";

const ModalTipoExportacion = ({ vrows }: { vrows: any }) => {
  const [listItem, SetListaItem] = useState<ItipoExportacion[]>([]);

  const handleRel = (data: any) => {
    ReportesServices.relacionaTipoExportacion(data).then((res) => {
      if (res.SUCCESS) {
        //  SetListaItem(res.RESPONSE);
        gettiposExportacion();
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const gettiposExportacion = () => {
    let data = {
      IDREPORTE: vrows.id,
    };
    ReportesServices.handleTipoExportacion(data).then((res) => {
      if (res.SUCCESS) {
        SetListaItem(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    gettiposExportacion();
  }, []);

  return (
    <div>
      <FormGroup>
        {listItem.map((it) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={it.habilitada > 1 ? true : false}
                  onChange={() =>
                    handleRel({
                      NUMOPERACION: it.habilitada > 1 ? true : false,
                      IDREPORTE: vrows.id,
                      IDTIPOEXP: it.id,
                    })
                  }
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={it.Descripcion}
            />
          );
        })}
      </FormGroup>
    </div>
  );
};

export default ModalTipoExportacion;
