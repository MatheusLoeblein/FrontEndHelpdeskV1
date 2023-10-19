import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { MainLayout } from '@/components/MainLayout';
import {status, prioridade} from '../../components/Tickets'
import { format } from 'date-fns';
import { useQuery } from 'react-query'
import { parseCookies } from 'nookies';
import Image from 'next/image';
import { usePrivateApi } from '@/hooks/usePrivateApi';
import { ActionGear } from '@/components/ActionGear';
import { CardMedTicket } from '../../components/CardMedTicket'
import { BurredBackground } from '@/components/BurredBackground';
import { CardColabTicket } from '@/components/CardColabTicket';
import { NewComment } from '../../components/NewComment'
import { useState } from 'react';
import { motion } from 'framer-motion';

import { CgComment } from 'react-icons/cg'
import { AiOutlineInteraction } from 'react-icons/ai'
import { BsCalendar2Date } from 'react-icons/bs';



export default function TicketPage() {
  const [actionsAndComments, SetactionsAndComments] = useState();
  const router = useRouter();

  const api = usePrivateApi()


  function compararPorData(a, b) {
    const dataA = new Date(a.created_at);
    const dataB = new Date(b.created_at);
    return dataA - dataB;
}

  
  const {data: ticket, isFetching, error, isLoading } = useQuery({
    queryKey: 'ticket', 
    queryFn: async () => {
    const { id } = router.query;
    const response = await api.get(`/api/tarefa/${id}`,);

    console.log(response.data)

    const mergedList = [
      ...response.data.comments,
      ...response.data.actions,
    ];

    mergedList.sort(compararPorData)

    console.log(mergedList)
    SetactionsAndComments(mergedList)

    return response.data;

  },
    refetchOnWindowFocus: false,
  })

  // useEffect(() => {
  //   console.log(actionsAndComments)
  // }, [actionsAndComments, SetactionsAndComments])
  
  console.log(ticket, isFetching, error, isLoading)

  function handleReturnCard(){
    if(ticket?.cadMedico.length > 0){
      return (

        <div className='flex flex-col border-t border-t-border-default space-y-4'>
          <h3 className="pt-3 text-gray-600" ><strong>Dados cadastrais médicos</strong></h3>
          <span className='text-xs text-yellow-500' >
            Clique no card para exibir a modal de informações detalhadas.
          </span>

          <div className='flex space-x-4'>

            {
              ticket?.cadMedico.map((medico) => {
                return(
                  <CardMedTicket medico={medico}/>
                  )
                })
            }
          </div>

        </div>

      )
    }
    if(ticket?.cadColaborador.length > 0){
      return (

        <div className='flex flex-col border-t border-t-border-default space-y-4'>
          <h3 className="pt-3 text-gray-600" ><strong>Dados cadastrais colaboradores</strong></h3>
          <span className='text-xs text-yellow-500' >
            Clique no card para exibir a modal de informações detalhadas.
          </span>

          <div className='flex space-x-4'>

            {
              ticket?.cadColaborador.map((colab) => {
                return(
                  <CardColabTicket colab={colab}/>
                  )
                })
            }
          </div>

        </div>

      )
    }

    if(ticket?.ex_reqs.length > 0){
      return (

        <div className='flex flex-col border-t border-t-border-default space-y-4'>
          <h3 className="pt-3 text-gray-600" ><strong>Requisições para exclusão</strong></h3>

          <div className='flex space-x-4'>

            {
              ticket?.ex_reqs.map((reqs, index) => {
                return(
                  <div key={index}>
                    {reqs.requisicoes}
                  </div>
                  )
                })
            }
          </div>

        </div>

      )
    }
  }

  function verifyImagePrefix(originalURL:string){

    const prefix = "http://127.0.0.1:8000";

    if (!originalURL.startsWith(prefix)) {

      const finalURL = `${prefix}${originalURL}`;
      return finalURL
    } else {

      return originalURL
    }
      }



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
  }
    
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }
    

   return (

    <MainLayout>


      {isLoading || isFetching &&
      
      <BurredBackground>
        <span className='border-[3px] border-t-pink-700 rounded-full w-10 h-10 animate-spin'>

        </span>
      </BurredBackground>
      
      }


      <motion.section
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -1000, opacity: 0 }}
      className='p-10'>

      {!isFetching && ticket && 
      
        <div className='flex flex-col m-auto'>
          {/* xl:w-1/2 */}
          <div className='w-full  bg-white px-3 py-5 rounded-md shadow-md border border-border-default'>

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

              <ActionGear ticket={ticket}/>

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
                        <span className={`min-w-[100px] px-5 py-[5px] text-xs text-center  rounded-md text-white shadow-md ${status[ticket.status]}`}>
                        {ticket.status}
                        </span>
                      </div>
                  </div>
                  <div className='flex justify-between items-center'>
                      <span><strong>Prioridade</strong></span>
                      <div className="flex items-center">
                        <span className={`min-w-[100px] px-5 py-[5px] text-xs text-center  rounded-md text-white shadow-md ${prioridade[ticket.prioridade]}`}>
                        {ticket.prioridade}
                        </span>
                      </div>
                  </div>
                </div>

                </div>

              </div>

              <div className="">

                <h2 className="pt-3 text-gray-600"><strong>Descrição</strong></h2>

                <div className='container py-3 pb-5 break-words ' dangerouslySetInnerHTML={{__html: ticket.description}}></div>

                {/* <div className='flex flex-col gap-5'>
                  {
                    ticket?.additinalData?.map(({tarefa, nome, value}, index) => {
                      return(
                        value && 
                          <div key={index} className='flex flex-row gap-5'>
                            <span>{nome.charAt(0).toUpperCase() + nome.slice(1)}</span> <span>{value}</span>
                          </div>
                      )
                    }) 
                  }
                </div> */}

                <div>
                 {
                  handleReturnCard()
                 }
                </div>
              </div>
          </div>

          <motion.div 
          variants={container}
          initial="hidden"
          animate="visible"
          className='grow flex flex-col'
          >
          {actionsAndComments?.map((actionOrComment, index) => {

            const ProfileImgUrl = verifyImagePrefix(actionOrComment.author.profile.cover_profile)

            const isComment = actionOrComment.comment ? true : false
            
            return(

                //xl:mt-0
                <motion.div 
                variants={item}
                className='grid grid-cols-[1fr,15fr] gap-20 my-12  relative ' key={index}>

                  <div className='w-60  h-10 text-center flex justify-between px-10 items-center bg-white rounded-md z-10 shadow-md text-sm'>
                    <span >{format(new Date(actionOrComment.created_at), 'dd-MM-yyyy')} ás {format(new Date(actionOrComment.created_at), 'HH:mm')}</span>
                    <span className="text-blue-400"><BsCalendar2Date size={14} /></span>
                  </div>
                  <span className='absolute bg-blue-400 w-20 h-1 left-60 top-4 z-0'>

                  </span>
                  <span className='absolute bg-blue-400 w-3 h-3 left-[314px] top-[11.5px] rotate-45 z-10'>
                  </span>
                
                  <div className='flex grow bg-white rounded-md p-5 space-x-4 shadow-md relative'>

                  {isComment ?

                    <h3 className='absolute top-5 right-5 text-xs text-blue-400 '> <CgComment size={18}/></h3>
                    :
                    <h3 className='absolute top-5 right-5 text-xs text-blue-400 '> <AiOutlineInteraction size={18}/></h3>
                  }

                    <div className='w-20 h-20'>
                      <Image
                      src={ProfileImgUrl} 
                      alt=""
                      className='w-16 h-16 rounded-full object-cover'
                      width={500}
                      height={500}
                      />
                    </div>
                    <div className='flex flex-col justify-start w-full'>
                      <h3 className='border-b border-b-border-default text-md font-medium w-full py-3' >{actionOrComment.author.first_name} {actionOrComment.author.last_name}</h3>

                      <div className='py-5'>
                        {
                          isComment ?

                          <div className="break-all" dangerouslySetInnerHTML={{__html: actionOrComment.comment.replace(/<img/g, '<img class="w-[50%]"')}}></div>

                          :

                          <div className="break-all" > {actionOrComment?.action_message} </div>
                        }
                      </div>

                    </div>
                    

                  </div> 
                </motion.div>
            )
          })
        }

        </motion.div >


        </div>
      }

      </motion.section>

      <NewComment ticket={ticket}/>
    </MainLayout>
   
  );
}


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

