const env = {

  
  development: {
    BASE_URL: 'http://10.210.0.27:80/api/Api_AdSisUs/',
    BASE_URL_EXT: 'http://10.210.0.27:3000/api/',
    BASE_URL_LOGIN: 'http://10.210.0.28/'
    },

    test: {
    BASE_URL: 'http://10.210.0.27:80/api/Api_AdSisUs/',
    BASE_URL_EXT: 'http://10.210.0.27:3000/api/',
    BASE_URL_LOGIN: 'http://10.210.0.28/'
    },

    production: {
    BASE_URL: 'http://10.210.0.27:80/api/Api_AdSisUs/',
    BASE_URL_EXT: 'http://10.210.0.27:3000/api/',
    BASE_URL_LOGIN: 'http://10.210.0.28/'

    },
    

  
   
  };

 

  export const env_var = env[process.env.NODE_ENV];
