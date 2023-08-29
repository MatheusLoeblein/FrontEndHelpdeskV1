import {api} from '../../services/api'
import { format } from 'date-fns';
import Link from 'next/link'
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { LayoutContext } from '../../context/LayoutContext'
import {useQuery} from 'react-query';
import {useContext} from 'react';

export const status = {
  'Aberto': 'bg-status-ticket-open',
  'Execução': 'bg-status-ticket-execut',
 'Aguardando Retorno':'bg-status-ticket-waiting',
 'Finalizado': 'bg-status-ticket-finaly'
 
}

export const prioridade = {
  'Urgente': 'bg-status-ticket-open',
  'Moderada': 'bg-status-ticket-execut',
 'Alta':'bg-status-ticket-waiting',
 'Baixa': 'bg-status-ticket-finaly'
 
}

export function Tickets() {
  const [ticketSearch, setTicketSearch] = useState('');
  const [tickets, setTickets] = useState();
  const [filteredTickets, setFilteredTickets] =  useState();

  const {data, isFetching } = useQuery('tickets', async () => {
    const {'helpdeskauth.token': token} = parseCookies();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await api.get('/api/tarefa/', {headers});

    setTickets(response.data);


    return response.data;

  })


  function handleSearch(value){
    setTicketSearch(value)
    

    if (ticketSearch.length > 0){
      console.log('Maior que zero')
      setFilteredTickets(tickets.filter(ticket => ticket.tipe.tipe.toLowerCase().includes(ticketSearch.toLowerCase())))
    }else{
      console.log('Menor que zero')
      setFilteredTickets([])
    }

    console.log(filteredTickets)

  }



  return(


    <div className='flex p-5 flex-col bg-white'>

    <div className="flex justify-between items-end border-b pb-10 border-b-border-default">
      <div>
        <h1 className="text-2xl font-medium">Tickets</h1>
        <p className="text-sm font-normal">Tickets de atendimento, você pode filtrar de acordo com a sua necessidade</p>
      </div>

      <div className="flex gap-1">
        <input type="search" className='h-8 w-80 p-2 rounded-md border-border-default text-xs' onChange={event => handleSearch(event.target.value)}/>

        <select name="filterTicket" className='h-8 p-2 w-max rounded-md border-border-default text-xs' id="filterTicket">
          <option value="valor1">Abertos</option>
          <option value="valor1">Em execução</option>
          <option value="valor1">Aguardando Retorno</option>
          <option value="valor1">Finalizados</option>
        </select>
      </div>

    </div>
    <div className='h-screen  bg-primary-formedica'>
       { !isFetching && ticketSearch.length > 0 ? filteredTickets?.map(ticket => {

        const formattedDate = format(new Date(ticket.data_up_at), 'dd/MM/yyyy HH:mm');
        return(
          <div className="flex flex-col py-1 border-b border-b-border-default" key={ticket.id}>

          <div className="grid grid-cols-[4fr,2fr,3fr,1fr] w-full py-1 items-center">

            <div className="flex flex-col gap-3 w-96 border-b border-b-border-default py-3 ">
              <h3 className='text-lg font-semibold '>
                
                <Link
                href="/ticket/[id]" 
                as={`/ticket/${ticket.id}`}
                ># {ticket.id} | {ticket.tipe?.tipe}</Link>
              </h3>

              <p className='text-xs'>
              Último feedback | {formattedDate}
              </p>

            </div>
            <div className="flex items-center gap-2">

                <img 
                className="w-8 h-8 rounded-full object-cover align-middle "
                src={ticket.author.profile.cover_profile} 
                alt="Teste" 
                />

                {ticket.author.first_name} {ticket.author.last_name}

            </div>
            <div className="flex items-center gap-2 justify-center">


            { ticket.users ? 
              ticket.users.map((user, index) => {
                
                return(
                  <div key={index}>
                  <img 
                  className="w-8 h-8 rounded-full object-cover align-middle "
                  src={user.profile.cover_profile} 
                  alt={user.profile.cover_profile}
                  />
                  </div>
                )
              })
              :
              
              <span> -- </span>
              
            }

            </div>
            <div className="flex">

              <span className={`px-5 py-[5px] w-32 text-center  rounded-md text-white shadow-md ${prioridade[ticket.prioridade]}`}>
              {ticket.prioridade}
              </span>
            </div>
          </div>



          <div className="py-3 flex gap-2">

          <span className='px-5 py-[3px] rounded-md text-white bg-gray-400 shadow-md'>
              {ticket.Category.name}
          </span>
          <span className={`px-5 py-[3px] rounded-md text-white shadow-md ${status[ticket.status]} `}>
              {ticket.status}
          </span>

        </div>

        </div>
        )
        })
        :
        tickets?.map(ticket => {

          const formattedDate = format(new Date(ticket.data_up_at), 'dd/MM/yyyy HH:mm');
          return(
            <div className="flex flex-col py-1 border-b border-b-border-default" key={ticket.id}>
  
            <div className="grid grid-cols-[4fr,2fr,3fr,1fr] w-full py-1 items-center">
  
              <div className="flex flex-col gap-3 w-96 border-b border-b-border-default py-3 ">
                <h3 className='text-lg font-semibold '>
                  
                  <Link
                  href="/ticket/[id]" 
                  as={`/ticket/${ticket.id}`}
                  ># {ticket.id} | {ticket.tipe?.tipe}</Link>
                </h3>
  
                <p className='text-xs'>
                Último feedback | {formattedDate}
                </p>
  
              </div>
              <div className="flex items-center gap-2">
  
                  <img 
                  className="w-8 h-8 rounded-full object-cover align-middle "
                  src={ticket.author.profile.cover_profile} 
                  alt="Teste" 
                  />
  
                  {ticket.author.first_name} {ticket.author.last_name}
  
              </div>
              <div className="flex items-center gap-2 justify-center">
  
  
              { ticket.users ? 
                ticket.users.map((user, index) => {
                  
                  return(
                    <div key={index}>
                    <img 
                    className="w-8 h-8 rounded-full object-cover align-middle "
                    src={user.profile.cover_profile} 
                    alt={user.profile.cover_profile}
                    />
                    </div>
                  )
                })
                :
                
                <span> -- </span>
                
              }
  
              </div>
              <div className="flex">
  
                <span className={`px-5 py-[5px] w-32 text-center  rounded-md text-white shadow-md ${prioridade[ticket.prioridade]}`}>
                {ticket.prioridade}
                </span>
              </div>
            </div>
  
  
  
            <div className="py-3 flex gap-2">
  
            <span className='px-5 py-[3px] rounded-md text-white bg-gray-400 shadow-md'>
                {ticket.Category.name}
            </span>
            <span className={`px-5 py-[3px] rounded-md text-white shadow-md ${status[ticket.status]} `}>
                {ticket.status}
            </span>
  
          </div>
  
          </div>
          )
          })
      }

    

      { isFetching  &&
      <div className='flex h-96 items-center justify-center'>

        <span className='w-10 h-10 rounded-full border-4 border-border-default border-t-pink-500 animate-spin'>
          
        </span>
        
      </div>}
      </div>
      
    </div>
    
    




    
  )
}