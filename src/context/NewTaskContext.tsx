import { createContext, useState, useEffect } from 'react';

export const NewTaskContext = createContext({});

export function NewTaskProvider({ children }){
  const [type, setType] = useState("")

  return(
    <NewTaskContext.Provider value={{type, setType}}>
      {children}
    </NewTaskContext.Provider>
  )
}
