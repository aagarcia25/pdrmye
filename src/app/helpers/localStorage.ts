export const setTokens = (authRes: any) => {
    localStorage.setItem('user', JSON.stringify(authRes.user));
    localStorage.setItem('access_token', JSON.stringify(authRes.access_token));
    localStorage.setItem('expires_at', JSON.stringify(authRes.expires_at));
  };
  
  export const removeTokens = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
  };
  export const getAccessToken = () => localStorage.getItem('access_token');
  export const getUser = () => localStorage.getItem('user');
  export const setUser = (user: any) => localStorage.setItem('user', JSON.stringify(user));
  export const getRefreshToken = () => localStorage.getItem('expires_at');
  
  export const isAuthenticated = (): boolean => {
    return getAccessToken() ? true : false;
  };