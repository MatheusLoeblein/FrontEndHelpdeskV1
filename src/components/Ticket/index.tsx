
import Image from 'next/image';
import { usePrivateApi } from '@/hooks/usePrivateApi';
import { ActionGear } from '@/components/ActionGear';
import { CardMedTicket } from '@//components/CardMedTicket'
import { BurredBackground } from '@/components/BurredBackground';
import { CardColabTicket } from '@/components/CardColabTicket';
import { NewComment } from '@/components/NewComment'
import {  useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GoPaperclip } from 'react-icons/go';
import { TicketComment } from '@/components/TicketComment';
import { TicketAction } from '@/components/TicketAction';
import { Gallery } from '@/components/Gallery';
import { extractImageUrlsAndCleanHtml } from '@/utils/HtmlTextImageTools';
import { CgComment } from 'react-icons/cg';
import { AiOutlineInteraction } from 'react-icons/ai';
import { useRouter } from 'next/router';
import {status, prioridade} from '@/components/Tickets'
import { format } from 'date-fns';
import { useQuery, useQueryClient } from 'react-query'

export function Ticket({pageId}) {

  const [actionsAndComments, setactionsAndComments] = useState();
  const [ticketDescription, setTicketDescription] = useState();
  const [ticketImgs, setTicketImgs] = useState();
  const [showActions, setShowActions] = useState(true);
  const [showComments, setShowComments] = useState(true);
  const queryClient = useQueryClient();

  const api = usePrivateApi()


  function compararPorData(a, b) {
    const dataA = new Date(a.created_at);
    const dataB = new Date(b.created_at);
    return dataA - dataB;
  }

  function getFileName(fileLink){
    const linkParts = fileLink.split('/');
    const fileName = linkParts[linkParts.length - 1];
    return fileName;

  } 

  const {data: ticket, isFetching, error, isLoading } = useQuery({
    queryKey: 'ticket', 
    queryFn: async () => {
    const response = await api.get(`/api/tarefa/${pageId}`,);

    console.log(response.data)

    const mergedList = [
      ...response.data.comments,
      ...response.data.actions,
    ];

    mergedList.sort(compararPorData)
    
    const {imageUrls, cleanHtml} = extractImageUrlsAndCleanHtml(response.data.description)
    
    setactionsAndComments(mergedList)
    setTicketDescription(cleanHtml)
    setTicketImgs(imageUrls)

    queryClient.invalidateQueries('notifications');


    return response.data;

  },
    refetchOnWindowFocus: false,
  })


  console.log(ticket, isFetching, error, isLoading)

  function handleReturnCard(){
    if(ticket?.cadMedico.length > 0){
      return (

        <div className='flex flex-col border-t border-t-border-default relative space-y-4 my-5 relative '>
          <h3 className="text-gray-600 bg-white absolute pr-2 -top-4" ><strong>Dados cadastrais médicos</strong></h3>
          <span className='text-xs text-yellow-500' >
            Clique no card para exibir a modal de informações detalhadas.
          </span>

          <div className='flex space-x-4'>

            {
              ticket?.cadMedico.map((medico, index) => {
                return(
                  <CardMedTicket medico={medico} key={index}/>
                  )
                })
            }
          </div>

        </div>

      )
    }
    if(ticket?.cadColaborador.length > 0){
      return (

        <div className='flex flex-col border-t border-t-border-default space-y-4 relative my-5'>
          <h3 className="text-gray-600 bg-white absolute pr-2 -top-4" ><strong>Dados cadastrais colaboradores</strong></h3>
          <span className='text-xs text-yellow-500' >
            Clique no card para exibir a modal de informações detalhadas.
          </span>

          <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-4 lg:max-w-4xl md:max-w-lg'>

            {
              ticket?.cadColaborador.map((colab, index) => {
                return(
                  <CardColabTicket colab={colab} key={index}/>
                  )
                })
            }
          </div>

        </div>

      )
    }

    if(ticket?.ex_reqs.length > 0){
      return (

        <div className='flex flex-col border-t border-t-border-default space-y-4 relative my-5'>
          <h3 className=" text-gray-600 bg-white absolute pr-2 -top-4 " ><strong>Requisições para exclusão</strong></h3>

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


  return(
    
    <>
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
          <div className=' flex flex-col w-full relative bg-white px-3 py-5 rounded-md shadow-md border border-border-default'>

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
                  <p>adicionado por <strong>{ticket.author.first_name} {ticket.author.last_name}</strong> em 
                  {format(new Date(ticket.data_at), 'dd-MM-yyyy')} ás {format(new Date(ticket.data_at), 'HH:mm')}</p>
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
                    <span><strong>Setor do Autor</strong></span>
                    <span>{ticket.author?.profile?.Category?.name ? ticket.author.profile.Category.name : '--'}</span>
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
                    
                    <span>{ticket.Category.name ? ticket.Category.name : '--'}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                      <span><strong>Status</strong></span>
                      <div className="flex items-center">
                        <span className={`min-w-[100px] px-5 py-[5px] text-xs text-center rounded-md text-white shadow-md ${status[ticket.status]}`}>
                        {ticket.status}
                        </span>
                      </div>
                  </div>
                  <div className='flex justify-between items-center'>
                      <span><strong>Prioridade</strong></span>
                      <div className="flex items-center">
                        <span className={`min-w-[100px] px-5 py-[5px] text-xs text-center rounded-md text-white shadow-md ${prioridade[ticket.prioridade]}`}>
                        {ticket.prioridade}
                        </span>
                      </div>
                  </div>
                </div>

                </div>

              </div>

              <div className="relative">

                <h3 className=' text-md font-medium pr-2 bg-white position text-gray-600 absolute top-[-17px] left-0'><strong>Descrição</strong></h3>

                <div className='container py-3 pb-5 mt-2 break-words break-all ' dangerouslySetInnerHTML={{__html: ticketDescription}}></div>

                {
                  ticketImgs?.length > 0 &&

                  <Gallery imageUrls={ticketImgs} Author={ticket.author} authorImageUrl={ticket.author?.profile.cover_profile} />}

                <div>
                 {
                  handleReturnCard()
                 }
                </div>


                {
                  ticket.file &&

                  <div className='flex gap-4 flex-col border-t border-border-default w-full relative mt-10'>
                    <h3 className=' text-md font-medium pr-2 bg-white position text-gray-600 absolute -top-3 left-0'><strong>Arquivos anexados</strong></h3>

                    <div className='flex gap-2 items-center  mt-5'>
                      <span className=' text-blue-400 '>

                      <GoPaperclip size={10}/>
                      </span>
                      <a 
                      className='text-sm hover:underline'
                      target='_blank'
                      href={ticket.file}
                      >
                        {getFileName(ticket.file)}
                      </a>
                    </div>
                    
                  </div>
                }
              </div>


          </div>

          {
            actionsAndComments?.length > 0 && 
            <div className='self-end mt-5  bg-white flex border-b border-b-border-default rounded-md shadow-md'>
              <button
              className={`px-7 py-2 items-center gap-2 flex relative ${ showActions && showComments ? 'bg-primary-formedica text-white rounded-l-md' : 'cursor-pointer'} `}
              onClick={() => {
                setShowActions(true)
                setShowComments(true)
              }}
              disabled={showActions && showComments}
              >
                <span>Tratativas</span>
                <span className='flex'>
                  <span className={`${ showActions && showComments ? 'bg-primary-formedica' : 'bg-white'}`}>
                  <CgComment/>
                  </span>
                  <span className={` ml-[-6px] ${ showActions && showComments ? 'bg-primary-formedica' : 'bg-white'}`}>
                  <AiOutlineInteraction/>
                  </span>
                </span>

                { showActions && showComments &&
                  <span className='bg-primary-formedica w-5 h-5 absolute -bottom-2 left-4 rotate-45'></span>
                }
                
                </button>
              <button
              className={`px-7 py-2 items-center gap-2 flex relative ${ticket.comments.length < 1 ? 'cursor-default' : 'cursor-pointer'} 
              ${ !showActions && showComments && 'bg-primary-formedica text-white' } `}
              onClick={() => {
                setShowActions(false)
                setShowComments(true)
              }}
              disabled={ticket.comments.length < 1}
              >
                <span>Comentarios</span>
                <CgComment/>  

                { !showActions && showComments &&
                  <span className='bg-primary-formedica w-5 h-5 absolute -bottom-2 left-4 rotate-45'></span>
                }
                
              </button>
              <button 
              className={`px-7 py-2 items-center gap-2 flex relative ${ticket.actions.length < 1 ? 'cursor-default' : 'cursor-pointer'} 
              ${ showActions && !showComments && 'bg-primary-formedica text-white rounded-r-md'} `}
              onClick={() => {
                setShowActions(true)
                setShowComments(false)
              }}
              disabled={ticket.actions.length < 1}
              > 
              <span>Ações</span>
              <AiOutlineInteraction/> 

              { showActions && !showComments &&
                  <span className='bg-primary-formedica w-5 h-5 absolute -bottom-2 left-4 rotate-45'></span>
              }

              </button>
            </div>

          }

            <AnimatePresence>

              { showActions && showComments && 

                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="visible"
                  exit={{opacity: 0 , height: 0}}
                  className='grow flex flex-col'
                  >
                    {actionsAndComments?.map((actionOrComment, index) => {

                      const isComment = actionOrComment.comment ? true : false
                        
                      return(
                          isComment ?
                          <TicketComment comment={actionOrComment} variants={item} key={index}/>

                          :

                          <TicketAction action={actionOrComment} variants={item} key={index}/>
                        
                        )
                      })}

                </motion.div >

              }
            </AnimatePresence>

            <AnimatePresence>

              { !showActions && showComments && 

                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="visible"
                  className='grow flex flex-col'>
                  
                  {
                    ticket.comments?.map((comment, index) => {
                      
                      return(
                        <TicketComment comment={comment} variants={item} key={index}/>
                        )
                      })
                    }

                </motion.div>
              }


            </AnimatePresence>

            <AnimatePresence>
              

              { showActions && !showComments && 

              <motion.div 
                variants={container}
                initial="hidden"
                animate="visible"
                className='grow flex flex-col'>
                {
                  ticket.actions?.map((action, index) => {
                    
                    return(
                      <TicketAction action={action} variants={item} key={index}/>
                      )
                    })
                  }
              </motion.div>
              }

            </AnimatePresence>


        </div>

      }

      </motion.section>

      <NewComment ticket={ticket}/>
    </>
  )
}