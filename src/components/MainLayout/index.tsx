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
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion';
import { FaReact } from 'react-icons/fa'
import { SiDjango } from 'react-icons/si'
import { BiLogoTailwindCss } from 'react-icons/bi'
import { VscVersions } from 'react-icons/vsc'

interface MainLayout {
  children: ReactNode;
}


export function MainLayout({children}: MainLayout){

  const { menuOver } = useContext(LayoutContext);
  
  return(

  <AnimatePresence>
      <header className='flex px-5 fixed top-0 h-20 bg-white space-x-4 md:space-x-0 md:justify-between md:px-10 items-center  w-screen  py-2 border-b border-b-border-default z-30'>

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
        
        <MenuSideBar />
        <main className='grid grid-cols-[auto,1fr] mt-20 overflow-hidden'>

          <div className={` duration-300 ${menuOver ? 'w-16' : 'w-72'}`}/>

          <div className='min-h-screen flex flex-col justify-between'>
            {children}

            <footer className='flex p-8 w-full border-t border-t-border-default bg-white font-medium text-primary-formedica'>
              <div className='flex justify-between w-full items-center'>
                <a className='flex text-xs items-center gap-3'
                href='https://matheusloeblein.com/'
                target='_blank'
                >
                  <img src="/assets/MLSOFTWARE.svg" alt="" className='w-12 h-12'/>
                  <div className='flex flex-col'>
                    <span className='text-sm'>Matheus Loeblein</span>
                    <span className='text-xs'>Software Engineer</span>
                    
                  </div>
                </a>
                <div className='flex flex-col items-center justify-center gap-2'>
                  <div className='flex gap-2'>
                        <SiDjango size={27}/>
                        <FaReact size={27}/>
                        <BiLogoTailwindCss size={27}/>
                  </div>
                      <span className='text-sm'>Powered By Django, React, Tailwind</span>  
                </div>
                <div className='font-medium text-sm flex gap-1 items-center'><VscVersions size={20}/> <span>v2.0</span></div>
              </div>

            </footer>

          </div>


        </main>




  </AnimatePresence>
  )
}