import { motion, AnimatePresence } from "framer-motion"
import { useContext, useEffect } from 'react';
import { NewTaskContext } from '@/context/NewTaskContext';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

export function DelReq(){

  const {
    type, 
    addtionalData, setAddtionalData,
    open, setOpen,
    editIndex, setEditIndex
  } = useContext(NewTaskContext)

  

  const schema = object({
    reqs: string().required("Campo obrigatório."),
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
      setValue('reqs', dataToEdit.reqs); 
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

          <h1 className=' text-xl font-medium'>
            Requisições para exclusão
          </h1>

          <div className='flex flex-col space-y-2'>
            <label 
            htmlFor=""
            className='text-sm text-gray-500'
            
            >Requisições</label>
            <input 
            type="text"
            className='py-1 px-3 h-9 w-96 rounded-md border border-border-default shadow-sm outline-primary-formedica outline-1'
            {...register('reqs') }
            placeholder='Digite o nome do colaborador'
            />
            <span className='text-xs text-red-400'>
            {errors?.reqs?.message}
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

      <div className='w-full bg-yellow-100 opacity-80 rounded-md border border-yellow-600 py-5 px-8'>
        <p>
          Para o tipo escolhido, e necessario pelo menos uma coluna de informações do medico cadastrada.
        </p>
      </div>
    </motion.div>
    </AnimatePresence>
    
  )
}