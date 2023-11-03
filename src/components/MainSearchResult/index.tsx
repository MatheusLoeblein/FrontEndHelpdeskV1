import { usePrivateApi } from '@/hooks/usePrivateApi';
import { useQuery } from 'react-query';
import {useState} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {status, prioridade} from '@/components/Tickets'
import { BiSolidUser } from 'react-icons/bi'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FaSlackHash } from 'react-icons/fa'
import { AiFillTags } from 'react-icons/ai'

export function MainSearchResult({ searchParams, onClick }) {
    const [tickets, setTickets] = useState();
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
                {searchResults?.count_results} itens encontrados
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
         tickets &&
            <>
            <h2 className=''>Tickets</h2>
            <div className='py-2 grid grid-cols-6 gap-3 '>

                {   
                    tickets.map((ticket, index) => {
                        return(
                            <div 
                            className='border flex flex-col gap-1 border-border-default rounded-md shadow-md bg-white p-2 hover:scale-105 transition-all cursor-pointer'
                            key={index}
                            onClick={() => handleClick(`/ticket/${ticket.id}`)}
                            >

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

                                <div className='flex flex-col gap-2'>
                                    <div className='flex gap-1 items-center border-b py-1 border-border-default'>
                                        <AiFillTags/>
                                        <span>Tags</span>

                                    </div>
                                    <div className='flex flex-col gap-1  '>
                                        <span className={`min-w-[100px] px-5 py-[5px] text-xs text-center rounded-md text-white shadow-md bg-gray-400`}>
                                            {ticket.tipe.tipe}
                                        </span>
                                        <span className={`min-w-[100px] px-5 py-[5px] text-xs text-center rounded-md text-white shadow-md ${status[ticket.status]}`}>
                                            {ticket.status}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }

            </div>
            </>
        }
    </AnimatePresence>
        </div>
    </div>

    )
}