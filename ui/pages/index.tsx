import router from "next/router";
import { SocialIcon } from 'react-social-icons';


export default function Main() {
  return (

    <div className='h-screen w-screen flex flex-col items-center justify-center  '>
        <button 
        className='bg-gray-900 px-[1.3rem] rounded-xl text-white  '
        onClick={(e)=>{
          e.preventDefault();
          router.push("http://localhost:3100/auth/github");
        }}>
          Login with Github 
          <SocialIcon 
                url='https://github.com/in/jaketrent'
                fgColor='white' 
                bgColor='transparent'
            />
        </button>
    </div>  
  )
}
