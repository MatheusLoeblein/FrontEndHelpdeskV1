"use client"
import { Logo } from '@/components/Logo';
import { MainSearch } from '@/components/MainSearch';
import {CgMenuGridR} from 'react-icons/cg';
import { Notification } from '@/components/Notification';
import { ProfileConf } from '@/components/ProfileConf';
import {IoMdMenu} from 'react-icons/io';
import { MenuSideBar } from '@/components/MenuSideBar';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies'

export default function dashboard() {
  
  const {user, isAuthenticated} = useContext(AuthContext);
  console.log(isAuthenticated)
  
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

        <ProfileConf imgSrc={`http://127.0.0.1:8000${user?.profileImg}`}/>

      </div>
      
    </header>
    <MenuSideBar/>

    </>

  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {'helpdeskauth.token': token} = parseCookies(ctx)

  if (!token){
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  return {
    props: {

    }
  }
}
