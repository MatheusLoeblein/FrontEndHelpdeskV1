import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useContext } from 'react';
import { NewTaskContext } from '@/context/NewTaskContext';

import { useForm  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { object, string, number } from 'yup';

export function TaskFields() {

  const schema = object({
    nome: string().required("Campo obrigatório."),
    crm: string().required("Campo obrigatório.").matches(/^\d{5,10}-[A-Z]{2}$/, "O CRM precisar conter de 5 a 10 numeros e a UF em maiusculo reparados por um traço ex: 343241-PR"),
    cep: string().required("Campo obrigatório.").matches(/^\d{5}-{3}$/, "O CEP incorretor, ex: 81136-845"),
    endereco: string().required("Campo obrigatório."),
    telefone: string(),
    especialidade: string().required("Campo obrigatório."),
    email: string(),
  })

  const { 
    register, 
    handleSubmit,
    formState: { errors }
  
  } = useForm({
    resolver: yupResolver(schema)
  });

  const {type} = useContext(NewTaskContext);

  function saveData(data){
    
    console.log(data)
     
  }
  console.log(errors)  

  return(

    <AnimatePresence>
    {
      type == "Fórmula Certa - (Cadastro Médicos)." &&

      <motion.div className='w-[450px] flex flex-col space-y-5 h-max'
      initial={{       
        opacity: 0, 
        scale: 0,
        x: -400
                         
      }}
      animate={{
        scale: 1,
        opacity: 1,
        x: 0,
      }} 
      exit={{
        opacity: 0, 
        scale: 0,
        x: -400
      }}
      >
        
      <form className='bg-white rounded-md shadow-md border text-sm border-border-default py-5 px-8 space-y-4' onSubmit={handleSubmit(saveData)}>
        <h1 className=' text-xl font-medium'>
          Dados do Médicos
        </h1>

        <div className='flex flex-col space-y-2'>
          <label 
          htmlFor=""
          className='text-sm text-gray-500'
          
          >Nome Completo</label>
          <input 
          type="text"
          className='py-1 px-3 h-8 w-96 rounded-md border border-border-default shadow-sm outline-primary-formedica outline-1'
          {...register('nome') }
          />
          <span className='text-xs text-red-400'>
          {errors?.nome?.message}
          </span>
      </div>
      
      <div className="flex flex-row justify-between">
        <div className='flex flex-col space-y-2'>
          <label 
          htmlFor=""
          className='text-sm text-gray-500'
          
          >CRM/UF</label>
          <input 
          type="text"
          className='py-1 px-3 h-8 w-32 rounded-md border border-border-default shadow-sm outline-primary-formedica outline-1'
          {...register('crm') }
          />
          <span className='text-xs text-red-400'>
          {errors?.crm?.message}
          </span>
        </div>

        <div className='flex flex-col space-y-2'>
          <label 
          htmlFor=""
          className='text-sm text-gray-500'
          
          >CEP</label>
          <input 
          type="text"
          className='py-1 px-3 h-8 w-40 rounded-md border border-border-default shadow-sm outline-primary-formedica outline-1'
          {...register('cep') }
          
          />
          <span className='text-xs text-red-400'>
          {errors?.cep?.message}
          </span>
        </div>
      </div>
      <div className='flex flex-col space-y-2'>
        <label 
        htmlFor=""
        className='text-sm text-gray-500'
        
        >Endereço</label>
        <input 
        type="text"
        className='py-1 px-3 h-8 w-96 rounded-md border border-border-default shadow-sm outline-primary-formedica outline-1'
        {...register('endereco') }
        />
          <span className='text-xs text-red-400'>
          {errors?.endereco?.message}
          </span>
      </div>

      <div className="flex flex-row justify-between">
        <div className='flex flex-col space-y-2'>
          <label 
          htmlFor=""
          className='text-sm text-gray-500'
          
          >Especialidade</label>
          <input 
          type="text"
          className='py-1 px-3 h-8 w-48 rounded-md border border-border-default shadow-sm outline-primary-formedica outline-1'
          {...register('especialidade') }
          
          />
          <span className='text-xs text-red-400'>
          {errors?.especialidade?.message}
          </span>
        </div>
        <div className='flex flex-col space-y-2'>
          <label 
          htmlFor=""
          className='text-sm text-gray-500'
          
          >Telefone</label>
          <input 
          type="text"
          className='py-1 px-3 h-8 w-40 rounded-md border border-border-default shadow-sm outline-primary-formedica outline-1'
          {...register('telefone') }
          
          />
          <span className='text-xs text-red-400'>
          {errors?.telefone?.message}
          </span>
        </div>
      </div>

      <div className='flex flex-col space-y-2'>
        <label 
        htmlFor=""
        className='text-sm text-gray-500'
        
        >E-Mail</label>
        <input 
        type="text"
        className='py-1 px-3 h-8 w-96 rounded-md border border-border-default shadow-sm outline-primary-formedica outline-1'
        {...register('email') }
        
        />
          <span className='text-xs text-red-400'>
          {errors?.email?.message}
          </span>
      </div>

      <div className='flex gap-2 justify-end'>
      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className='px-5 py-1 rounded-md text-white bg-primary-formedica flex'
        type='submit'
      >
        Salvar
      </motion.button>
      </div>


      </form>

      <div className='w-full bg-yellow-100 opacity-80 rounded-md border border-yellow-600 py-5 px-8'>
        <p>
          Para o tipo escolhido, e necessario pelo menos uma coluna de informações do medico cadastrada.
        </p>
      </div>
    </motion.div>
    }
    </AnimatePresence>
    
  )

}