import { getAccessToken } from "../services/localStorage";


export const getHeaderInitial = async function () {
  return {
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With':'XMLHttpRequest'
    },
  };

};


export const getHeaderInfo = async function () {
  let token = await getAccessToken();
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  ' +  token?.replaceAll('"',''),
      'X-Requested-With':'XMLHttpRequest'
    },
  };
  
};

export const getFormDataHeader = async function () {
  let token = await getAccessToken();
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer  ' +  token?.replaceAll('"',''),
    },
  };
  
};