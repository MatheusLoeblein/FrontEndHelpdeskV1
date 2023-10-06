import { createContext, useState, useEffect, useRef } from 'react';

export const NewTaskContext = createContext({});

export function NewTaskProvider({ children }){
  const [type, setType] = useState("")
  const [addtionalData, setAddtionalData] = useState([])
  const [open, setOpen] = useState(false)
  const [editIndex, setEditIndex] = useState(-1);
  const [formError, setFormError] = useState(false);


  useEffect(() => {
    console.log('Objeto', addtionalData)
  }, [addtionalData, setAddtionalData])

  useEffect(() => {
    setAddtionalData("")
    setFormError(false)
  }, [type, setType])

  const requiredFieldsPerType = [
    "Fórmula Certa - (Cadastro Médicos).",
    "FC (Exclusão de Requisições)",
    "Cadastro Novo(a) Colaborador(a)",
  ]


  return(
    <NewTaskContext.Provider value={{
      type, setType, 
      addtionalData, setAddtionalData,
      open, setOpen,
      editIndex, setEditIndex,
      requiredFieldsPerType,
      formError, setFormError
      }}>
      {children}
    </NewTaskContext.Provider>
  )
}
