import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import './quill-bubble-custom.css';
import dynamic from 'next/dynamic';
import {DropDownSelect} from '../DropDownSelect'
import { useForm, FormProvider, Controller } from 'react-hook-form';
import React from 'react'
import { api } from '@/services/api';
import { useMutation, useQuery } from 'react-query';


const Editor = dynamic(() => import('./editor'), {
  ssr: false
});

export function NewTask() {
  const [editorContent, setEditorContent] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const methods = useForm();
  const { register, handleSubmit, control, setValue } = methods;

  const {mutate, isLoading: postLoading} = useMutation('CreateTicket', async (data) => {
    const response = await api.post('/api/tarefa/create/', data)
    return response.data
  }
  )

  const {data: tipes} = useQuery('tipes', async () => {
    const response = await api.get('/api/tarefa/tipes/')
    return response.data
  },
  {
    refetchOnWindowFocus: false,
  }
  )


  useEffect(() => {
    if(!postLoading){
      setOpenForm(false)
    }

  },
  [postLoading]
  )

  function CreateTask(data){
    console.log(data);
    mutate(data)
  }

  const handleEditorChange = (html) => {
    setEditorContent(html);
    setValue("description", html);
  };

  return(

    <>
      { !openForm &&
        <div 
        className='fixed bottom-5 right-5 bg-white px-7 py-2 border border-border-default rounded-lg shadow-md cursor-pointer'
        onClick={() => setOpenForm(true)}
        
        >
          <h2 className='text-lg text-primary-formedica font-medium'>Abrir Ticket</h2>
        </div>
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
        className='fixed flex  justify-center items-center bottom-0 right-0 left-0 top-0 bg-[#00000070]  px-7 py-2 border border-border-default rounded-lg shadow-md'>
          <motion.form
          onSubmit={handleSubmit(CreateTask)}
          className='w-1/3 h-3/4 bg-white rounded-md shadow-md border text-sm border-border-default py-5 px-8 space-y-4' 
          initial={{  
            x: 2000,
            y: 1000,           
            opacity: 0, 
            scale: 0 
          }}
          animate={{
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
          }} 
          transition={{
            duration: 0.5
          }}
          exit={{
            x: 1000,
            y: 500,
            opacity: 0, 
            scale: 0
          }}
          >
            <FormProvider {...methods}>
              <h2 className='text-xl font-medium'>Abrir Ticket</h2>

              <div className='flex flex-col space-y-2'>
                <label 
                htmlFor=""
                className='text-sm text-gray-500'
                
                >Título</label>
                <input 
                type="text"
                className='py-1 px-3 h-8 w-96 rounded-md border border-border-default shadow-sm'
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

              <div className='flex gap-2 justify-end'>
                <button className='px-5 py-1 rounded-md'
                onClick={(e) => {
                  e.preventDefault()
                   setOpenForm(false)
                  }}
                >
                  Cancelar
                </button>
                <button className='px-5 py-1 rounded-md text-white bg-primary-formedica flex' disabled={postLoading}>
                  
                  {postLoading ? 
                    <span className=' w-5 h-5 border-2 border-border-default rounded-full border-t-pink-500 animate-spin'></span>
                    : 'Salvar'
                  }
                  


                </button>
              </div>

            </FormProvider>

          </motion.form>
        </motion.div >
      }
      </AnimatePresence>
      
    </>

)
  
}