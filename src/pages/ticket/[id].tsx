import { useRouter } from 'next/router';
import { MainLayout } from '@/components/MainLayout';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import {status, prioridade} from '../../components/Tickets'
import { format } from 'date-fns';
import { useQuery } from 'react-query'
import { parseCookies } from 'nookies';
import Image from 'next/image';


export default function TicketPage() {
  const router = useRouter();

  const {data: ticket, isFetching, error, isLoading } = useQuery('tickets', async () => {
    const {'helpdeskauth.token': token} = parseCookies();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { id } = router.query;
    const response = await api.get(`/api/tarefa/${id}`, {headers});

    console.log(response.data)


    
    return response.data;
    
  })
  
  console.log(ticket, isFetching, error, isLoading)

  if (isLoading){

    return(
      <MainLayout>
      <p>
        Loading...
      </p>
    </MainLayout>
    )
  }



  return (

    <MainLayout>
      <section className='p-10'>

      {!isFetching && ticket && 
      
        // xl:flex xl:items-start xl:gap-10
        <div className='max-md:max-w-7xl  m-auto'>
          {/* xl:w-1/2 */}
          <div className='w-full  bg-white px-3 py-5 rounded-md shadow-md'>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Image 
                src={ticket.author?.profile.cover_profile} 
                alt="7868687"  
                className='w-16 h-16 rounded-full object-cover'
                width={500}
                height={500}
                />

                <div className="">
                  <h1 className='text-xl font-medium'>{ticket.tipe.tipe}</h1>
                  <p>adicionado por <strong>{ticket.author.first_name} {ticket.author.last_name}</strong> em {format(new Date(ticket.data_at), 'dd-MM-yyyy')} ás {format(new Date(ticket.data_at), 'HH:mm')}</p>
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
                    <span>{format(new Date(ticket.data_up_at), 'dd-MM-yyyy')} ás {format(new Date(ticket.data_up_at), 'HH:mm')}</span>
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

                <div className='container py-3 pb-5 break-words ' dangerouslySetInnerHTML={{__html: ticket.description}}></div>
              </div>


          </div>


          <div className='xl:grow flex flex-col'>
          {ticket.comments ? ticket.comments.map((comment, index) => {
            return(

                //xl:mt-0
                <div className='flex gap-20 my-12  relative ' key={index}>

                  <div className='w-60  h-10 text-center flex justify-center items-center bg-white rounded-md z-10 shadow-md'>
                    {format(new Date(comment.created_at), 'dd-MM-yyyy')} ás {format(new Date(comment.created_at), 'HH:mm')}
                  </div>
                  <span className='absolute bg-blue-500 w-20 h-1 left-60 top-4 z-0'>

                  </span>
                  <span className='absolute bg-blue-500 w-3 h-3 left-[313.5px] top-[11.5px] rotate-45'>

                  </span>
                
                  <div className='flex grow bg-white rounded-md p-5 space-x-4 shadow-md'>
                    <div>
                      <Image 
                      src={`http://127.0.0.1:8000${comment.author.profile.cover_profile}`} 
                      alt=""
                      className='w-16 h-16 rounded-full object-cover'
                      width={500}
                      height={500}
                      />
                    </div>
                    <div className='flex flex-col justify-start grow'>
                      <h3 className='border-b border-b-border-default text-md font-medium w-full py-3' >{comment.author.first_name} {comment.author.last_name}</h3>

                      <div className='w-full py-5'>
                        <div className="break-words" dangerouslySetInnerHTML={{__html: comment.comment}}></div>
                      </div>
                    </div>
                    

                  </div> 
                </div>
            )
          })
          :
          ''
        }
        </div>
        </div>
      }



      </section>
    </MainLayout>
   
  );
}

import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'helpdeskauth.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {

    }
  }
}

