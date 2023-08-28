'use client'

import { Logo } from '@/components/Logo';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/context/AuthContext';
import { useContext, useEffect } from 'react'
import { useState } from 'react'
import Router from 'next/router'
import {setCookie, parseCookies} from 'nookies';
import Image from 'next/image';


type SignInData = {
  username: string;
  password: string;
} 

function Login() {
  
  const { register, handleSubmit } = useForm();
  const { user, signIn, authError, setAuthError } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  async function handleSignIn(data: SignInData) {
    try {
      setLoading(true); // Inicia o carregamento
      await signIn(data); // Realiza o login
    } catch (error) {
      console.error('Erro durante o login:', error);
    } finally {
      setLoading(false); // Encerra o carregamento após a tentativa de login, seja com sucesso ou erro
    }
  // if (rememberMe) {

    //   setCookie(null, 'rememberedUser', data.username, {
    //     maxAge: 30 * 24 * 60 * 60, // Um mês em segundos
    //     path: '/',
    //   });
    //   setCookie(null, 'rememberedPassword', data.password, {
    //     maxAge: 30 * 24 * 60 * 60, // Um mês em segundos
    //     path: '/',
    //   });
    // }
  
    // setLoading(true);
  }
  
  // useEffect(() => {
  //   const {'rememberedUser': rememberedUser} = parseCookies();
  //   const {'rememberedPassword': rememberedPassword} = parseCookies();
  
  //   if (rememberedUser && rememberedPassword) {

  //     const username = document.getElementById('username') as HTMLInputElement;
  //     const password = document.getElementById('password') as HTMLInputElement;

  //     username.value = rememberedUser
  //     password.value = rememberedPassword

  //     setRememberMe(true);
  //   }

  // }, []);
  
  
  return (

    <section className='flex justify-center items-center fixed bottom-0 top-0 left-0 right-0'>

      <main className='grid grid-cols-5 w-[60rem] h-[40rem] bg-white rounded-md shadow-md'>

        <div className='bg-gradient-to-b from-primary-formedica via-primary-formedica to-pink-500 h-full w-96 rounded-l-md  col-span-2 px-7 py-16 flex flex-col justify-between items-center relative'>

          <h1 className=' text-white text-3xl  font-semibold z-10'>Bem vindo de volta!</h1>

          <p className='text-white text-xl text-center font-thin z-10'>
          Sistema para documentação de tickets e utilitarios da empresa Formédica Farmacia de manipulção
          </p>

          <div className='bg-white w-24 h-20 z-10 shadow-md rounded-xl flex items-center justify-center'>
            <Image 
            src="/assets/formedica.png" 
            alt='Formedica'
            width={500}
            height={500}
            className='w-20 h-22' 
            />
          </div>

          <div  className='absolute top-0  z-0' >
            <Image 
            src="/assets/bg-login.png" 
            alt='Bg'
            width={500}
            height={500}            
            className='h-[40rem]'/>
          </div>

        </div>

        <form className='col-span-3 rounded-r-md px-7 py-16 flex flex-col items-center justify-between text-gray-600 relative' onSubmit={handleSubmit(handleSignIn)}>

          <div className='text-center'>
            <Logo/>
            <p>Autenticação</p>
          </div>

          {authError && <span className=' text-red-500 absolute top-40'>{authError}</span>}
          <div className='w-80 flex flex-col gap-3 text-sm'>

            <div className='flex flex-col items-center justify-between'>
              <label htmlFor="" 
              className='w-full self-start px-3 py-1'
              >Login</label>
              <input 
              type="text" 
              className='border border-border-default rounded-md py-2 px-3 w-full focus:ring-primary-formedica'
              {...register('username')}
              name='username'
              id='username'              
              onChange={() => setAuthError(null) }
              />
            </div>

            <div className='flex flex-col items-center justify-between'>
              <label htmlFor="" className='w-full self-start px-3 py-1'>Senha</label>
              <input 
              type="password" 
              className='border border-border-default rounded-md py-2 px-3 w-full focus:ring-primary-formedica ' 
              {...register('password')}
              name='password'
              id='password'
              onChange={() => setAuthError(null) }
              />
            </div>

            <div className='flex justify-between'>
              <div className=' space-x-1 flex items-center'>
                <input 
                type="checkbox" 
                id="rememberMe"
                name="rememberMe"
                className='rounded border-gray-300  text-primary-formedica focus:ring-primary-formedica' 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Lembrar-me</span>
              </div>
              <a href="#" className='text-primary-formedica hover:underline'>Esqueceu a senha?</a>
            </div>
          </div>


        <div className='w-80 flex flex-col items-center text-md'>
          <button type="submit" className='w-full py-2 rounded-md text-white bg-primary-formedica'>

           {
              loading ? 
              <div className='w-6 h-6 border-2 border-white m-auto p-2 rounded-full border-t-pink-400 animate-spin'>
              </div>
              :
              'Entrar'
            }
            </button>
          <a href="#" className='text-primary-formedica hover:underline mt-3'>Registrar</a>
        </div>

        </form>
      
      </main>
          

    </section>

  )

}

export default Login;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {'helpdeskauth.token': token} = parseCookies(ctx)

  if (token){
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }
  return {
    props: {

    }
  }
}

