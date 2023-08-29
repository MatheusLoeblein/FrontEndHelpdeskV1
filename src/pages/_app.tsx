import { AuthProvider } from '../context/AuthContext'; // Importe o AuthProvider ou o nome que você deu
import { LayoutProvider } from '../context/LayoutContext'; // Importe o AuthProvider ou o nome que você deu
import 'tailwindcss/tailwind.css';
import '../app/globals.css';
import Head from 'next/head';
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/services/queryClient';


function HelpDesk({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LayoutProvider>
          <Head>
            <title>Help Desk</title>
            <link rel="icon" href="assets/helpicon.png" />
          </Head>
          <Component {...pageProps}/>
        </LayoutProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}


export default HelpDesk;


