import { useState, useEffect, useRef, ReactNode } from 'react';
import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';


export function ProfileConf() {
  const [contentVisible, setContentVisible] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setContentVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='w-10 h-10 rounded-full bg-gray-300 relative' onClick={() => setContentVisible(!contentVisible)} ref={notificationRef}>
          {
            user && user.profileImg &&
            <Image src={`http://127.0.0.1:8000${user?.profileImg}`}
            alt="Profile" 
            className='w-10 h-10 rounded-full object-cover align-middle' 
            width={500}
            height={500}
            />
          }

      { 
        contentVisible &&
        <div className='relative'>
          <div className='w-60 h-72 bg-white border border-border-default absolute -right-1 top-10 rounded-md rounded-tl-md shadow-md'></div>
          <div className='absolute w-5 h-5 bg-white transform rotate-45 origin-bottom right-4 top-[28.5px] border-t border-l rounded-tl-md border-border-default'></div>
        </div>
      }
    </div>
  );
}