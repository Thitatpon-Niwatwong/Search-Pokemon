import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apolloClient';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
