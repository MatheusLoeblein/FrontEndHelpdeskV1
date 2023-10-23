import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { RxGear } from 'react-icons/rx'
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { usePrivateApi } from '@/hooks/usePrivateApi';


export function ActionGear({ticket}){
  const  [open, setOpen] = useState(false)
  const [statusSubOpen, setStatusSubOpen] = useState(false)
  const [prioridadeSubOpen, setPrioridadeSubOpen] = useState(false)

  const actionGearRef = useRef(null);
  const toastId = useRef(null)

  const api = usePrivateApi()
  const queryClient = useQueryClient()
  

  useEffect(() => {
    function handleClickOutside(event) {
      if (actionGearRef.current && !actionGearRef.current.contains(event.target)) {
        setOpen(false);
        setStatusSubOpen(false);
        setPrioridadeSubOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const { mutate, isLoading, isSuccess, data: ticketCreatedData, error } = useMutation(
    'TicketAction',
    async (data) => {
      toastId.current = toast.loading('Executando ação...')
      const response = await api.post('/api/tarefa/action/', data);
      return response.data;
    },
    {
      onSuccess: (responseData) => {
        queryClient.invalidateQueries('ticket');
        toast.update(toastId.current, {
          render: responseData.message,
          type: "success",
          isLoading: false,
          closeButton: true,
          autoClose: true
      })

      },
      onError: (error) => {
        const errorMessage = error.response?.data?.error
        toast.update(toastId.current, {
          render: errorMessage,
          type: "error",
          isLoading: false,
          closeButton: true,
          autoClose: true
      })
      },
    }
  );


  function initTicket(){
    const data = {
      action_type: 'I',
      tarefa: ticket.id
    }

    mutate(data)
  }


  function changeStatus(status){

    const data = {
      action_type: 'GS',
      tarefa: ticket.id,
      status: status
    }

    mutate(data)
  }


  function changePrioridade(prioridade){

    const data = {
      action_type: 'GP',
      tarefa: ticket.id,
      prioridade: prioridade
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
      onClick={() => { 
        setOpen(!open)
        setStatusSubOpen(false);
        setPrioridadeSubOpen(false);
      }}
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
            onClick={() => {
              setStatusSubOpen(!statusSubOpen)
              setPrioridadeSubOpen(false)
            }}
            >
              Gerenciar status
            </span>

            <AnimatePresence>

              { statusSubOpen && 

                <motion.div 
                className='text-xs flex flex-col px-3 gap-4'
                initial={{height: 0, opacity: 0, scale: 0}}
                animate={{height: 'auto', opacity: 1, scale: 1}}
                transition={{ type: undefined, stiffness: undefined, damping: undefined, duration: 0.2  }}
                exit={{height: 0, opacity: 0, scale: 0}}
                >
                  <span 
                  onClick={() => {
                    changeStatus('Aguardando Retorno')
                  }}
                  className='cursor-pointer hover:bg-blue-100 px-6 rounded-md p-1'
                  >Aguardando Retorno</span>
                  <span
                    onClick={() => {
                      changeStatus('Finalizado')
                    }}
                  className='cursor-pointer hover:bg-blue-100 px-6 rounded-md p-1'
                  >Finalizado</span>

                </motion.div>
              }

            </AnimatePresence>

            <span className='py-1 px-5 cursor-pointer hover:bg-blue-100 rounded-md'
            onClick={() => {
              setPrioridadeSubOpen(!prioridadeSubOpen)
              setStatusSubOpen(false)
            }}
            >
              Gerenciar prioridade
            </span>

            <AnimatePresence>

              { prioridadeSubOpen && 

              <motion.div className='text-xs flex flex-col px-3 gap-4'
              initial={{height: 0, opacity: 0, scale: 0}}
              animate={{height: 'auto', opacity: 1, scale: 1}}
              transition={{ type: undefined, stiffness: undefined, damping: undefined, duration: 0.2 }}
              exit={{height: 0, opacity: 0, scale: 0}}
              >
                <span 
                className='cursor-pointer hover:bg-blue-100 px-6 rounded-md p-1'
                onClick={() => changePrioridade("Baixa")}
                >Baixa</span>
                <span 
                onClick={() => changePrioridade("Moderada")}
                className='cursor-pointer hover:bg-blue-100 px-6 rounded-md p-1'
                >Moderada</span>
                <span 
                onClick={() => changePrioridade("Alta")}
                className='cursor-pointer hover:bg-blue-100 px-6 rounded-md p-1'
                >Alta</span>
                <span 
                onClick={() => changePrioridade("Urgente")}
                className='cursor-pointer hover:bg-blue-100 px-6 rounded-md p-1'
                >Urgente</span>
              </motion.div>
              }
            
            </AnimatePresence>
            

            {/* TODO implementar futuramente */}
            {/* <span className='py-1 px-5 cursor-pointer hover:bg-blue-100 rounded-md'
            >
              Corrigir informação
            </span>
            <span className='py-1 px-5 cursor-pointer hover:bg-blue-100 rounded-md'
            >
              Mover ticket
            </span> */}

            {/* TODO Falta o delete do ticket tbm */}

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