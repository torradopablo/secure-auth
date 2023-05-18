import client from '@/apollo-client/apollo.client'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
