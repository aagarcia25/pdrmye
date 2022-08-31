const env = {
  development: {
      BASE_URL: 'http://127.0.0.1:8000/api/Api_AdSisUs/'
    },
    test: {
      BASE_URL: 'http://127.0.0.1:8000/api/Api_AdSisUs/'
    },
    production: {
      BASE_URL: 'http://127.0.0.1:8000/api/Api_AdSisUs/'
    },
  };
  
  export const env_var = env[process.env.NODE_ENV];