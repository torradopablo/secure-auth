import React, { useEffect, useState } from "react"
import { gql, useMutation, useQuery } from "@apollo/client";
import Card from "@/components/Card";
import { getCookie, deleteCookie } from 'cookies-next';
import Link from "next/link";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import random from 'random'

  
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


const EDIT_FRUIT = gql`
    mutation UpdateFruit($id: String, $name: String, $pricePerKilo: String){
        updateFruit(_id: $id, name: $name, pricePerKilo: $pricePerKilo) {
            acknowledged
            matchedCount
            modifiedCount
            upsertedCount
            upsertedId
        }
    }
`


const ADD_FRUIT = gql`
    mutation CreateFruit($id: String, $name: String, $pricePerKilo: String){
            createFruit(_id: $id, name: $name, pricePerKilo: $pricePerKilo) {
            _id
            name
            pricePerKilo
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
    

    const [deleteItemMutation, { data:dataDelete, loading: loadingDelete, error: errorDelete }] = useMutation(DELETE_FRUIT);
    const [editItemMutation, { data:dataEdit, loading: loadingEdit, error: errorEdit }] = useMutation(EDIT_FRUIT);
    const [createItemMutation, { data:dataCreate, loading: loadingCreate, error: errorCreate }] = useMutation(ADD_FRUIT);




    const logout = ()=>{
        deleteCookie('access_token');
    };

    
    const alertDeleteItem = (id:string) =>{
        Swal.fire({
            title: 'Do you want delete item?',
            text: 'Click OK to confirm!',
            icon: 'warning',
        }).then( (res) =>{
            if(res.isConfirmed){
                deleteItemMutation({ variables: { id: id } });
            }
          })
    }
   
    const alertEditItem = (id:string, name:string, pricePerKilo:string)=>{
        Swal.fire({
            title: 'Edit price per kilo',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: false,
            confirmButtonText: 'OK',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {console.log(result)
              Swal.fire({
                title: `${result.value.login}'s avatar`,
                imageUrl: result.value.avatar_url
              })
              editItemMutation({ variables: { id: id , name:name, pricePerKilo:result.value} })
            }
          })
    }

    const addItem = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Name and price',
            html:
              '<input id="swal-input1" class="swal2-input">' +
              '<input id="swal-input2" class="swal2-input">',
            focusConfirm: false,
          })
          
          if (formValues ) {
            var name = document.getElementById('swal-input1').value
            var pricePerKilo = document.getElementById('swal-input2').value
            createItemMutation({ variables: {id: (random.int(0,100000000)).toString() , name: name, pricePerKilo:pricePerKilo} })
        }
    }

    return (
     <div className="h-screen w-screen">
        <div className=' relative flex flex-col items-center h-screen w-screen'>
            <div className='flex flex-row bg-slate-600  w-full h-[12%] md:h-[10%] items-center justify-between'>
                <h1 className="ml-20 text-white text-2xl ">Fruit Market</h1>
                <Link className='m-20 text-white text-sm hover:bg-zinc-900 bg-zinc-700 p-3 rounded-full' href='/'>
                    <button className="" onClick={logout} >Logout</button>
                </Link>
            </div>
            <div className=" felx flex-col overflow-y-visible mt-10">
                {list.map(el=>{
                    return<Card infoCard={el} deleteItem={alertDeleteItem} editItem={alertEditItem}/>
                })}
            </div>
        </div>

        <div className='fixed right-10 bottom-10  flex flex-row items-end  h-[5rem] w-[5rem] justify-center scroll-smooth z-10 overflow-hidden '>
            <button  onClick={addItem}
            className=' bg-green-600  w-full  h-full  text-white text-4xl text-center  inline-block  rounded-full'>+</button>
        </div>
    </div>   
    
    )
}