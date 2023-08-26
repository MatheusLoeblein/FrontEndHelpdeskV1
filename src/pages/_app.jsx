import { AuthProvider } from '../context/AuthContext'; // Importe o AuthProvider ou o nome que você deu
import 'tailwindcss/tailwind.css';
import '../app/globals.css';

function HelpDesk({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default HelpDesk;