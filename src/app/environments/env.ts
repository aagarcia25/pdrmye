const env = {
  development: {
      BASE_URL: 'http://10.200.4.165:3002/api/Api_AdSisUs/',
      BASE_URL_EXT: 'http://10.200.4.164:5000/api/'
    },
    test: {
      BASE_URL: 'http://10.200.4.165:3002/api/Api_AdSisUs/',
      BASE_URL_EXT: 'http://10.200.4.164:5000/api/'
    },
    production: {
      BASE_URL: 'http://10.200.4.165:3002/api/Api_AdSisUs/',
      BASE_URL_EXT: 'http://10.200.4.164:5000/api/'
    },
  };
  
  export const env_var = env[process.env.NODE_ENV];