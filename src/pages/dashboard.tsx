"use client"

import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { LayoutContext } from '@/context/LayoutContext';

import { Tickets } from '@/components/Tickets';
import { MainLayout } from '@/components/MainLayout';

export default function dashboard() {

  return (
    
      <MainLayout>

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
          <Tickets/>          

        </div>

        </section>
        
      </MainLayout>


  )
}

