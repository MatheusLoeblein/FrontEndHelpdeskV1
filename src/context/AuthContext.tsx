import { createContext } from 'react'

type AuthContextType = {
  isAuthenticated: boolean;
} 

type SignInData = {
  username: string;
  password: string;
} 

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}) {

  const isAuthenticated = false;

  async function signIn({username, password}: SignInData) {

    await fetch('http://127.0.0.1:8000/authors/api/token/', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))

    
  }
  return(
    <AuthContext.Provider value={{isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )
}