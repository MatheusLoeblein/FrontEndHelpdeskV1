import { Logo } from '@/components/Logo';
import { MainSearch } from '@/components/MainSearch';
import { CgMenuGridR } from 'react-icons/cg';
import { Notification } from '@/components/Notification';
import { ProfileConf } from '@/components/ProfileConf';
import { IoMdMenu } from 'react-icons/io';
import { MenuSideBar } from '@/components/MenuSideBar';
import { ReactNode, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { LayoutContext } from '@/context/LayoutContext';
import { Message } from '@/components/Message';
import Link from 'next/link'
import { motion } from 'framer-motion';

interface MainLayout {
  children: ReactNode;
}


export function MainLayout({children}: MainLayout){

  const { menuOver } = useContext(LayoutContext);
  const { messages } = useContext(AuthContext);
  
  return(

  <>
      <header className='flex px-5 fixed top-0 h-20 z-10 bg-white space-x-4 md:space-x-0 md:justify-between md:px-10 items-center  w-screen  py-2 border-b border-b-border-default'>

        <IoMdMenu className="block md:hidden w-8 h-8  text-gray-600" />

        <Link href="/"><Logo /></Link>

        <MainSearch />

        <div className='hidden md:flex gap-5 items-center'>
          <Notification />
          <div >
            <CgMenuGridR className='w-6 h-6 text-gray-700' />
          </div>

          <ProfileConf/>

        </div>

      </header>


      <div className="fixed top-28 right-5 flex flex-col gap-2 z-[60]">
                 
        { messages && messages.map((message, index) =>{ 
          return(
            <Message message={message.text} type={message.type} key={index}/>
          )
        })}

      </div>    
        
        <MenuSideBar />
        <div className='grid grid-cols-[auto,1fr] mt-20 overflow-hidden'>

          <div className={` duration-300 ${menuOver ? 'w-16' : 'w-72'}`}/>

            {children}

        </div>


  </>
  )
}