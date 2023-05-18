import React from 'react'
import { BsTrash } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

type Props = any


export default function Card({infoCard, deleteItem, editItem}: Props) {
  return (
    <div className='bg-zinc-600 w-72  md:w-[40rem] p-5 mt-9  flex flex-col items-center justify-center  space-y-11 rounded-lg '>
    
    <div className='h-[1%] items-center justify-between  flex flex-row  w-full '> 
        <div onClick={()=>editItem(infoCard._id, infoCard.name, infoCard.pricePerKilo)}>
            {React.createElement(MdEdit)}

        </div>
        <div onClick={()=>deleteItem(infoCard._id)}>
            {React.createElement(BsTrash)}
        </div>
    </div>
    <div className='text-gray-500  text-4xl font-light mb-2   '>
        {infoCard.name}
    </div>
    <div className='text-white text-5xl font-light'>
        {`${infoCard.pricePerKilo}`}  <span className='text-lg font-mono'>$/kg</span>
    </div>
    </div>
    
  )
}