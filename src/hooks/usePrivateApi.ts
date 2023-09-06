import { privateApi } from '@/services/api';
import { useRefreshToken } from './useRefreshToken';
import jwt_decode from "jwt-decode";
import { parseCookies } from 'nookies';
import { useEffect } from 'react';

type tokenExpType = {
  exp: number;
}
export function usePrivateApi(){

  const getNewToken = useRefreshToken()
  
  useEffect(() => {
    const requestInteceptor = privateApi.interceptors.request.use(async function (config){

      const { 'helpdeskauth.token': token } = parseCookies();
    
      let newToken;
    
      if (token) {
    
          const {exp}:tokenExpType = jwt_decode(token)
    
          console.log("TOKEN EXPIRADO?", isTokenExpired(exp))
    
          if(isTokenExpired(exp)){
            newToken = await getNewToken()
          }
          config.headers['Authorization'] = `Bearer ${newToken ? newToken : token}`;
        }
    
      return config
    });

    return () => {
      privateApi.interceptors.request.eject(requestInteceptor)
    }
    
  },[])

  function isTokenExpired(expTime: number){
  
    const currentTime = Math.floor(Date.now() / 1000);
    return expTime < currentTime
  
  }
  return privateApi
}

