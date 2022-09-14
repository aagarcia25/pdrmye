import React from "react";

export default function Form() {
  const [values, setValues] = React.useState({
    pobladores: "",
    password: "",
  });
  function handleSubmit(evt:any) {
    /*
      Previene el comportamiento default de los
      formularios el cual recarga el sitio
    */
    evt.preventDefault();
    // Aquí puedes usar values para enviar la información
  }
  function handleChange(evt:any) {
    /*
      evt.target es el elemento que ejecuto el evento
      name identifica el input y value describe el valor actual
    */
    const { target } = evt;
    const { name, value } = target;
    /*
      Este snippet:
      1. Clona el estado actual
      2. Reemplaza solo el valor del
         input que ejecutó el evento
    */
    const newValues = {
      ...values,
      [name]: value,
    };
    // Sincroniza el estado de nuevo
    setValues(newValues);
  }
  return (
    <form onSubmit={handleSubmit}>
        <div>
 <p >   
      <input
        
        id="number"
        name="pobladores"
        type="number"
        value={values.pobladores}
        onChange={handleChange}
      />
     </p>
     </div>
    </form>
  );
}