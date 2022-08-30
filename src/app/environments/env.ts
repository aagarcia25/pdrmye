const env = {
  development: {
      BASE_URL: 'http://10.200.4.96:81/api/Api_AdSisUs/'
    },
    test: {
      BASE_URL: 'http://10.200.4.96:81/api/Api_AdSisUs/'
    },
    production: {
      BASE_URL: 'http://10.200.4.96:81/api/Api_AdSisUs/'
    },
  };
  
  export const env_var = env[process.env.NODE_ENV];