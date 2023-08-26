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

} 

type SignInData = {
  username: string;
  password: string;
} 

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

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

      console.log(response)

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
    })

    Router.push('/dashboard')
  
  }
  
  return(
    <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
      {children}
    </AuthContext.Provider>
  )
}