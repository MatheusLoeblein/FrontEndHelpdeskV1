import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies'
import { Tickets } from '@/components/Tickets';
import { MainLayout } from '@/components/MainLayout';
import { Charts } from '@/components/Charts';



export default function dashboard() {

  return (
    
      <MainLayout>

        <section id='dash' className="flex flex-col gap-4">
          <Charts/>

          <Tickets/>          

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
