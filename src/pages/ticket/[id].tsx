import { useRouter } from 'next/router';
import { MainLayout } from '@/components/MainLayout';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import {status, prioridade} from '../../components/Tickets'

function TicketPage() {
  const router = useRouter();
  const { id } = router.query;
  const [ticket, setTicket] = useState(null);

  useEffect( () => {
    async function response(){
      
    await api.get(`/api/tarefa/${id}`)
    .then(response => {
      console.log(response.data)
      setTicket(response.data)
    })
  }

  response();

  }, [])

  return (

    <MainLayout>
      <section className='p-10'>

      {ticket && 
      
        <>
          <div className=' w-full bg-white px-3 py-5 rounded-md shadow-md'>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img src={ticket.author.profile.cover_profile} alt=""  className='w-16 h-16 rounded-full object-cover '/>

                <div className="">
                  <h1 className='text-xl font-medium'>{ticket.tipe.tipe}</h1>
                  <p>adicionado por <strong>{ticket.author.first_name} {ticket.author.last_name}</strong> em {ticket.data_at} ás {}</p>
                </div>
              </div>

              <div className="flex gap-3">

                <select name="" id="">

                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                </select>

                <div className="flex items-center">
                  <span className={`px-5 py-[5px] w-32 text-center  rounded-md text-white shadow-md ${prioridade[ticket.prioridade]}`}>
                  {ticket.prioridade}
                  </span>
                </div>

              </div>
            </div>


              <div className="border-b border-border-default w-full">
              <div className=" w-2/3 grid grid-cols-2 gap-20 py-10 ">

                <div className='flex flex-col gap-4'>
                  <div className='flex justify-between items-center'>
                    <span><strong>Ticket</strong></span>
                    <span># {ticket.id}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span><strong>Setor</strong></span>
                    <span>{ticket.Category.name ? ticket.Category.name : '--'}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span><strong>Anydesk</strong></span>
                    <span>{ticket.id}</span>
                  </div>
                </div>

                <div className='flex flex-col gap-4'>
                  <div className='flex justify-between items-center'>
                    <span><strong>Último Feedback</strong></span>
                    <span>{ticket.data_up_at}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span><strong>Setor Atribuido</strong></span>
                    <span>{ticket.author.profile.Category ? ticket.author.profile.Category : '--'}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span><strong>Status</strong></span>
                    <div className="flex items-center">
                      <span className={`px-5 py-[5px] text-xs text-center  rounded-md text-white shadow-md ${status[ticket.status]}`}>
                      {ticket.status}
                      </span>
                    </div>
                  </div>
                </div>


                </div>

              </div>



              <div className="">

                <h2 className="py-3"><strong>Descrição</strong></h2>

                <div className='container py-3 pb-5 ' dangerouslySetInnerHTML={{__html: ticket.description}}></div>
              </div>


          </div>


            <div className='flex gap-20  py-10 my-12 relative '>

              <div className='w-60 h-10 text-center flex justify-center items-center bg-white rounded-md z-10'>
              23/08/2023 ás 09:09
              </div>
              <span className='absolute bg-blue-500 w-20 h-1 left-60 top-14 z-0'>

              </span>
              <span className='absolute bg-blue-500 w-3 h-3 left-[313.5px] top-[51.5px] rotate-45'>

              </span>
              
              <div className='flex grow bg-white rounded-md p-5'>
                <div className='flex border-b border-b-border-default w-full pb-3'>
                <img src={ticket.author.profile.cover_profile} alt=""  className='w-16 h-16 rounded-full object-cover '/>
                <h3>{ticket.author.first_name} {ticket.author.last_name}</h3>
                </div>
                
                <div>

                </div>
              </div>

                      
            </div>
        </>
      }



      </section>
    </MainLayout>
   
  );
}

export default TicketPage;
