import { useState, useEffect, useRef, ReactNode } from 'react';

interface ProfileConfProps {
  imgSrc: string;
}

export function ProfileConf({ imgSrc }: ProfileConfProps) {
  const [contentVisible, setContentVisible] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

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
      <img src={imgSrc} alt="Profile" className='rounded-full w-10 h-10' />

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