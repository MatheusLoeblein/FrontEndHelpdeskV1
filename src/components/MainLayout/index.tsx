import { Logo } from '@/components/Logo';
import { MainSearch } from '@/components/MainSearch';
import { CgMenuGridR } from 'react-icons/cg';
import { Notification } from '@/components/Notification';
import { ProfileConf } from '@/components/ProfileConf';
import { IoMdMenu } from 'react-icons/io';
import { MenuSideBar } from '@/components/MenuSideBar';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { LayoutContext } from '@/context/LayoutContext';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies'
import { Message } from '@/components/Message';

export function MainLayout({children}){


  const { menuOver } = useContext(LayoutContext);
  const { user, isAuthenticated } = useContext(AuthContext);

  return(

  <>
      <header className='flex px-5 fixed top-0 h-20 z-10 bg-white space-x-4 md:space-x-0 md:justify-between md:px-10 items-center  w-screen  py-2 border-b border-b-border-default'>

        <IoMdMenu className="block md:hidden w-8 h-8  text-gray-600" />

        <a href="#"><Logo /></a>

        <MainSearch />

        <div className='hidden md:flex gap-5 items-center'>
          <Notification />
          <div >
            <CgMenuGridR className='w-6 h-6 text-gray-700' />
          </div>

          <ProfileConf imgSrc={`http://127.0.0.1:8000${user?.profileImg}`} />

        </div>

      </header>

        <div className='fixed right-5 bottom-5 flex flex-col gap-2'>
        {isAuthenticated && <Message message="Seja bem vindo! Log in efetuado com sucesso." type="success"/>}
        </div>
        <MenuSideBar />
        <div className='grid grid-cols-[auto,1fr] mt-20'>

          <div className={` duration-300 ${menuOver ? 'w-16' : 'w-72'}`}/>

          {children}



        </div>


  </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'helpdeskauth.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {

    }
  }
}

