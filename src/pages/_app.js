import { AuthProvider } from '@/context/AuthProvider';
import { StoreProvider } from '@/context/StoreProvider';
import '../../public/styles/globals.css';

const Noop = ( { children } ) => <>{children}</>;

export default function App ( { Component, pageProps } )
{
  const Auth = Component.Auth || Noop;
  return (
    <Auth>
      <AuthProvider>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </AuthProvider>
    </Auth>
  );
}
