import { usePrivateApi } from '@/hooks/usePrivateApi';
import { useQuery } from 'react-query';
import {useState} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {status, prioridade} from '@/components/Tickets'
import { BiSolidUser } from 'react-icons/bi'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FaSlackHash } from 'react-icons/fa'
import { AiFillTags } from 'react-icons/ai'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { format } from 'date-fns';


export function MainSearchResult({ searchParams, onClick }) {
    const [tickets, setTickets] = useState();
    const [ticketsOpen, setTicketsOpen] = useState(false);
    const api = usePrivateApi();

    const {data: searchResults, isFetching, error, isLoading } = useQuery({
      queryKey: 'searchAll', 
      queryFn: async () => {
      const response = await api.get(`/api/search/?search=${searchParams}`)
      console.log(response.data)
      setTickets(response.data.tickets)
  
      return response.data;
  
    },
      refetchOnWindowFocus: false,
    })

    

    function handleClick(href) {
        onClick(href)
    }


    return (
  
    <div className='flex flex-col mt-2 max-h-[700px] text-md bg-white border border-border-default rounded-md shadow-md '>
        <h1 className='text-lg font-medium border-b p-2 border-b-border-default'>
            Resultado: 
            <span 
            className='font-normal text-sm px-2'
            >
                {   
                    tickets && 
                    <span>{searchResults?.count_results} itens encontrados</span>
                }
            </span>
            
            </h1>
        <div className='flex max-h-[90%] overflow-y-auto flex-col px-3' >


            { isFetching &&

                <div className='flex m-auto'> 
                    <span className='self-center justify-self-center border-2 w-7 h-7 border-gray-300 border-t-primary-formedica rounded-full m-7 animate-spin '></span>
                </div>
            }


    <AnimatePresence>
        {        
         tickets && tickets.length > 0 &&
            <>
            <h2 className='px-3 flex justify-between items-center py-2 my-1 rounded-md text-lg font-medium border border-border-default cursor-pointer hover:border-blue-300 hover:text-blue-400 hover:ring-1 hover:ring-blue-100 transition-colors'
            onClick={() => setTicketsOpen(!ticketsOpen)}
            >
                <span className='flex gap-2 items-center'>Tickets
                    <span
                    className='font-normal text-sm'
                    >({tickets.length})</span>
                </span>

                <MdOutlineKeyboardArrowDown className={` ${ticketsOpen && 'rotate-180'}`} size={25}/>

            </h2>

            <AnimatePresence>


                {   
                    ticketsOpen && 
                    <motion.div 
                    initial={{opacity:0, height: 0 }}
                    animate={{opacity:1, height: 'auto' }}
                    transition={{type:'tween' , delayChildren: 1, staggerChildren: 0.2}}

                    exit={{opacity:0, height: 0}}


                    className='py-2 grid lg:grid-cols-1 xl:grid-cols-2 gap-3 '>

                        {   

                            tickets.map((ticket, index) => {
                                return(
                                    <motion.div
                                    initial={{opacity:0}}
                                    animate={{opacity:1}}
                                    className='border relative grid grid-cols-[2fr,3fr] gap-1 border-border-default rounded-md shadow-md bg-white p-2 hover:border-blue-300 hover:ring-2 hover:ring-blue-200 transition-all cursor-pointer'
                                    key={index}
                                    onClick={() => handleClick(`/ticket/${ticket.id}`)}
                                    >

                                        <div className=' flex flex-col justify-between px-2'>
                                            <div className='flex gap-1 items-center'>
                                                <FaSlackHash/>
                                                <span>{ticket.id}</span>
                                            </div>
                                            <span>{ticket.title}</span>


                                            <div className='flex gap-1 items-center'>
                                                <BsFillPeopleFill/>
                                                <span>{ticket.Category.name}</span>

                                            </div>
                                            <div className='flex gap-1 items-center'>
                                                <BiSolidUser/>
                                                <span>{ticket.author?.first_name}</span> 
                                                <span>{ticket.author?.last_name}</span>
                                            
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-2 border-l border-border-default px-2'>
                                            <div className='flex gap-1 items-center '>
                                                <AiFillTags/>
                                                <span>Tags</span>

                                            </div>
                                            <div className='flex flex-col gap-1  '>
                                                <span className={`w-max px-5 py-[5px] text-xs text-center rounded-md text-white shadow-md ${status[ticket.status]}`}>
                                                    {ticket.status}
                                                </span>
                                                <span className={`min-w-max max-w-[50px]   px-5 py-[5px] text-xs text-center rounded-md text-white shadow-md bg-gray-400 break-words`}>
                                                    {ticket.tipe.tipe}
                                                </span>
                
                                            </div>
                                        </div>


                                        <div className='flex gap-2 absolute right-0 justify-end text-[12px] p-2 '>
                                            <span><strong>Último Feedback</strong></span>
                                            <span>{format(new Date(ticket.data_up_at), 'dd-MM-yyyy')} ás {format(new Date(ticket.data_up_at), 'HH:mm')}</span>
                                        </div>

                                    </motion.div>
                                )
                            })
                        }

                    </motion.div >
                }

            </AnimatePresence>
            </>
        }
    </AnimatePresence>
        </div>
    </div>
    
    )
}