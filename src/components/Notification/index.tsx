
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useState, useEffect, useRef } from 'react';



export function Notification() {
  const [contentVisible, setContentVisible] = useState(false);
  const notificationRef = useRef(null);

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

  return (
    <div className='relative' ref={notificationRef}>
      <IoMdNotificationsOutline
        className='w-6 h-6 text-gray-700 cursor-pointer'
        onClick={() => setContentVisible(!contentVisible)}
      />

      {contentVisible && (
        <div className='relative'>
          <div className='w-52 h-80 bg-white border border-border-default absolute -right-3 top-12 rounded-md rounded-tl-md shadow-md'>

          </div>
          <div className='absolute w-5 h-5 bg-white transform rotate-45 origin-bottom right-2 top-[35.5px] border-t border-l rounded-tl-md border-border-default'></div>
        </div>
      )}
    </div>
  );
}