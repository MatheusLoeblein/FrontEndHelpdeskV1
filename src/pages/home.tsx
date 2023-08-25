"use client"
import { Logo } from '@/components/Logo';
import { MainSearch } from '@/components/MainSearch';
import {CgMenuGridR} from 'react-icons/cg';
import { Notification } from '@/components/Notification';
import { ProfileConf } from '@/components/ProfileConf';
import '../app/globals.css';
import 'tailwindcss/tailwind.css';

import {IoMdMenu} from 'react-icons/io';
import { MenuSideBar } from '@/components/MenuSideBar';

export default function Home() {
  
  return (
    <>
    
    <header className='flex px-5 bg-white space-x-4 md:space-x-0 md:justify-between md:px-10 items-center  w-full  py-2 border-b border-b-border-default'>

      <IoMdMenu className="block md:hidden w-8 h-8  text-gray-600"/>

      <a href="#"><Logo /></a>

      <MainSearch/>

      <div className='hidden md:flex gap-5 items-center'>
        <Notification/>
        <div >
          <CgMenuGridR className='w-6 h-6 text-gray-700'/>
        </div>

        <ProfileConf imgSrc='http://helpdeskformedica.com.br/media/helpdesk/profile/imgs/2023/01/16/250311720_302649865262480_2854683294034278713_n.jpg'/>

      </div>
      
    </header>
    <MenuSideBar/>

    </>

  )
}
