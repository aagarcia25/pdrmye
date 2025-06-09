import { ModalCorreoEditable } from "../../componentes/ModalEnvioCorreoFederacion";
import axios from "axios";

const workflow = () => {
  console.log("workflow");
}

const NewNotificacionFederacion = () => {
    return (
      <div>
        <ModalCorreoEditable
          handleClose={() => {}}
          handleAccion={workflow}
        />
      </div>
    );
  }

  export const estatusEnvioCorreoFederacion = async (obj: any) => {
    const response = await axios.post(process.env.REACT_APP_APPLICATION_BASE_URL + 'estatusEnvioCorreoFederacion', obj);
    return response;
  }

  export default NewNotificacionFederacion;