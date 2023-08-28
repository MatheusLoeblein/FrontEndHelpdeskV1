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
import Image from 'next/image'

export default function dashboard() {
  const { menuOver } = useContext(LayoutContext);

  const { user } = useContext(AuthContext);

  return (
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

      <MenuSideBar />
      <div className='grid grid-cols-[auto,1fr] mt-20'>

        <div className={` duration-300 ${menuOver ? 'w-16' : 'w-72'}`}>

        </div>

        <section id='dash' className="flex flex-col gap-4">

          <div className="flex p-5 flex-col xl:flex-row xl:justify-between gap-5" id="graphs">
            <div className=" flex flex-col gap-4">

              <div className="flex flex-col border-b border-b-border-default">

                <h2 className="text-2xl font-medium">Tickets Status</h2>
                <p className="text-sm font-normal">Aqui estão quantidades de tickets por status ja abertos</p>
                <div className="flex gap-4 flex-col md:flex-row py-5">
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

            <div className="xl:w-[55rem] h-[45rem] md:grid-cols-2 container grid grid-cols-1 gap-4 t">

              <div className="bg-white rounded-md shadow-md container"></div>
              <div className="bg-white rounded-md shadow-md"></div>
              <div className="bg-white rounded-md shadow-md"></div>
              <div className="bg-white rounded-md shadow-md"></div>
            </div>
          </div>


          <div className='flex p-5 flex-col bg-white'>

            <div className="flex justify-between items-end border-b pb-10 border-b-border-default">
              <div>
                <h1 className="text-2xl font-medium">Tickets</h1>
                <p className="text-sm font-normal">Tickets de atendimento, você pode filtrar de acordo com a sua necessidade</p>
              </div>

              <div className="flex gap-1">
                <input type="search" className='h-8 w-80 p-2 rounded-md border-border-default text-xs'/>

                <select name="filterTicket" className='h-8 p-2 w-max rounded-md border-border-default text-xs' id="filterTicket">
                  <option value="valor1">Abertos</option>
                  <option value="valor1">Em execução</option>
                  <option value="valor1">Aguardando Retorno</option>
                  <option value="valor1">Finalizados</option>
                </select>
              </div>

            </div>

            <div className="flex flex-col py-1 border-b border-b-border-default">

              <div className="flex justify-between w-full py-1 items-center">

                <div className="flex flex-col gap-3 w-96 border-b border-b-border-default py-3 ">
                  <h3 className='text-lg font-semibold '>
                  # 1939 | Computadores
                  </h3>

                  <p className='text-xs'>
                  Último feedback | 14/07/23 às 08:16
                  </p>

                </div>
                <div className="flex items-center gap-4">

                    <img 
                    className="w-10 h-10 rounded-full"
                    src={`http://127.0.0.1:8000${user?.profileImg}`} 
                    alt="Teste" 
                    />

                    Matheus Loeblein


                </div>
                <div className="flex items-center gap-2">
                <img 
                    className="w-10 h-10 rounded-full"
                    src={`http://127.0.0.1:8000${user?.profileImg}`} 
                    alt="Teste" 
                    />

                <img 
                    className="w-10 h-10 rounded-full"
                    src={`http://127.0.0.1:8000${user?.profileImg}`} 
                    alt="Teste" 
                    />

                <img 
                    className="w-10 h-10 rounded-full"
                    src={`http://127.0.0.1:8000${user?.profileImg}`} 
                    alt="Teste" 
                  />
                    

                </div>
                <div className="flex">

                  <span className='px-5 py-[5px] rounded-md text-white bg-status-ticket-finaly shadow-md'>
                  Baixa
                  </span>
                </div>
              </div>


            
              <div className="py-3 flex gap-2">

              <span className='px-5 py-[3px] rounded-md text-white bg-gray-400 shadow-md'>
                  Informática
              </span>
              <span className='px-5 py-[3px] rounded-md text-white shadow-md bg-status-ticket-open'>
                  Aberto
              </span>

            </div>

            </div>

            

          </div>

        </section>
      </div>

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
