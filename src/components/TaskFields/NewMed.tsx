import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { useState, useEffect, useContext } from 'react';
import { NewTaskContext } from '@/context/NewTaskContext';
import { FaBriefcaseMedical } from 'react-icons/fa';

export function NewMed(){
  const [searchCep, setSearchCep] = useState(false)
  const {
    type, 
    addtionalData, setAddtionalData,
    open, setOpen,
    editIndex, setEditIndex,
    formError, setFormError
  } = useContext(NewTaskContext)

  const schema = object({
    nome: string().required("Campo obrigatório."),
    crm: string().required("Campo obrigatório.").matches(/^\d{5,10}-[A-Z]{2}$/, "O CRM precisar conter de 5 a 10 numeros e a UF em maiusculo reparados por um traço ex: 343241-PR"),
    cep: string().required("Campo obrigatório.").max(9, 'Tamanho maximo de 9 caracteres'),
    endereco: string().required("Campo obrigatório."),
    telefone: string(),
    especialidade: string().required("Campo obrigatório."),
    email: string(),
  })

  const { 
    register, 
    handleSubmit,
    formState: { errors },
    setValue,
    setError, 
    clearErrors,
    reset
  
  } = useForm({
    resolver: yupResolver(schema)
  });

  function getCepInfo(value){
    setSearchCep(true)
    clearErrors('cep')
    const numbAndT = /^\d{5}-\d{3}$/
    const numb = /^\d{8}$/
    if(numbAndT.test(value) || numb.test(value)){
      const cep = value.replace(/\D/g, '')
      axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(
        response => {
          console.log("cepDDDataaa", response.data)
          if (!response.data.erro){
            setValue('endereco', `${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade} - ${response.data.uf}`)
          }else{
            setValue('endereco', '')
            setError('cep', {
              type: 'api',
              message: 'Cep não encontrado.'
            });

          }
        }
      ).catch(

      ).finally(
        setSearchCep(false)
      )
    }
    if(value.length < 1){
      setSearchCep(false)
      setError()
    }
  }

  function saveData(data) {
    if (editIndex !== -1) {
      const updatedData = [...addtionalData];
      updatedData[editIndex] = data;
      setAddtionalData(updatedData);
      setEditIndex(-1);
    } else {
      setAddtionalData((prevData) => [...prevData, data]);
    }
    setOpen(false);
    reset();
    setFormError(false);
  }

  function handleCancel(event){
    event.preventDefault()
    setOpen(false)
    reset()
    setEditIndex(-1)
  }

 
  useEffect(() => {
    if(editIndex != -1){
      const dataToEdit = addtionalData[editIndex];
      setValue('nome', dataToEdit.nome); 
      setValue('crm', dataToEdit.crm);
      setValue('cep', dataToEdit.cep);
      setValue('endereco', dataToEdit.endereco);
      setValue('telefone', dataToEdit.telefone);
      setValue('especialidade', dataToEdit.especialidade);
      setValue('email', dataToEdit.email);
    }
  }, [editIndex, setEditIndex])

  

  return(

    <AnimatePresence>

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
          <div>
            <h2 className='flex space-x-4 items-center text-xl text-primary-formedica font-medium'>
              <span>
                Dados do Médico
              </span>
              <FaBriefcaseMedical/>
            </h2>

            <p className="text-xs text-gray-500">
              Informe os dados cadastrais do medico para inclusão
            </p>

          </div>

        <div className='flex flex-col space-y-2'>
          <label 
          htmlFor=""
          className='text-sm text-gray-500'
          
          >Nome Completo</label>
          <input 
          type="text"
          className='py-1 px-3 h-9 w-96 rounded-md border border-border-default shadow-sm outline-primary-formedica outline-1'
          {...register('nome') }
          placeholder='Digite o nome completo do médico'
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
          className='py-1 px-3 h-9 w-32 rounded-md border border-border-default shadow-sm outline-primary-formedica outline-1'
          {...register('crm') }
          placeholder='Digite CRM é UF'
          />
          <span className='text-xs text-red-400'>
          {errors?.crm?.message}
          </span>
        </div>

        <div className='flex flex-col space-y-2'>
          <label 
          htmlFor=""
          className='text-sm text-gray-500 '
          
          >CEP</label>
          <input 
          type="text"
          className='py-1 px-3 h-9 w-40 rounded-md border border-border-default shadow-sm outline-primary-formedica outline-1'
          {...register('cep', {
            onChange: (event) => getCepInfo(event.target.value)
          }) }
          placeholder='Digite o CEP com ou sem traço'
          />
         
          <span className='text-xs text-red-400'>
          {errors?.cep?.message}
          
          </span>
        </div>
      </div>
      <div className='flex flex-col space-y-2 relative'>
        <label 
        htmlFor=""
        className='text-sm text-gray-500'
        
        >Endereço</label>
        <input 
        type="text"
        className={`py-1 px-3 ${searchCep && 'pr-8'} h-9 w-96 rounded-md border border-border-default shadow-sm outline-primary-formedica outline-1`}
        {...register('endereco')}
        placeholder='Digite o endereço'
        />
          {
            searchCep && <span className="w-5 h-5 border-[3px] border-gray-400 border-t-primary-formedica rounded-full right-2 top-[25px] absolute animate-spin"></span>
          }
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
          className='py-1 px-3 h-9 w-48 rounded-md border border-border-default shadow-sm outline-primary-formedica outline-1'
          {...register('especialidade') }
          placeholder='Digite a(s) especialidade()s do médico'
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
          className='py-1 px-3 h-9 w-40 rounded-md border border-border-default shadow-sm outline-primary-formedica outline-1'
          {...register('telefone') }
          placeholder='Digite o telefone do médico'
          
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
        className='py-1 px-3 h-9 w-96 rounded-md border border-border-default shadow-sm outline-primary-formedica outline-1'
        {...register('email') }
        placeholder='Digite o e-mail do médico'
        
        />
          <span className='text-xs text-red-400'>
          {errors?.email?.message}
          </span>
      </div>


      <div className='flex gap-2 justify-end'>

        {
          addtionalData.length >= 1 &&

          <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className='px-5 py-1 rounded-md flex'
          onClick={(e) => handleCancel(e)}
          >
            Cancelar
          </motion.button>
        }

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

        { 
          formError ?
          <motion.div 
          className='w-full bg-red-300 rounded-md border border-red-500 py-5 px-8'
          animate={{ 
            x: [-25, 25, -25, 25, 0], 
            y: [25, -25, 25, -25, 0]
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
          <p className='text-sm text-gray-600'>
            Para o tipo selecionado, é necessário pelo menos uma coluna de informações do médico cadastrada.
            Por favor, preencha o formulário.
          </p>
          </motion.div>
          :
          <div className='w-full bg-yellow-100 rounded-md border border-yellow-500 py-5 px-8'>
          <p className='text-sm text-gray-600'>
          Para o tipo selecionado, é necessário pelo menos uma coluna de informações do médico cadastrada.
          </p>
          </div>    
        }

    </motion.div>
    </AnimatePresence>
    
  )
}
