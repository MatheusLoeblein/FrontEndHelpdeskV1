import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies'
import { Tickets } from '@/components/Tickets';
import { MainLayout } from '@/components/MainLayout';
import { Charts } from '@/components/Charts';
import { NewTask } from '@/components/NewTask';
import { NewTaskProvider } from '@/context/NewTaskContext';
import { motion } from 'framer-motion';


export default function dashboard() {

  return (
    
      <MainLayout>
        <motion.section
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
        
        id='dash' className="flex flex-col gap-4">
          <Charts/>

          <Tickets/>
          
          <NewTaskProvider>
            <NewTask/>
          </NewTaskProvider> 

        </motion.section>
        
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
