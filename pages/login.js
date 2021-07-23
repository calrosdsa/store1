import firebaseClient from "../firebaseClient";
import {useState} from 'react'
import firebase from "firebase/app";
import 'firebase/auth'
import {useToast} from '@chakra-ui/react'
import { getProviders, signIn, getSession } from 'next-auth/client'

 export default function Login({providers}){
     firebaseClient();
     const toast=useToast();
     const [email,setEmail]=useState('');
     const [password,setPassword]=useState('');
  return(
      <div className="min-h-screen bg-red-300 flex justify-center ">
          <div className="p-1 flex-1">
        <div  className="w-60 p-2 md:w-80 bg-white rounded-3xl mx-auto overflow-hidden shadow-xl relative ">
          <h1 className="absolute bg-red-600 min-w-full text-gray-200 mt-2 text-xl italic font-bold">Welcome </h1>
            <form className="mt-16" action="" method="POST">

            <div className="relative">

            <input className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-red-600" placeholder="john@doe.com" id="email" name="email" type="text" onChange={(e)=>setEmail(e.target.value)}
            id="email adress"
            value={email}
            />
                <label  htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Emmail Adress</label>
        </div>
        <div className="relative mt-5">
            <input className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-red-600" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)}
            id="password" type="password" name="password"
            value={password}
            />
            <label  htmlFor="email"
            className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >Password</label>
        </div>
            </form>
            <div className="mt-5 p-2 relative border-b-4 border-red-400">

        <button className="text-sm md:text-[17px]  bg-red-100 hover:bg-red-400 hover:text-gray-200 p-1 text-gray-400 rounded-xl font-semibold" disabled={email === "" || password===""}
        onClick={async()=>{await firebase.auth().createUserWithEmailAndPassword  
            (email,password).then(function(){
                window.location.href="/"
            }).catch(function(error){
                const message=error.message;
                toast({
                    title:"An error occured",
                    description: message,
                    status: "error",
                    duration:9000,
                    isClosable: true,
                });
            });
        }}
        >CREATE ACCOUNT</button>

        <button className="text-sm md:text-[17px] bg-red-100 md:px-10 px-2 hover:bg-red-400 hover:text-gray-200 p-1 text-gray-400 rounded-xl font-semibold absolute bottom-2 right-3"  disabled={email === "" || password===""}
        onClick={async()=>{await firebase.auth().signInWithEmailAndPassword  
            (email,password).then(function(){
                window.location.href="/"
            }).catch(function(error){
                const message=error.message;
                toast({
                    title:"An error occured",
                    description: message,
                    status: "error",
                    duration:9000,
                    isClosable: true,
                });
            });
        }}
        >LOGIN</button>
        
        </div>
        <div className="mt-4 grid grid-cols-4 grid-rows-2 ">
            <img className="row-start-1 h-7 md:h-9 m-1 ml-2" src="data:image/png;base64,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" alt="" />
            <img className="row-start-2 h-7 md:h-9 m-1 ml-2" src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="" />
      {Object.values(providers).map(provider => (
          <div className="col-start-2  " key={provider.name}>
          <button className="my-1 -ml-3 text-xs md:text-sm font-bold p-2 bg-blue-500 text-gray-200 min-w-[160px] md:min-w-[200px] h-7 md:h-9" onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
        </div>
      ))}
      </div>
          </div>
        </div>
      </div>
  )
 }
 Login.getInitialProps = async (context) => {  
    const{req,res}=context;
    const session=await getSession({req});

    if (session && res){
        res.writeHead(302,{
            Location:"/",
        });
        res.end()
           return;
    }
    
  return {
    providers: await getProviders(),
  }
}