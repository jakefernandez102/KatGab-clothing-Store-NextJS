import { AuthProvider } from '@/context/AuthProvider';
import { StoreProvider } from '@/context/StoreProvider';
import '@/styles/globals.css';

const Noop = ( { children } ) => <>{children}</>;

export default function App ( { Component, pageProps } )
{

  return (

    <AuthProvider>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </AuthProvider>
  );
}
