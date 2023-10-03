import { api } from '@/services/api';
import { useAuth } from './useAuth';
import { setCookie } from 'nookies';


export function useRefreshToken() {

  const {refreshToken} = useAuth();

  const getNewToken = async () => {
    console.log('TOKEN NO SCOPO', refreshToken) 

    const {data: { access: token }} = await api.post('/authors/api/token/refresh/', {refresh: refreshToken})

    console.log(token)
  
    setCookie(undefined, 'helpdeskauth.token', token)
  
    return token
  
  }

  return getNewToken

}