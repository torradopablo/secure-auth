import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, useLazyQuery  } from '@apollo/client';
import { getCookie } from 'cookies-next';
import React, { useState } from 'react';


const clientApollo = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_APOLLO_SERVER_URL}`,
  cache: new InMemoryCache(),
  headers: {authorization: `Bearer ${getCookie('access_token')}`}
});


  
export default function Home() {

    const GET_FRUITS = gql`
  {
    getFruits {
      
      name
      pricePerKilo
    }
  }
`;

/*
    const getFruits = async () =>{
        const [data,result] =  useLazyQuery(GET_FRUITS);
        setFruits(data);
    };

    const [Fruits, setFruits] = useState([])
*/    

  return (
    <div>
        HOME
        { }
    </div>
  )
}