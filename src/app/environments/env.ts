const env = {

  
  development: {
      BASE_URL: 'http://10.200.4.164:80/api/Api_AdSisUs/',
      BASE_URL_EXT: 'http://10.200.4.164:5000/api/',
      BASE_URL_LOGIN: 'http://10.200.4.165/'
    },

    test: {
      BASE_URL: 'http://10.200.4.164:80/api/Api_AdSisUs/',
      BASE_URL_EXT: 'http://10.200.4.164:5000/api/',
      BASE_URL_LOGIN: 'http://10.200.4.165/'
    },
    

    production: {
      BASE_URL: 'http://10.200.4.164:80/api/Api_AdSisUs/',
      BASE_URL_EXT: 'http://10.200.4.164:5000/api/',
      BASE_URL_LOGIN: 'http://10.200.4.165/'
    },
   
  };

 

  export const env_var = env[process.env.NODE_ENV];
