import {  Navigate, Route,  Routes } from 'react-router-dom';
import { Login } from '../views/auth/LoginPage';
import App from '../../App';

export const AuthRouter = () => {
  return (
    <Routes>
      <App/>
    </Routes>
  )
}