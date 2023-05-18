import { ApolloClient, InMemoryCache } from '@apollo/client';
import { getCookie } from 'cookies-next';


const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_APOLLO_SERVER_URL}`,
  cache: new InMemoryCache(),
  headers: {authorization: `Bearer ${getCookie('access_token')}`}
});

export default client;
