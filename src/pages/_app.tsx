import { AuthProvider } from '../context/AuthContext'; // Importe o AuthProvider ou o nome que você deu
import { LayoutProvider } from '../context/LayoutContext'; // Importe o AuthProvider ou o nome que você deu
import 'tailwindcss/tailwind.css';
import '../app/globals.css';
import Head from 'next/head';


function HelpDesk({ Component, pageProps }) {
  return (
    <AuthProvider>
      <LayoutProvider>
        <Head>
          <title>Help Desk</title>
          <link rel="icon" href="assets/helpicon.png" />
        </Head>
        <Component {...pageProps}/>
      </LayoutProvider>
    </AuthProvider>
  );
}

export default HelpDesk;