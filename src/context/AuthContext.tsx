import { createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router'
import axios from 'axios';
import jwt_decode from "jwt-decode";

import { api } from '../services/api'

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

  const isAuthenticated = !!user;

  useEffect(() => {

    const { 'helpdeskauth.token': token } = parseCookies()

    if (token) {

      setUser(jwt_decode(token))

    }

  }, [])

  async function signIn({username, password}: SignInData) {

    

    await api.post('/authors/api/token/', {
      username: username,
      password: password
    }).then(function (response) {
      const {refresh, access} = response.data;

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
    }).catch(
      function(obj){

        console.log(obj.response)
        console.log(obj.response.status)

        if (obj.response.status == 401) {
          console.log(obj.response.data.detail)
          setAuthError(obj.response.data.detail)
        }
        
      }
    )

    Router.push('/dashboard')
  
  }
  
  return(
    <AuthContext.Provider value={{user, isAuthenticated, signIn, authError, setAuthError}}>
      {children}
    </AuthContext.Provider>
  )
}