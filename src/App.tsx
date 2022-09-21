import React, { useEffect } from "react";
import { useReducer } from "react";
import "./App.css";
import { AuthContext } from "./app/views/store/contexts/AuthContext";
import { AppRouter } from "./app/router/AppRouter";
import { authReducer } from "./app/views/store/reducers/authReducer";
import { getUser } from "./app/services/localStorage";
import { isAuthenticated } from "./app/services/authenticationService";
import Validacion from "./app/views/components/Validacion";
import { useLocation, useParams } from "react-router-dom";
import { UserServices } from "./app/services/UserServices";
import { Alert } from "./app/helpers/Alert";




function App() {
  const log = true; //isAuthenticated();
  
  const verificatoken = (token: string) => {
    UserServices.verify({}, token).then((res) => {

      if (res.status === 200) {
        localStorage.setItem("validation", "true");
      }else if(res.status === 401){
        Alert.fire({
          title: "Error!",
          text: res.data.msg,
          icon: "error",
        });
      }

      console.log(res);
    });
  };


  const query = new URLSearchParams(useLocation().search);
  const jwt = query.get('jwt');
 

  useEffect(() => {
  
    verificatoken( String(jwt));
  }, []);

  return (
    <div>
      {/* //<AuthContext.Provider value={{ user, dispatchUser }}> */}

      {log ? <AppRouter /> : <Validacion />}
    </div>

    // //</AuthContext.Provider>
  );
}

export default App;
