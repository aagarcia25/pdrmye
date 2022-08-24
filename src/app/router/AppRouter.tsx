import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/LoginPage";
import CalendarC from "../component/CalendarC";
import ListNotificacion from "../component/ListNotificacion";
import HomePage from "../pages/HomePage";

import { isAuthenticated } from "../services/authenticationService";



export const AppRouter = () => {
  const log = isAuthenticated();
 
  return (
    <Routes>



        {
          (!log)
           ?  <Route     path="/login"      element={log ? <Navigate to="/" /> : <LoginPage />}/>
           :  <Route        path="/"        element={ <HomePage /> }      />
        }


       {/*Login y Registro */}

      
       {/* App Logueado */}
      




       <Route path="/ListNotification" element={log ? <ListNotificacion /> : <Navigate to="/login" />}></Route> 
       <Route path="/Calendar" element={log ? <CalendarC /> : <Navigate to="/login" />}></Route> 
      
      
      {/* <Route path="/Document" element={<ListDocument />}></Route> */}
      {/* <Route path="/*" element={<Navigate to="/" />}></Route> */}
    
    
    
    </Routes>





  );
};
