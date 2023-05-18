import { gql } from '@apollo/client';
import client from '@/apollo-client/apollo.client';

  
export default /*async*/ function Home() {
/*
    const GET_FRUITS = gql`
    {
        query getFruits {
            getFruits {
                _id
                name
                pricePerKilo
            }
        }
    }
    `;
    const { data } = await client.query({query:GET_FRUITS});
    console.log(data)

    return {
        props: {
            getFruits: data.toString(),
        },
     };
*/
     return <div>HOME</div>
}