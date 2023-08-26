import { AuthProvider } from '../context/AuthContext'; // Importe o AuthProvider ou o nome que você deu
import { LayoutProvider } from '../context/LayoutContext'; // Importe o AuthProvider ou o nome que você deu
import 'tailwindcss/tailwind.css';
import '../app/globals.css';








function HelpDesk({ Component, pageProps }) {
  return (
    <AuthProvider>
      <LayoutProvider>
        <Component {...pageProps} />
      </LayoutProvider>
    </AuthProvider>
  );
}

export default HelpDesk;