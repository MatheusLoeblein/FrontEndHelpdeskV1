import { GetServerSideProps } from 'next';
import { MainLayout } from '@/components/MainLayout';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { Ticket } from '@/components/Ticket';

export default function TicketPage() {

  const {query: { id: pageId } } = useRouter();
  

   return (

    <MainLayout key={pageId}>

      <Ticket pageId={pageId}/>

    </MainLayout>
   
  );
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

