import { useState, useRef, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import dynamic from 'next/dynamic';
import {DropDownSelect} from '../DropDownSelect'
import { useForm, FormProvider, Controller } from 'react-hook-form';
import React from 'react'
import { usePrivateApi } from '@/hooks/usePrivateApi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AuthContext } from '@/context/AuthContext';
import { TaskFields } from "../TaskFields"
import { NewTaskContext } from '@/context/NewTaskContext';
import { LayoutContext } from '@/context/LayoutContext'; 
import { MiniMenu } from '../TaskFields/MiniMenu';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { BurredBackground } from '../BurredBackground'
import { BiTask } from 'react-icons/bi'
import { toast } from 'react-toastify';
import { FileUploader } from '../FileInput'
import { read } from 'fs';
import Router from 'next/router';

const Editor = dynamic(() => import('../Editor'), {
  ssr: false
});

export function NewTask() {
  const [ openForm, setOpenForm ] = useState(false);
  const { setMessages } = useContext(AuthContext);
  const { menuOver } = useContext(LayoutContext);
  const toastId = useRef(null);

  const { addtionalData, 
    setEditIndex, setAddtionalData, 
    setOpen, type, 
    setFormError, formError,
    requiredFieldsPerType
  } = useContext(NewTaskContext)

  function removeHTMLTags(input) {
    return input.replace(/<[^>]*>/g, '');
  }
  
  const schema = object({
    titulo: string().required("Campo obrigatório."),
    description: string()
      .required("Campo obrigatório.")
      .test('minimum-text', 'Descrição deve conter pelo menos 25 caracteres.', (value) => {
        const textWithoutHTML = removeHTMLTags(value);
        return textWithoutHTML.length >= 25;
      })
  });
  
  const methods = useForm(
    {
      resolver: yupResolver(schema)
    }
  );

  const { register, handleSubmit, control, setValue, formState: { errors }, clearErrors, reset } = methods;

  const api = usePrivateApi()
  const queryClient = useQueryClient()

  const { mutate, isLoading: postLoading, isSuccess, data:ticket } = useMutation(
    'CreateTicket',
    async (data) => {
      toastId.current = toast.loading('Criando ticket...')
      const response = await api.post('/api/tarefa/create/', data)
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tickets');
        toast.update(toastId.current, {
          render: "Ticket criado com sucesso!",
          type: "success",
          isLoading: false,
          closeButton: true,
          autoClose: true
      })
        setOpenForm(false)
      },

      onError: () => {
        toast.update(toastId.current, {
          render: "Erro ao criar ticket",
          type: "error",
          isLoading: false,
          closeButton: true,
          autoClose: true
      })
      }
    }
  );

  useEffect(() => {
    if(isSuccess && ticket?.id){
       Router.push(`/ticket/${ticket.id}`)
    }
  }, [isSuccess, ticket?.id])


  const {data: tipes} = useQuery('tipes', async () => {
    const response = await api.get('/api/tarefa/tipes/')
    return response.data
  },
  {
    refetchOnWindowFocus: false,    
  }
  )

  function CreateTask(data){

    const formData = new FormData();

    if(data.file && data.file.length > 0){
      formData.append('file', data.file[0]);
    }

    formData.append('titulo', data.titulo);
    formData.append('tipe', data.tipe);
    formData.append('prioridade', data.prioridade);
    formData.append('description', data.description);

    if(requiredFieldsPerType.includes(type)){
      if(addtionalData.length >= 1){
        formData.append('addtionalData', JSON.stringify(addtionalData))
        console.log(addtionalData)
      }else{
        setFormError(true)
        return
      }
    }

    mutate(formData)
  }

  const handleEditorChange = (html) => {
    setValue("description", html);
  };

  return(

    <>
      { !openForm &&
        <motion.div 
        initial={{scale: 0}}
        animate={{scale: 1}}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className='fixed bottom-10 right-10 bg-white px-7 py-2 border border-border-default rounded-lg shadow-md cursor-pointer'
        onClick={() => setOpenForm(true)}
        >
          <h2 className='flex space-x-4 items-center text-lg text-primary-formedica font-medium'>
          <span>
            Abrir Ticket
          </span>
          <BiTask/>
          </h2>
        </motion.div>
      }
      <AnimatePresence>
      {
        
        openForm &&

        <BurredBackground>
          <div className='flex flex-row m-auto space-x-5'>

          <motion.form
          onSubmit={handleSubmit(CreateTask)}
          className=''
          >
            <FormProvider {...methods}>
              <motion.div
                className='w-[550px] bg-white rounded-md shadow-md border text-sm border-border-default py-5 px-8 space-y-4' 
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
              
              <div>
                <h2 className='flex space-x-4 items-center text-xl text-primary-formedica font-medium'>
                  <span>
                    Abrir Ticket
                  </span>
                  <BiTask/>
                </h2>

                <p className="text-xs text-gray-500">
                  Crie um ticket para o atendimento da sua demanda.
                </p>
              </div>

              <div className='flex flex-col space-y-2'>
                <label 
                htmlFor=""
                className='text-sm text-gray-500'
                
                >Título</label>
                <input 
                type="text"
                className='py-1 px-3 h-9 w-96 rounded-md border border-border-default shadow-sm outline-primary-formedica outline-1'
                {...register('titulo') }
                />
                <span className='text-red-500 text-xs'>
                  {errors?.titulo?.message}
                </span>
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
                <span className='text-red-500 text-xs'>
                  {errors?.description?.message}
                </span>
              </div>

              <div>
                <FileUploader />
              </div>

              {
                addtionalData.length > 0 &&
                <MiniMenu/>
              }

              <div className='flex gap-2 justify-end'>
                <motion.button className='px-5 py-1 rounded-md'
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={(e) => {
                  e.preventDefault()
                  setOpenForm(false)
                  reset()
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


        </BurredBackground>

      }
      </AnimatePresence>
      
    </>

)
  
}