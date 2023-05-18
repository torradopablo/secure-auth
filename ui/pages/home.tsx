import React, { useState, useEffect } from "react"
import { gql, useQuery } from "@apollo/client";
import Card from "@/components/Card";

  
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

    const [list, setList] = useState([])


    
    const { data, loading, error} = useQuery(GET_FRUITS,{
        onCompleted: data =>{
            console.log(data.getFruits)
            setList(data.getFruits);
        }
    });

    return (
     <div className='flex flex-col items-center h-screen w-screen'>
        <div className='flex flex-row bg-slate-600  w-full h-[12%] md:h-[10%] items-center justify-between'>
            <h1 className="ml-20 text-white text-2xl ">Fruit Market</h1>
            <button className="m-20 text-white bg-zinc-700 p-2 rounded-full" >Logout</button>
        </div>
        <div className="felx flex-col overflow-y-visible mt-10">
            {list.map(el=>{
                return<Card infoCard={el}/>
            })}
        </div>
     </div>
     )
}