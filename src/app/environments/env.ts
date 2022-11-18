const env = {

  
  development: {
      BASE_URL: 'http://10.200.4.105:80/api/Api_AdSisUs/',
      BASE_URL_EXT: 'http://10.200.4.105:5000/api/',
      BASE_URL_LOGIN: 'http://10.200.4.106/'
    },

    test: {
      BASE_URL: 'http://10.200.4.164:80/api/Api_AdSisUs/',
      BASE_URL_EXT: 'http://10.200.4.164:5000/api/',
      BASE_URL_LOGIN: 'http://10.200.4.105:5000/api/'
    },
    

    production: {
      BASE_URL: 'http://10.200.4.105:80/api/Api_AdSisUs/',
      BASE_URL_EXT: 'http://10.200.4.105:5000/api/',
      BASE_URL_LOGIN: 'http://10.200.4.106/'
    },
   

  };

 

  export const env_var = env[process.env.NODE_ENV];