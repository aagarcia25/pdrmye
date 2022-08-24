import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import AuthState from '../../types/Api_AdSisUs.type';
import { removeTokens, setTokens } from '../../services/localStorage';
import { authenticate } from '../../services/authenticationService';
import { RootState } from '../store';





const  initialState : AuthState = {
status: 'not-authenticated',  
isProcessingRequest: false,
uid: '' ,
email: '' ,
displayName: '' ,
photoURL: '' ,
errorMessage: '' 
} 


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  start:(state ) => {
    return {
      ...state,
      isProcessingRequest: true,
    };
  },
  success:(state , action: PayloadAction<any>) =>{
      return {
        ...state,
        ...action.payload,
        isProcessingRequest: false,
        status: 'authenticated', 
      };
   
  },
  error:(state ,action: PayloadAction<string>)=> {
    return {
      ...state,
      isProcessingRequest: true,
    };
  },
  logout:(state)=>{
    return {
      ...state,
      status: 'not-authenticated', 
      isProcessingRequest: false,
    }
  }



  },
})


export const authenticateUser = (userData: any) => async (dispatch: any) => {
  dispatch(start());
  try {
    const authData = await authenticate(userData);
    setTokens(authData);
    dispatch(success(authData));
   
   
  } catch (e:any) {
    dispatch(error(e.Message));
  }
};


export const logoutUser = () => async (dispatch: any) => {
  dispatch(start());
  try {
    removeTokens();
    dispatch(logout());
    
  } catch (e:any) {
    dispatch(error(e.Message));
  }
};




export const { start, success, error,logout  } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type

export const statusAuth = (state: RootState) => state.auth;

export default authSlice.reducer