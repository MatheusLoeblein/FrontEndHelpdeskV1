
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { usePrivateApi } from '@/hooks/usePrivateApi';
import format from 'date-fns/format';
import { BiSolidTimeFive } from 'react-icons/bi';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { ImNotification } from 'react-icons/im';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { DatePtTranslate } from '@/utils/datePtTranslat';
import { parseCookies } from 'nookies'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export function Notification() {
  const [contentVisible, setContentVisible] = useState(false);
  const notificationRef = useRef(null);
  const toastId = useRef();

  const router = useRouter()
  const api = usePrivateApi()
  const queryClient = useQueryClient();
  const { 'helpdeskauth.token': token } = parseCookies();
  const [notificationCounter, setNotificationCounter] = useState<Number>(0);

  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/reload-notification/?token=${token}`);

    socket.onopen = () => {
      console.log('Conectado ao servidor WebSocket');
    };

    socket.onmessage = (event) => {
      const { data } = JSON.parse(event.data); // Destructuring e parse do JSON
      console.log('Mensagem recebida do servidor:', data);
    
      if (data === "reload-notifications") {
        queryClient.invalidateQueries('notifications');
      }
    };

    return () => {
      socket.close();
    };
  }, []);


  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setContentVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  
  const {data: notifications, isFetching, error, isLoading } = useQuery({
    queryKey: 'notifications', 
    queryFn: async () => {
    const response = await api.get(`/notifications/get-user-notifications/`)
    console.log(response.data)

    setNotificationCounter(response.data.length)
    return response.data;

  },
    refetchOnWindowFocus: false,
  })


  const { mutate, isLoading: postLoading, isSuccess } = useMutation(
    'notificationsviewed',
    async (data) => {
      const response = await api.patch(`/notifications/mark-viewed-user-notifications/${data.id}/`, data.data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notifications');
      },
       onError: () => {
        toast.error('Deu ruim');
      },
    }
  );


  function handleNotificationClick(modelName, modelId){

    router.push( `/ticket/${modelId}`)

  }


  
  function handleGetCurrenteModelUrl(modelName:string, objectId:number) {

    const registredModels = {
      'ticket': `/ticket/${objectId}`,
      'ticket-action': `/ticket/${objectId}` ,
      'ticket-comment': `/ticket/${objectId}`
    } 

    return registredModels[modelName]
    
  }


  return (
    <div className='relative' ref={notificationRef}>
      <div className='relative'
      onClick={() => setContentVisible(!contentVisible)}
      >
        <IoMdNotificationsOutline className='w-6 h-6 text-gray-700 cursor-pointer'/>

        { notificationCounter != 0 &&
          <div className='absolute -top-[2px] -right-[1px] text-white  text-[10px] min-w-[15px] min-h-[15px] rounded-full bg-red-500 flex items-center justify-center'><span>{notificationCounter}</span></div>
        }
      </div>

      {contentVisible && (
        <div className='relative'>
          <div className='absolute w-5 h-5 bg-white transform rotate-45 origin-bottom right-2 top-[35.5px] border-t border-l rounded-tl-md border-border-default z-10'></div>
          <div className='w-96  bg-white border border-border-default absolute -right-3 top-12 rounded-md rounded-tl-md shadow-md '>

        {
          notifications?.length > 0 ?

        <>
            
            <div className='flex text-md justify-between pt-1 pb-2 px-2 items-center border-b border-b-border-default'>
            <h3 className='font-medium'>Notificações</h3> 
            <button className='flex text-xs z-20 text-primary-formedica hover:underline'>Marcar todas como lidas</button>
          </div>
          
          <div className={`bg-primary-bg min-h-42 max-h-96 ${notifications?.length > 3 && 'overflow-y-scroll'}`} >



            {/* { isFetching && isLoading &&

              <div className='h-52 flex items-center justify-center'>
                <span className='border-[3px] border-gray-300 w-6 h-6 rounded-full border-t-primary-formedica animate-spin'></span>
              </div>
              
            } */}

            { !isFetching && !isLoading &&
              notifications.map( (notification, index) => {

                const date = format(new Date(notification.timestamp), 'HH:mm') + ' - ' + format(new Date(notification.timestamp), 'MMMM, dd, yyyy')
                const formattedDate = DatePtTranslate(date)

                const ProfileImg = notification?.sender?.profile?.cover_profile
                
                const modelUrl = handleGetCurrenteModelUrl(notification.model_name, notification.object_id)

                return(
                  <Link
                  href={modelUrl}
                  as={modelUrl}
                  key={index} 
                  >
                    <div className='flex items-start justify-between border-b border-b-border-default bg-white hover:bg-gray-200 cursor-pointer'
                    >
                      <div className='flex gap-1'>

                        <div className='w-14 h-14 py-2 pl-3'>
                          <Image 
                          className='w-8 h-8 object-cover rounded-full' 
                          src={ProfileImg ? ProfileImg : 'assets/defaultProfileImg.svg'} 
                          alt="Profile-Cover" 
                          width={500}
                          height={500}
                          />
                        </div>

                        <div className='flex flex-col grow py-2'>
                          <div className='text-xs font-medium'>
                            {notification.sender.first_name} {notification.sender.last_name}
                          </div>
                          <p className='w-64 text-xs py-2 break-words '>
                            {notification.message}
                          </p>

                          <div className='text-sm py-2 flex gap-1 items-center'>
                          <span className='text-gray-600'> <AiOutlineFieldTime size={20} /> 
                          </span><span>{formattedDate}</span>
                          </div>
                        </div>

                      </div>

                      <button className='border border-border-default mr-5 mt-2 flex justify-center items-center bg-white p-1 rounded-md' title='Marcar notificação como lida'>
                        <IoCheckmarkDoneSharp size={17}/>
                      </button>

                    </div>
                  </Link>
                )
              })
            }

          </div>

          <div className='flex text-md justify-center p-2 items-center border-t border-t-border-default'>
            <button className='flex text-xs z-20  text-primary-formedica hover:underline'>Historico de notificações</button>
          </div>
        </>

        :

        <div className='p-2 flex items-center justify-center'>
          <span className='flex gap-3 items-center'> <ImNotification/> Nenhuma notificação para você</span>
        </div>
        }

          </div>
        </div>
        )}
    </div>
  );
}