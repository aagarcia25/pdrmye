import {  Navigate, Route,  Routes } from 'react-router-dom';
import { Login } from '../views/auth/LoginPage';


export const AuthRouter = () => {
  return (
    <Routes>
        <Route path="login" element={ <Login /> } />
        <Route path="/*" element={ <Navigate to="/auth/login/" />} /> 
    </Routes>
  )
}