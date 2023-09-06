import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies'
import { Tickets } from '@/components/Tickets';
import { MainLayout } from '@/components/MainLayout';
import { Charts } from '@/components/Charts';
import { NewTask } from '@/components/NewTask';




export default function dashboard() {

  return (
    
      <MainLayout>
        <section id='dash' className="flex flex-col gap-4">
          <Charts/>

          <Tickets/>          
          <NewTask/>

        </section>
        
      </MainLayout>


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
