import { TablaDocs } from "@jbcecapmex/pakfirma";
import { USUARIORESPONSE } from "../../../interfaces/user/UserInfo";
import { getToken, getUser } from "../../../services/localStorage";
export const BandejaPorEnviar = () => {
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  return (
    <div>
      <TablaDocs
        TipoBandeja={"Por enviar"}
        IdTipoBandeja={"ac4967f0-bdc8-11ed-afa1-0242ac120002"}
        PathEnvia={"../enviar/"}
        jwtToken={String(getToken()).replace(/["']/g, "")}
        IdCentral={String(user.Id)}
        IdApp="973ecf89-38ff-11ed-aed0-040300000000"
      />
    </div>
  );
};
