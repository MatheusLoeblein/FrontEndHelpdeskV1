
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from 'react-query';
import { usePrivateApi } from '@/hooks/usePrivateApi';
import format from 'date-fns/format';
import { BiSolidTimeFive } from 'react-icons/bi';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { ImNotification } from 'react-icons/im';
import { AiOutlineFieldTime } from 'react-icons/ai';

export function Notification() {
  const [contentVisible, setContentVisible] = useState(true);
  const notificationRef = useRef(null);
  const api = usePrivateApi()

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
    return response.data;

  },
    refetchOnWindowFocus: false,
  })




  return (
    <div className='relative' ref={notificationRef}>
      <IoMdNotificationsOutline
        className='w-6 h-6 text-gray-700 cursor-pointer'
        onClick={() => setContentVisible(!contentVisible)}
      />

      {contentVisible && (
        <div className='relative'>
          <div className='absolute w-5 h-5 bg-white transform rotate-45 origin-bottom right-2 top-[35.5px] border-t border-l rounded-tl-md border-border-default z-10'></div>
          <div className='w-96  bg-white border border-border-default absolute -right-3 top-12 rounded-md rounded-tl-md shadow-md '>

        {
          notifications.length > 0 ?

        <>
            
            <div className='flex text-md justify-between pt-1 pb-2 px-2 items-center border-b border-b-border-default'>
            <h3 className='font-medium'>Notificações</h3> 
            <button className='flex text-xs z-20 text-primary-formedica hover:underline'>Marcar todas como lidas</button>
          </div>
          
          <div className='bg-primary-bg h-96  overflow-hidden hover:overflow-y-scroll' >



            { isFetching && isLoading &&

              <div className='h-52 flex items-center justify-center'>
                <span className='border-[3px] border-gray-300 w-6 h-6 rounded-full border-t-primary-formedica animate-spin'></span>
              </div>
              
            }

            { !isFetching && !isLoading &&
              notifications.map( (notification, index) => {

                const formattedDate = format(new Date(notification.timestamp), 'HH:mm') + ' - ' + format(new Date(notification.timestamp), 'MMMM, dd, yyyy')
                .replace('January', 'Janeiro')
                .replace('February', 'Fevereiro')
                .replace('March', 'Março')
                .replace('April', 'Abril')
                .replace('May', 'Maio')
                .replace('June', 'Junho')
                .replace('July', 'Julho')
                .replace('August', 'Agosto')
                .replace('September', 'Setembro')
                .replace('October', 'Outubro')
                .replace('November', 'Novembro')
                .replace('December', 'Dezembro');
                
                return(
                  <>
                                    <div key={index} className='flex items-start justify-between border-b border-b-border-default last:border-0 bg-white hover:bg-gray-200 cursor-pointer'>
                    <div className='flex'>

                      <div className='w-14 h-14 py-2 pl-3'>
                        <img className='w-8 h-8 object-cover rounded-full' src={notification.sender.profile.cover_profile} alt="Profile-Cover" />
                      </div>

                      <div className='flex flex-col py-2'>
                        <div className='text-xs font-medium'>
                          {notification.sender.first_name} {notification.sender.last_name}
                        </div>
                        <p className='text-xs py-2'>
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

                  </div>                  <div key={index} className='flex items-start justify-between border-b border-b-border-default last:border-0 bg-white hover:bg-gray-200 cursor-pointer'>
                    <div className='flex'>

                      <div className='w-14 h-14 py-2 pl-3'>
                        <img className='w-8 h-8 object-cover rounded-full' src={notification.sender.profile.cover_profile} alt="Profile-Cover" />
                      </div>

                      <div className='flex flex-col py-2'>
                        <div className='text-xs font-medium'>
                          {notification.sender.first_name} {notification.sender.last_name}
                        </div>
                        <p className='text-xs py-2'>
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

                  </div>                  <div key={index} className='flex items-start justify-between border-b border-b-border-default last:border-0 bg-white hover:bg-gray-200 cursor-pointer'>
                    <div className='flex'>

                      <div className='w-14 h-14 py-2 pl-3'>
                        <img className='w-8 h-8 object-cover rounded-full' src={notification.sender.profile.cover_profile} alt="Profile-Cover" />
                      </div>

                      <div className='flex flex-col py-2'>
                        <div className='text-xs font-medium'>
                          {notification.sender.first_name} {notification.sender.last_name}
                        </div>
                        <p className='text-xs py-2'>
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

                  </div>                  <div key={index} className='flex items-start justify-between border-b border-b-border-default last:border-0 bg-white hover:bg-gray-200 cursor-pointer'>
                    <div className='flex'>

                      <div className='w-14 h-14 py-2 pl-3'>
                        <img className='w-8 h-8 object-cover rounded-full' src={notification.sender.profile.cover_profile} alt="Profile-Cover" />
                      </div>

                      <div className='flex flex-col py-2'>
                        <div className='text-xs font-medium'>
                          {notification.sender.first_name} {notification.sender.last_name}
                        </div>
                        <p className='text-xs py-2'>
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
                  </>
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