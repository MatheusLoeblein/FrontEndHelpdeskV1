import { useEffect, useState } from 'react'
import {api} from '../../services/api'
import { format } from 'date-fns';
import Link from 'next/link'


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
  const [tickets, setTickets] = useState(null);

  useEffect( () => {
    async function response(){
      
    await api.get('/api/tarefa/')
    .then(response => {
      console.log(response.data)
      setTickets(response.data.results)
    })
  }

  response();

  }, [])

  return(

      tickets ? tickets.map(ticket => {

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
            console.log('não temeeem')
            
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

    <div className='flex h-96 items-center justify-center'>

      <span className='w-10 h-10 rounded-full border-4 border-border-default border-t-pink-500 animate-spin'>
        
      </span>
      
    </div>

    
  )
}