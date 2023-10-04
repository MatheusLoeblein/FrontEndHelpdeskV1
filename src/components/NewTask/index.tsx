import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import './quill-bubble-custom.css';
import dynamic from 'next/dynamic';
import {DropDownSelect} from '../DropDownSelect'
import { useForm, FormProvider, Controller } from 'react-hook-form';
import React from 'react'
import { usePrivateApi } from '@/hooks/usePrivateApi';
import { useMutation, useQuery } from 'react-query';
import { AuthContext } from '@/context/AuthContext';
import { TaskFields, handleEdit } from "../TaskFields"
import { NewTaskContext } from '@/context/NewTaskContext';
import { MdModeEditOutline } from 'react-icons/md'
import { IoMdClose, IoMdAddCircle } from 'react-icons/io'
import { Turret_Road } from 'next/font/google';

const Editor = dynamic(() => import('./editor'), {
  ssr: false
});

export function NewTask() {
  const [editorContent, setEditorContent] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const {setMessages} = useContext(AuthContext)
  const { addtionalData, setEditIndex, setAddtionalData, setOpen } = useContext(NewTaskContext)
  
  const methods = useForm();
  const { register, handleSubmit, control, setValue } = methods;

  const {mutate, isLoading: postLoading, isSuccess, data: teste} = useMutation('CreateTicket', async (data) => {
    const response = await api.post('/api/tarefa/create/', data)
    
    return response.data
  }
  )
  const api = usePrivateApi()
  const {data: tipes} = useQuery('tipes', async () => {
    const response = await api.get('/api/tarefa/tipes/')
    return response.data
  },
  {
    refetchOnWindowFocus: false,
  }
  )

  useEffect(() => {
    if(!postLoading && isSuccess){
      setOpenForm(false)
      if (isSuccess){
        setMessages([{
          text: "Ticket criado com sucesso!",
          type: "success"
        }])
      }
    }

  },
  [postLoading, isSuccess, setMessages]
  )

  function CreateTask(data){
    console.log(data);
    mutate(data)
    console.log(teste)
  }

  const handleEditorChange = (html) => {
    setEditorContent(html);
    setValue("description", html);
  };

  return(

    <>
      { !openForm &&
        <motion.div 
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className='fixed bottom-10 right-10 bg-white px-7 py-2 border border-border-default rounded-lg shadow-md cursor-pointer'
        onClick={() => setOpenForm(true)}
        
        >
          <h2 className='text-lg text-primary-formedica font-medium'>Abrir Ticket</h2>
        </motion.div>
      }
      <AnimatePresence>
      {
        
        openForm &&


        <motion.div 
          initial={{             
            opacity: 0,

          }}
          animate={{
            opacity: 1,
          }} 

          exit={{
            opacity: 0, 
          }}
        className='fixed flex justify-center items-center bottom-0 right-0 left-0 top-0 bg-[#0000006b] backdrop-opacity-100 backdrop-blur-lg px-7 py-2 border border-border-default rounded-lg shadow-md'>
          
          <div className='flex flex-row m-auto space-x-5'>

          <motion.form
          onSubmit={handleSubmit(CreateTask)}
          className=''
          >
            <FormProvider {...methods}>
              <motion.div
                className='w-[550px]   bg-white rounded-md shadow-md border text-sm border-border-default py-5 px-8 space-y-4' 
                initial={{          
                  opacity: 0, 
                  scale: 0 
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }} 
                exit={{
                  opacity: 0, 
                  scale: 0,
                }}
              >
              <h2 className='text-xl font-medium'>Abrir Ticket </h2>

              <div className='flex flex-col space-y-2'>
                <label 
                htmlFor=""
                className='text-sm text-gray-500'
                
                >Título</label>
                <input 
                type="text"
                className='py-1 px-3 h-8 w-96 rounded-md border border-border-default shadow-sm outline-primary-formedica outline-1'
                {...register('titulo') }
                />
              </div>

              <div className='flex flex-col space-y-2'>
                <label 
                htmlFor=""
                className='text-sm text-gray-500'
                >Tipo</label>

                <DropDownSelect 
                name="tipe"
                objects={tipes}
                width="80"
                registerSelected={true}
                />
              </div>

              <div className='flex flex-col space-y-2'>
              <label 
              htmlFor=""
              className='text-sm text-gray-500'
              >Prioridade</label>
                <DropDownSelect 
                name="prioridade"
                objects={  
                [{id: 1, name: 'Baixa'},
                {id: 2, name: 'Moderada'},
                {id: 3, name: 'Alta'},
                {id: 4, name: 'Urgente'}]
              }
                width="40"
                />
              </div>

              <div className='flex flex-col space-y-2'>
                <label 
                htmlFor=""
                className='text-sm text-gray-500'
                >Descrição</label>

                <div className='h-64'>

                <div className='h-52'>
                  <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={() => (
                    <Editor onEditorChange={handleEditorChange} />
                  )}
                  />
                </div>

                </div>
              </div>

              <div className='border-b border-b-border-default'>
                <div className='flex justify-between'>
                  <span>Medicos </span>
                  <motion.div 
                      className=' w-7 h-7 border border-border-default rounded-md shadow-md p-1 flex justify-center items-center text-primary-formedica cursor-pointer'
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      onClick={() => setOpen(true)}
                    >
                  <IoMdAddCircle size={20}/>
                  </motion.div>
                </div>


                <div className='grid grid-cols-2 py-2 max-w-full text-xs gap-2'>
                    {
                      addtionalData.map((data, index) => {
                        return(
                          <div className='flex flex-row border border-border-default rounded-md shadow-md justify-between' key={index}>
                            <span className='border-r border-r-border-default py-1 px-2'>CRM</span>
                            <span className='py-1 px-2'>{data.crm}</span>
                            <div className='flex justify-center items-center py-1 px-2 space-x-2'>
                              <motion.span 
                              className=' text-primary-formedica'
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              onClick={() => setEditIndex(index)}
                              ><MdModeEditOutline size={15}/></motion.span>
                              <motion.span 
                              className='text-red-500'
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              onClick={() => {
                                const updatedData = [...addtionalData];
                                updatedData.splice(index, 1);
                                setAddtionalData(updatedData);
                              }}
                              >
                              <IoMdClose size={15}/></motion.span>
                              
                            </div>
    
                          </div>
                        )
                      })
                    }
                </div>
              </div>

              <div className='flex gap-2 justify-end'>
                <motion.button className='px-5 py-1 rounded-md'
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={(e) => {
                  e.preventDefault()
                  setOpenForm(false)
                  }}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className='px-5 py-1 rounded-md text-white bg-primary-formedica flex' disabled={postLoading}>
                  
                  {postLoading ? 
                    <span className=' w-5 h-5 border-2 border-border-default rounded-full border-t-pink-500 animate-spin'></span>
                    : 'Salvar'
                  }
                  


                </motion.button>
              </div>
              </motion.div>
            </FormProvider>
          </motion.form>


          <TaskFields/>
          </div>


        </motion.div >

      }
      </AnimatePresence>
      
    </>

)
  
}