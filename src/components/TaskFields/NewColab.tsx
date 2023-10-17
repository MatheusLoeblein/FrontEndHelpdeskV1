import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useContext } from 'react';
import { NewTaskContext } from '@/context/NewTaskContext';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { BsPersonFillAdd } from 'react-icons/bs';

import { DropDownSelect } from '../DropDownSelect';

export function NewColab(){
  const {
    type, 
    addtionalData, setAddtionalData,
    open, setOpen,
    editIndex, setEditIndex,
    formError
  } = useContext(NewTaskContext)


  const schema = object({
    nome: string().required("Campo obrigatório."),
    cpf: string().required("Campo obrigatório."),
    setor: string(),
    dataContrato: string(),
    salario: string(),
  })

  const methods = useForm({
    resolver: yupResolver(schema)
  });

  const { 
    register, 
    handleSubmit,
    formState: { errors },
    setValue,
    setError, 
    clearErrors,
    reset
  } = methods

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
      setValue('setor', dataToEdit.setor);
      setValue('cpf', dataToEdit.cpf);
      setValue('datacontrato', dataToEdit.datacontrato);
      setValue('salario', dataToEdit.salario);
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


        <FormProvider {...methods}>

          <div>
            <h2 className='flex space-x-4 items-center text-xl text-primary-formedica font-medium'>
              <span>
                Dados Colaborador
              </span>
              <BsPersonFillAdd/>
            </h2>

            <p className="text-xs text-gray-500">
              Informe os dados cadastrais do colaborador para inclusão
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
            placeholder='Digite o nome do colaborador'
            />
            <span className='text-xs text-red-400'>
            {errors?.nome?.message}
            </span>
        </div>
      <div className="flex flex-row justify-between items-center">
        <div className='flex flex-col space-y-2'>
            <label 
            htmlFor=""
            className='text-sm text-gray-500 '
            
            >Setor</label>
            <DropDownSelect 
            name="setor"
            objects={  
            [{id: 1, name: 'Baixa'},
            {id: 2, name: 'Moderada'},
            {id: 3, name: 'Alta'},
            {id: 4, name: 'Urgente'}]
            }
            width="44"
            />

          
            <span className='text-xs text-red-400'>
            {errors?.setor?.message}
            
            </span>
        </div>


          <div className='flex flex-col space-y-2'>
            <label 
            htmlFor=""
            className='text-sm text-gray-500'
            
            >CPF</label>
            <input 
            type="text"
            className='py-1 px-3 h-9 w-44   rounded-md border border-border-default shadow-sm outline-primary-formedica outline-1'
            {...register('cpf') }
            placeholder='Digite o CPF do colaborador'
            />
            <span className='text-xs text-red-400'>
            {errors?.cpf?.message}
            </span>
          </div>
  
        </div>

        <div className="flex flex-row justify-between">
          <div className='flex flex-col space-y-2'>
              <label 
              htmlFor=""
              className='text-sm text-gray-500 '
              
              >Contratação</label>
              <input 
              type="date"
              className='py-1 px-3 h-9 w-44 rounded-md border border-border-default shadow-sm outline-primary-formedica outline-1'
              {...register('dataContrato') }
              />
            
              <span className='text-xs text-red-400'>
              {errors?.dataContrato?.message}
              
              </span>
          </div>
        
          <div className='flex flex-col space-y-2'>
            <label 
            htmlFor=""
            className='text-sm text-gray-500'
            
            >Salário</label>
            <input 
            type="text"
            className='py-1 px-3 h-9 w-44 rounded-md border border-border-default shadow-sm outline-primary-formedica outline-1'
            {...register('salario') }
            placeholder='Digite o salario do colaborador'
            />
            <span className='text-xs text-red-400'>
            {errors?.salario?.message}
            </span>
          </div>
  
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

      </FormProvider>

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