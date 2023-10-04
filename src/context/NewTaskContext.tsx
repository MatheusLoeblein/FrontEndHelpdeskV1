import { createContext, useState, useEffect, useRef } from 'react';

export const NewTaskContext = createContext({});

export function NewTaskProvider({ children }){
  const [type, setType] = useState("")
  const [addtionalData, setAddtionalData] = useState([])
  const [open, setOpen] = useState(false)
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    console.log('Objeto', addtionalData)
  }, [addtionalData, setAddtionalData])
  
  return(
    <NewTaskContext.Provider value={{
      type, setType, 
      addtionalData, setAddtionalData,
      open, setOpen,
      editIndex, setEditIndex
      }}>
      {children}
    </NewTaskContext.Provider>
  )
}
