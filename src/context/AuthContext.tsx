import { createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router'
import jwt_decode from "jwt-decode";
import { ReactNode } from 'react';
import { api } from '../services/api'
import { toast } from 'react-toastify';

type User = {
  profileImg: string;
  userId: string;
  username: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>
  user: User;
  authError: string | null;
  setAuthError: () => void;
  messages: messagesType
  setMessages: (message:messagesType) => void;
  refreshToken: string | null;
  setRefreshToken: () => void ;
}


type messagesType = [{
  text: string,
  type: string
}] | null;



type SignInData = {
  username: string;
  password: string;
}  | null;

type TokenType = {
  'helpdeskauth.token': string
}


interface AuthProviderType {
  children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderType) {
  const [user, setUser] = useState<User | null>(null);
  const [refreshToken, setRefreshToken ] = useState<string | null>(null)
  const [authError, setAuthError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {

    const { 'helpdeskauth.token': token } = parseCookies()
    
    if (token) {


      if (!refreshToken) {
      destroyCookie(undefined, 'helpdeskauth.token');
      Router.push('/')
      }


      const decodedToken = jwt_decode<TokenType>(token)

      const {profileImg, user_id, username}:User = decodedToken

      setUser(
        {
        profileImg: profileImg, 
        userId: user_id, 
        username: username}
        )

    }
  }, [])

  async function signIn({username, password}: SignInData) {

    await api.post('/authors/api/token/', {
      username: username,
      password: password
    }).then(function (response) {
      const {refresh, access} = response.data;

      console.log('Token OBTIDO', access)

      setCookie(undefined, 'helpdeskauth.token', access, {
        maxAge: 60 * 60 * 1 // 1 hour
      })

      setRefreshToken(refresh)

      const {profileImg, user_id: userId, username}:User = jwt_decode(access)

      setUser(
        {
        profileImg: profileImg, 
        userId: userId, 
        username: username}
        )
      
      Router.push('/dashboard')
      toast.success('Login efetuado com sucesso!')
      
        
    }).catch(
      function(obj){

        if(obj.response.status  && obj.response.status == 400){
          setAuthError('Erro tente novamente')
        }   

        if (obj.response.status == 401) {
          setAuthError(obj.response.data.detail)
        }

        toast.error('Erro ao efetuar login.')
        toast.warning('Verifique login e senha.')
        
      }
    )
  }
  
  return(
    <AuthContext.Provider value={{user, isAuthenticated, signIn, authError, setAuthError, refreshToken, setRefreshToken}}>
      {children}
    </AuthContext.Provider>
  )
}