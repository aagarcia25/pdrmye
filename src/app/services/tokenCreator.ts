

export const getHeaderInitial = async function () {
  return {
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With':'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
    },
  };

};


export const getHeaderInfo = async function () {
  //let token = await getAccessToken();
  return {
    headers: {
      'Content-Type': 'application/json',
     // 'Authorization': 'Bearer  ' +  token?.replaceAll('"',''),
      'X-Requested-With':'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
    },
  };
  
};

export const getFormDataHeader = async function () {
 // let token = await getAccessToken();
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
   //   'Authorization': 'Bearer  ' +  token?.replaceAll('"',''),
      'Access-Control-Allow-Origin': '*',
    },
  };
  
};