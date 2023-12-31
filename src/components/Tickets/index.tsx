
import { format } from 'date-fns';
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react';
import {useQuery} from 'react-query';
import Image from 'next/image'
import {AiOutlineCloseCircle, AiOutlineDownCircle  } from 'react-icons/ai'
import { usePrivateApi } from '@/hooks/usePrivateApi';
import { AnimatePresence, motion } from 'framer-motion';
import { RiErrorWarningLine } from 'react-icons/ri';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { TbClockHour4 } from 'react-icons/tb';
import { BsPlayCircle } from 'react-icons/bs';
import { FaSlackHash } from 'react-icons/fa';

export const status = {
  'Aberto': 'bg-status-ticket-open',
  'Execução': 'bg-status-ticket-execut',
 'Aguardando Retorno':'bg-status-ticket-waiting',
 'Finalizado': 'bg-status-ticket-finaly'
 
}


export function StatusAberto() {
  return(
    <span className={`w-max flex gap-1 items-center text-sm px-5 py-[3px] text-white rounded-md shadow-md bg-status-ticket-open `}>
      Aberto
      <RiErrorWarningLine size={15} className=" text-white "/>
    </span>
  )
}
export function StatusExecucao() {
  return(
    <span className={`w-max flex gap-1 items-center text-sm px-5 py-[3px] text-white rounded-md shadow-md bg-status-ticket-execut`}>
      Execução
      <BsPlayCircle size={13} className=" text-white"/>
    </span>
  )
}
export function StatusAguardandoRetorno() {
  return(
    <span className={`w-max flex gap-1 items-center text-sm px-5 py-[3px] text-white rounded-md shadow-md bg-status-ticket-waiting`}>
      Aguardando Retorno
      <TbClockHour4 size={15} className=" text-white"/>
    </span>
  )
}
export function StatusFinalizado() {
  return(
    <span className={`w-max flex gap-1 items-center text-sm px-5 py-[3px] text-white rounded-md shadow-md bg-status-ticket-finaly`}>
      Finalizado
      <AiOutlineCheckCircle size={15} className=" text-white"/>
    </span>
  )
}


export const statusComponents = {
  'Aberto': <StatusAberto/>,
  'Execução': <StatusExecucao/>,
  'Aguardando Retorno': <StatusAguardandoRetorno/>,
  'Finalizado': <StatusFinalizado/>,
}



export const prioridade = {
  'Urgente': 'bg-status-ticket-open',
  'Moderada': 'bg-status-ticket-execut',
  'Alta':'bg-status-ticket-waiting',
  'Baixa': 'bg-status-ticket-finaly'
 
}

export function Tickets() {
  const [tickets, setTickets] = useState();
  const [page, setPage] = useState(1)
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState('');
  const ticketStatusFilter = useRef(null);
;
  let url = page > 1 ? `/api/tarefa/?page=${page}` : '/api/tarefa/'

  if(filter ){
    if(page > 1){

      url += `&status=${filter}`
    }else{
      url += `?status=${filter}`
    }
  }
  const api = usePrivateApi();
  const getData = (page = 1) => api.get(url);

  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ['tickets', page, filter],
    queryFn: () => getData(page),
    keepPreviousData : true
  })

  useEffect(() => {
    if (data != null){
      setTickets(data?.data?.results)
      console.log('Tickets', tickets)
    }
  }, [data, tickets])

  function handleFilter(filter){
    setPage(1)
    setFilter(filter)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (ticketStatusFilter.current && !ticketStatusFilter.current.contains(event.target)) {
        setOpenFilter(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };


  return(


    <div className='flex p-5 flex-col bg-white'>

    <div className="flex justify-between items-end border-b pb-10 border-b-border-default">
      <div>
        <h1 className="text-2xl font-medium">Tickets</h1>
        <p className="text-sm font-normal">Tickets de atendimento, você pode filtrar de acordo com a sua necessidade</p>
      </div>

      <div className="flex">
        {/* <input type="search" className='h-8 w-80 p-2 rounded-md border-border-default text-xs' onChange={event => handleSearch(event.target.value)}/> */}

        <div 
        className='p-2 w-64 rounded-md text-xs relative border border-border-default cursor-pointer' 
        onClick={() => setOpenFilter(!openFilter)}
        >
          <span>{filter ? filter : 'Filtar por status'}</span> 

          {filter ? <div  className="text-xl font-semibold bg-primary-text hover:bg-red-300 h-full flex w-10 top-0 right-0 cursor-pointer justify-center items-center rounded-r-md text-white absolute" onClick={() => setFilter('')}>
              <AiOutlineCloseCircle/>
            </div>
            :

            <div  className="text-xl font-semibold bg-primary-text  h-full flex w-10 top-0 right-0 cursor-pointer justify-center items-center rounded-r-md text-white absolute" onClick={() => setFilter('')}>
              <AiOutlineDownCircle/>
            </div>

          }
          {
            openFilter &&
            <div className='absolute w-64 flex flex-col  bg-white rounded-md shadow-md border border-border-default left-0 -bottom-36 '
            ref={ticketStatusFilter}
            >
              
              <span className='hover:bg-gray-300 p-2 cursor-pointer' onClick={() => handleFilter('Aberto')}>Aberto</span>
              <span className='hover:bg-gray-300 p-2 cursor-pointer' onClick={() => handleFilter('Execução')}>Execução</span>
              <span className='hover:bg-gray-300 p-2 cursor-pointer' onClick={() => handleFilter('Aguardando Retorno')}>Aguardando Retorno</span>
              <span className='hover:bg-gray-300 p-2 cursor-pointer' onClick={() => handleFilter('Finalizado')}>Finalizado</span>
            </div>
          }
        </div>
      </div>

    </div>

    <AnimatePresence>

    
      <motion.div className='min-h-[300px]'
      variants={container}
      initial="hidden"
      animate="visible"
      >
        {!isFetching && tickets &&
          tickets?.map((ticket, index) => {
            
          const formattedDate = format(new Date(ticket.data_up_at), 'dd/MM/yyyy HH:mm');

          return(
          <motion.div 
          key={index}
          variants={item}
          >
            <div className="flex flex-col py-1 border-b border-b-border-default"  >

              <div className="grid grid-cols-[4fr,2fr,3fr,1fr] w-full py-1 items-center">

                <div className="flex flex-col gap-3 w-96 border-b border-b-border-default py-2 ">
                  <h3 className='text-md font-semibold '>
                    
                    <Link
                    href="/ticket/[id]" 
                    as={`/ticket/${ticket.id}`}
                    className='flex gap-1'
                    ><span className='flex gap-1 items-center'><FaSlackHash size={12}/> {ticket.id}</span><span> | {ticket.tipe?.tipe}</span></Link>
                  </h3>

                  <p className='text-xs'>
                  Último feedback | {formattedDate}
                  </p>

                </div>

                <div className="flex items-center gap-2">

                    {  
                        ticket?.author?.profile?.cover_profile ?
                          <Image 
                          className="w-7 h-7  text-sm rounded-full object-cover align-middle "
                          src={ticket.author.profile.cover_profile} 
                          alt={ticket.author.profile.cover_profile}
                          width={100}
                          height={100}
                          />
                        :
                          <Image 
                          className="w-7 h-7  text-sm rounded-full object-cover align-middle "
                          src='assets/defaultProfileImg.svg'
                          alt='assets/defaultProfileImg.svg'
                          width={100}
                          height={100}
                          />
                    }

                    
                      {ticket?.author?.first_name} {ticket?.author?.last_name}
                </div>

                <div className="flex items-center gap-2 justify-center">


                { ticket.users ? 
                  ticket.users.map((user, index) => {

                    if(user.profile.cover_profile){

                      return(
                        <div key={index}>
                          <Image 
                          className="w-7 h-7 rounded-full object-cover align-middle "
                          src={user.profile.cover_profile} 
                          alt={user.profile.cover_profile}
                          width={100}
                          height={100}
                          />
                        </div>
                      )

                    }else{
                      return(
                        <div key={index}>
                          <Image 
                          className="w-7 h-7 rounded-full object-cover align-middle "
                          src='assets/defaultProfileImg.svg'
                          alt='assets/defaultProfileImg.svg'
                          width={100}
                          height={100}
                          />
                        </div>
                    )                    
                  }
                  })
                  :
                  
                  <span> -- </span>
                  
                }

                </div>

                <div className="flex">

                  <span className={`px-3 py-[3px] w-32 text-center text-sm rounded-md text-white shadow-md ${prioridade[ticket.prioridade]}`}>
                  {ticket.prioridade}
                  </span>
                </div>

              </div>

              <div className="py-1 flex gap-2">

                <span className=' text-sm px-5 py-[3px] rounded-md text-white bg-gray-400 shadow-md'>
                    {ticket.Category.name}
                </span>

                {statusComponents[ticket.status]}


              </div>

            </div>


          </motion.div>
          
          )
          })
        }

      </motion.div>

      { isFetching  &&
          <div className='flex h-96 items-center justify-center'>

            <span className='w-10 h-10 rounded-full border-4 border-border-default border-t-pink-500 animate-spin'>
              
            </span>
            
          </div>
      }


    </AnimatePresence>



    { !isLoading && tickets &&

      <div className='flex justify-between items-center pt-5'>

        <div className="space-x-5">
          <span><strong>Pagina atual</strong> {page} </span>
          <span><strong>Items na pagina</strong> {tickets.length}</span>
          <span><strong>Total</strong> {data?.data?.count}</span>
          <span><strong>Paginas</strong> {Math.ceil(data?.data?.count / 20)}</span>
        </div>

        <div className="flex font-semibold text-md space-x-4">
          <button
          className={` transition ${!data?.data?.previous ? 'text-gray-400' : 'hover:underline hover:text-primary-formedica cursor-pointer' }`} 
          onClick={() => setPage(page - 1)} disabled={!data?.data?.previous} 
          
          >{'<'} Anterior</button>
          <button className='cursor-pointer hover:underline hover:text-primary-formedica transition' onClick={() => setPage(page + 1)} disabled={!data?.data?.next}>Proxima {'>'}</button>
        </div>

      </div>
    }
      
    </div>
    
  )
}