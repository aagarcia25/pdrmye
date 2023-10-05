import { ModalEnviar } from "@jbcecapmex/pakfirma";
import { useParams } from "react-router-dom";
import { USUARIORESPONSE } from "../../../interfaces/user/UserInfo";
import { getToken, getUser } from "../../../services/localStorage";

const EnviarDocumento = () => {
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const { IdDoc } = useParams();
  return (
    <div>
      <ModalEnviar
        IdDoc={IdDoc!}
        IdCentral={String(user.Id)}
        NombreUsuario={String(user.NombreUsuario)}
        jwtToken={String(getToken()).replace(/["']/g, "")}
      />
    </div>
  );
};

export default EnviarDocumento;
