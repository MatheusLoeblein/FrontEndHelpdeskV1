import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { RxGear } from 'react-icons/rx'
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { usePrivateApi } from '@/hooks/usePrivateApi';


export function ActionGear({ticket}){
  const  [open, setOpen] = useState(false)
  const actionGearRef = useRef(null);
  const api = usePrivateApi()
  const queryClient = useQueryClient()
  const toastId = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (actionGearRef.current && !actionGearRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const { mutate, isLoading: postLoading, isSuccess } = useMutation(
    'TicketAction',
    async (data) => {
      toastId.current = toast.loading('Executando ação...')
      const response = await api.post('/api/tarefa/action/', data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('ticket');
        toast.update(toastId.current, {
          render: "Ação efetuada com sucesso!",
          type: "success",
          isLoading: false,
          closeButton: true,
          autoClose: true
      })

      },
      onError: () => {
        toast.update(toastId.current, {
          render: "'Erro ao efetuar ação'",
          type: "error",
          isLoading: false,
          closeButton: true,
          autoClose: true
      })
      },
    }
  );

  function initTicket(){
    if(ticket.status != "Aberto"){
      toast.error('Ticket esta encontra em estado de execução.')
    }
   const data = {
      action_type: 'I',
      tarefa: ticket.id
    }
    mutate(data)
  }


  return(
    <div className='relative self-start'
    ref={actionGearRef}
    >
      <motion.div 
      className="flex items-center  justify-center rounded-md shadow-md p-1 border border-border-default cursor-pointer"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={() => { setOpen(!open) }}
      >
        <span className='text-primary-formedica'>
          <RxGear size={20} />
        </span>      
      </motion.div>

      <AnimatePresence>
        {
          open && 

        <motion.div 
        
        className='absolute right-0 top-8 w-56 bg-white border border-border-default rounded-md shadow-md text-sm flex flex-col px-3 py-2'
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        >
          <span
          className=' text-primary-formedica text-md font-bold px-3  pb-2'
          >AÇÕES</span>

          <div className='flex flex-col space-y-2 font-medium'>
            <span className='py-1 px-5 cursor-pointer hover:bg-blue-100 rounded-md'
            onClick={initTicket}
            >
              Iniciar atendimento
            </span>
            <span className='py-1 px-5 cursor-pointer hover:bg-blue-100 rounded-md'
            >
              Gerenciar status
            </span>
            <span className='py-1 px-5 cursor-pointer hover:bg-blue-100 rounded-md'
            >
              Gerenciar prioridade
            </span>
            <span className='py-1 px-5 cursor-pointer hover:bg-blue-100 rounded-md'
            >
              Corrigir informação
            </span>
            <span className='py-1 px-5 cursor-pointer hover:bg-blue-100 rounded-md'
            >
              Mover ticket
            </span>
            <span className='py-1 px-5 cursor-pointer  bg-gray-200 hover:bg-red-500 hover:text-white rounded-md'
            >
              Deletar ticket
            </span>
          </div>
        </motion.div>
        }
      </AnimatePresence>

    </div>

  )
}