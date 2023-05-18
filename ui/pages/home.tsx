import React, { useEffect, useState } from "react"
import { gql, useMutation, useQuery } from "@apollo/client";
import Card from "@/components/Card";
import { getCookie, deleteCookie } from 'cookies-next';
import Link from "next/link";
import { useRouter } from 'next/router';
  
const GET_FRUITS = gql`
    query{
        getFruits {
            _id
            name
            pricePerKilo
        }
    }
`

const DELETE_FRUIT = gql`
    mutation DeleteFruit($id: String){
        deleteFruit(_id: $id) {
            acknowledged
            deletedCount
        }
    }
`


export default function Home() {

    const [list, setList] = useState([])
    const router = useRouter();


    function QueryItems() {
        const { data, loading, error} = useQuery(GET_FRUITS,{
            pollInterval: 500,
            onCompleted: data =>{
                console.log(data.getFruits)
                setList(data.getFruits);
            }
        });
    }

    QueryItems();

    useEffect(() => {
        if(! getCookie('access_token')){
            router.push("/");
        }
    });
    

    const [deleteItemMutation, { data, loading, error }] = useMutation(DELETE_FRUIT);


    const logout = ()=>{
        deleteCookie('access_token');
    };

    const deleteItem = (id:string) => {
       deleteItemMutation({ variables: { id: id } });
    }   

    return (
     <div className='flex flex-col items-center h-screen w-screen'>
        <div className='flex flex-row bg-slate-600  w-full h-[12%] md:h-[10%] items-center justify-between'>
            <h1 className="ml-20 text-white text-2xl ">Fruit Market</h1>
            <Link className='m-20 text-white text-sm hover:bg-zinc-900 bg-zinc-700 p-3 rounded-full' href='/'>
                <button className="" onClick={logout} >Logout</button>
            </Link>
        </div>
        <div className="felx flex-col overflow-y-visible mt-10">
            {list.map(el=>{
                return<Card infoCard={el} deleteItem={deleteItem}/>
            })}
        </div>
     </div>
     )
}