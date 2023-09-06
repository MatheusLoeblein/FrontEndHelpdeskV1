import { api } from '@/services/api';
import { useAuth } from './useAuth';
import { setCookie, destroyCookie } from 'nookies';
import { Router } from 'next/router';

export function useRefreshToken() {

  const {refreshToken} = useAuth();

  // if (!refreshToken) {
  //   destroyCookie(undefined, 'helpdeskauth.token');
  //   Router.push('/')
  // }

  const getNewToken = async () => {
    console.log('TOKEN NO SCOPO', refreshToken) 

    const {data: { access: token }} = await api.post('/authors/api/token/refresh/', {refresh: refreshToken})

    console.log(token)
  
    setCookie(undefined, 'helpdeskauth.token', token)
  
    return token
  
  }

  return getNewToken

}