import router from "next/router";


export default function Main() {
  return (

    <div className='h-screen w-screen flex flex-col items-center justify-center  '>
        <button 
        className='bg-slate-600 p-[1.5rem] rounded-xl text-white  '
        onClick={(e)=>{
          e.preventDefault();
          router.push("http://localhost:3100/auth/github");
        }}>
          Login with Github
        </button>
    </div>  
  )
}
