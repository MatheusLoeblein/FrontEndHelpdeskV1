'use client'

import '../app/globals.css';
import 'tailwindcss/tailwind.css';
import { Logo } from '@/components/Logo';


export default function login() {
  
  return (

    <section className='flex justify-center items-center fixed bottom-0 top-0 left-0 right-0'>

      <main className='grid grid-cols-5 w-[60rem] h-[40rem] bg-white rounded-md shadow-md'>

        <div className='bg-gradient-to-b from-primary-formedica via-primary-formedica to-pink-500 h-full w-96 rounded-l-md  col-span-2 px-7 py-16 flex flex-col justify-between items-center relative'>

          <h1 className=' text-white text-3xl  font-semibold z-10'>Bem vindo de volta!</h1>

          <p className='text-white text-xl text-center font-thin z-10'>
          Sistema para documentação de tickets e utilitarios da empresa Formédica Farmacia de manipulção
          </p>

          <div className='bg-white w-24 h-20 z-10 shadow-md rounded-xl flex items-center justify-center'>
          <img src="assets/formedica.png" className='w-20 h-22' />
          </div>

          <div  className='absolute top-0  z-0' >
            <img src="assets/bg-login.png" className='h-[40rem]'/>
          </div>

        </div>

        <div className='col-span-3 rounded-r-md px-7 py-16 flex flex-col items-center justify-between text-gray-600'>

          <div className='text-center'>
            <Logo/>
            <p>Autenticação</p>
          </div>

          <div className='w-80 flex flex-col gap-3 text-sm'>
            <div className='flex flex-col items-center justify-between'>
              <label htmlFor="" className='w-full self-start px-3 py-1 '>Login</label>
              <input type="text" className='border border-border-default rounded-md py-2 px-3 w-full outline-[0.5px] focus:outline-primary-formedica'/>
            </div>

            <div className='flex flex-col items-center justify-between'>
              <label htmlFor="" className='w-full self-start px-3 py-1'>Senha</label>
              <input type="text" className='border border-border-default rounded-md py-2 px-3 w-full outline-[0.5px] focus:outline-primary-formedica' />
            </div>

            <div className='flex justify-between'>
              <div className=' space-x-1 flex items-center'>
                <input type="checkbox" name="" id="" />
                <span>Lembrar-me</span>
              </div>
              <a href="#" className='text-primary-formedica hover:underline'>Esqueceu a senha?</a>
            </div>
          </div>


        <div className='w-80 flex flex-col items-center text-md'>
          <button className='w-full py-2 rounded-md text-white bg-primary-formedica'>Entrar</button>
          <a href="#" className='text-primary-formedica hover:underline mt-3'>Registrar</a>
        </div>

        </div>
      
      </main>

    </section>

  )

}
