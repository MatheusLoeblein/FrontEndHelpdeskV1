import { useEffect, useContext } from 'react';
import { NewTaskContext } from '@/context/NewTaskContext';

import { NewMed } from './NewMed';
import { NewColab } from './NewColab';
import { DelReq } from './DelReq';

export function TaskFields() {
  const context = useContext(NewTaskContext);
  const {
    type, 
    addtionalData, setAddtionalData,
    open, setOpen,
    editIndex, setEditIndex,
  } = context

  const formTypes = {
    "Fórmula Certa - (Cadastro Médicos).": <NewMed/>,
    "Cadastro Novo(a) Colaborador(a)": <NewColab/>,
    "FC (Exclusão de Requisições)": <DelReq/>,
  }

  useEffect(() => {
    setOpen(type in formTypes)
    setEditIndex(-1)
  }, [type])

  useEffect(() => {
    if(editIndex != -1){
      setOpen(true);
    }
  }, [editIndex])

  return(
    open && formTypes[type]
  )
}