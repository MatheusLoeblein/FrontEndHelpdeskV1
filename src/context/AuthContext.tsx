import { createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router'
import jwt_decode from "jwt-decode";

import { api } from '../services/api'
import { isNull } from 'util';

type User = {
  profileImg: string;
  userId: string;
  username: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>
  user: User;
  authError: string;
  setAuthError: () => void;
} 

type SignInData = {
  username: string;
  password: string;
} 

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [messages, setMessages] = useState([{}]);

  const isAuthenticated = !!user;

  useEffect(() => {

    const { 'helpdeskauth.token': token } = parseCookies()
    
    if (token) {

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      const {profileImg, user_id, username}:User = jwt_decode(token)

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

      const {profileImg, user_id, username}:User = jwt_decode(access)

      setUser(
        {
        profileImg: profileImg, 
        userId: user_id, 
        username: username}
        )
      
      setMessages([{
            text: "Seja bem vindo! Log in efetuado com sucesso.",
            type: "success"
        }])
      Router.push('/dashboard')
        
    }).catch(
      function(obj){

        if(obj.response.status  && obj.response.status == 400){
          setAuthError('Erro tente novamente')
        }   

        if (obj.response.status == 401) {
          setAuthError(obj.response.data.detail)
        }
        
      }
    )
  }
  
  return(
    <AuthContext.Provider value={{user, isAuthenticated, signIn, authError, setAuthError, messages, setMessages}}>
      {children}
    </AuthContext.Provider>
  )
}