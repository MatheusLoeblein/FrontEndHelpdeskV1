"use client"
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

export default function dashboard() {
  const { menuOver } = useContext(LayoutContext);
  console.log('asdadsasd', menuOver)

  const { user } = useContext(AuthContext);

  return (
    <>

      <header className='flex px-5 bg-white space-x-4 md:space-x-0 md:justify-between md:px-10 items-center  w-full  py-2 border-b border-b-border-default'>

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

      <main className='flex'>

        <div className={`${menuOver ? 'w-16' : 'w-72'} z-10`}>
          <MenuSideBar />
        </div>

        <section id='dash' className="flex p-5 flex-grow z-0 ">

          <div className="flex gap-5" id="graphs">
            <div className=" flex flex-col gap-4">

              <div className="flex flex-col border-b border-b-border-default">

                <h2 className="text-2xl font-medium">Tickets Status</h2>
                <p className="text-sm font-normal">Aqui estão quantidades de tickets por status ja abertos</p>
                <div className="flex gap-4 py-5">
                  <div className="flex space-x-5 items-end">
                    <div className="bg-status-ticket-open w-7 h-7 rounded-md relative -rotate-12">
                      <div className="bg-status-ticket-open w-8 h-8 -top-4 -right-4 rounded-full absolute border border-primary-bg border-4"></div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-lg font-medium text-gray-800" >20 Tickets</span>
                      <span className="text-sm">Abertos</span>
                    </div>
                  </div>
                  <div className="flex space-x-5 items-end">
                    <div className="bg-status-ticket-execut w-7 h-7 rounded-md relative -rotate-12">
                      <div className=" bg-status-ticket-execut w-8 h-8 -top-4 -right-4  rounded-full absolute border border-primary-bg border-4"></div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-lg font-medium text-gray-800" >5 Tickets</span>
                      <span className="text-sm">Em execução</span>
                    </div>
                  </div>

                  <div className="flex space-x-5 items-end">
                    <div className=" bg-status-ticket-waiting w-7 h-7 rounded-md relative -rotate-12">
                      <div className=" bg-status-ticket-waiting  w-8 h-8  -top-4 -right-4 rounded-full absolute border border-primary-bg border-4"></div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-lg font-medium text-gray-800" >32 Tickets</span>
                      <span className="text-sm">Aguardando retorno</span>
                    </div>
                  </div>

                  <div className="flex space-x-5 items-end">
                    <div className=" bg-status-ticket-finaly w-7 h-7 rounded-md relative -rotate-12">
                      <div className="bg-status-ticket-finaly  w-8 h-8 -top-4 -right-4 rounded-full absolute border border-primary-bg border-4"></div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-lg font-medium text-gray-800" >1900 Tickets</span>
                      <span className="text-sm">Finalizados</span>
                    </div>
                  </div>
                </div>

              </div>
              <div className="">
                <h2 className="text-2xl font-medium">Total de tickets por mês</h2>
                <p className="text-sm font-normal">Aqui estão as quantidades de tickets mensal</p>

              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 ">

              <div className="bg-white min-w-full rounded-md">1</div>
              <div className="bg-white w-full h-60 rounded-md">2</div>
              <div className="bg-white w-full h-60 rounded-md">3</div>
              <div className="bg-white w-full h-60 rounded-md">4</div>
            </div>
          </div>

        </section>
      </main>

    </>

  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'helpdeskauth.token': token } = parseCookies(ctx)

  if (!token) {
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
