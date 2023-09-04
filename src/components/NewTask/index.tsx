import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import './quill-bubble-custom.css';
import dynamic from 'next/dynamic';
import {DropDownSelect} from '../DropDownSelect'
import { useForm, FormProvider } from 'react-hook-form';
import { api } from '@/services/api';
import { useQuery } from 'react-query';
import { parseCookies } from 'nookies';

import React from 'react'
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

 


const Editor = dynamic(() => import('./editor'), {
  ssr: false
});


const prioridades = [
  {id: 1, name: 'Baixa'},
  {id: 2, name: 'Moderada'},
  {id: 3, name: 'Alta'},
  {id: 4, name: 'Urgente'}
]

export function NewTask() {
  const [openForm, setOpenForm] = useState(false);
  const methods = useForm();
  const { register, handleSubmit } = methods


  const {'helpdeskauth.token': token} = parseCookies();
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  const {data: tipes, isFetching, isLoading} = useQuery('tipes', async () => {
    const response = await api.get('/api/tarefa/tipes/', {headers})

    return response.data
  })

  function CreateTask(data){
    console.log(data);
  }
  
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
                name="tipo"
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
                objects={prioridades}
                width="40"
                />
              </div>

              <div className='flex flex-col space-y-2'>
                <label 
                htmlFor=""
                className='text-sm text-gray-500'
                >Descrição</label>

                <div className='h-100'>
                <Editor 

                    />

                </div>
              </div>

              <div className='flex gap-2 justify-end'>
                <button className='px-5 py-1 rounded-md'
                onClick={() => setOpenForm(false)}
                >
                  Cancelar
                </button>
                <button className='px-5 py-1 rounded-md text-white bg-primary-formedica'>
                  Salvar
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