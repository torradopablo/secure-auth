import React from "react"
import { gql, useQuery } from "@apollo/client";

  
const GET_FRUITS = gql`
    query{
        getFruits {
            _id
            name
            pricePerKilo
        }
    }
`


export default function Home() {
    const { data, loading, error} = useQuery(GET_FRUITS,{
        onCompleted: data =>{
            console.log(data.getFruits)
        }
    })
    return (
     <div>
        HOME
     </div>
     )
}