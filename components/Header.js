import React,{Fragment,useState}from 'react'
import {useRouter} from 'next/router'
import {Menu,Transition,Listbox} from '@headlessui/react'
import {ArrowDownIcon,MenuAlt1Icon,SearchIcon,ShoppingCartIcon,XIcon,UserIcon} from "@heroicons/react/solid"
import {useSelector} from "react-redux"
import {selectItems} from "../slice/basketSlice"
import {useSession,signIn,signOut} from 'next-auth/client'
import { useAuth } from '../auth' 
import Sidebar from './Sidebar'
import firebase from 'firebase/app'

function Header({data,posts}) {
   const{user}=useAuth()
    const [session]=useSession();
    const items=useSelector(selectItems)
    const [keyword,setKeyword]=useState([]);
    const [wordEnter, setWordEnter]=useState('');
    const router=useRouter();
    const handleFilter=(event)=>{
    const searchWord=event.target.value
    setWordEnter(searchWord)
    const newFilter=posts.filter((post)=>{
        return post.title.toLowerCase().includes(searchWord.toLowerCase())
    })
    if (searchWord==""){
        setKeyword([])
    }else{
        setKeyword(newFilter)
    }
    }
    const cleanInput=()=>{
        setKeyword([])
        setWordEnter('')
    }
    return (
        <header className="relative">

        <div className="fixed top-0 right-0 left-0 ">

            <div  className="relative  grid grid-rows-3  grid-cols-3 md:grid-rows-2 md:grid-cols-5  bg-gray-900 md:p-1">
            <div className="col-start-1 row-start-1 md:row-start-2 m-1 ">
            <Sidebar/>
            </div>
                <div  className="row-start-1 col-start-1 flex justify-between " >
            
            <h1  className="ml-12 md:ml-2 lg:ml-20 flex text-xl text-gray-300 hover:text-gray-50  font-bold italic sm:text-2xl xl:text-4xl">
                Ashop
        </h1>
                </div>
                <div className="relative flex m-1 space-x-3 md:space-x-6 xl:space-x-12 md:mr-5 col-start-3 justify-end md:col-start-5">
                <ShoppingCartIcon onClick={()=>router.push('../checkout/')} className="h-7 md:h-8 lg:h-9 xl:h-10 text-gray-400  hover:text-white  "/>
                <UserIcon onClick={signIn} className="h-7 md:h-8 lg:h-9 xl:h-10 mr-4 text-gray-400 hover:text-white"/>
                {items ==0?<span className="absolute bg-gray-900 text-gray-100 right-8 -top-1"></span>:
                <span className="absolute  text-gray-900 rounded-full pl-1  text-xs md:text-base 2xl:text-lg  font-bold 2xl:right-16 2xl:pl-[10px] w-[30px]  right-20  bg-gray-200 -top-1">{items.length}</span>
                
            }
                </div>
            <div className="row-start-2  relative md:row-start-1 md:col-start-2 col-span-3 ">
            <div className="relative ">

                <input value={wordEnter} type="text" className="row-start-2 h-7 xl:h-9 mt-1 focus:outline-none min-w-full col-span-3 "  onChange={handleFilter} />
            {keyword ==0? 
                <SearchIcon className="h-6  absolute right-1 top-2 "/>:<XIcon onClick={cleanInput}  className="h-6 absolute right-1 top-2"/>
                
            }
            </div>
                
                <div className="absolute  bg-white min-w-full ">
                {keyword.slice(0,4).map((post) => (
                    <div key={post.id} className="relative mt-2 row-start-2  grid grid-cols-2 items-center" onClick={()=>router.push(`../product/${encodeURIComponent(post.slug)}`)}>
                    <h1 className="absolute col-start-2 mr-4 sm:mr-10">{post.title}</h1>
                    <img className="ml-4 sm:ml-10 h-16 col-start-1 w-20 lg:h-24 lg:w-28" src={post.image} alt="" />
                </div>
              ))}

                    
            </div>
              </div>
               <Menu as="div" className="row-start-3 md:row-start-2  col-start-1 lg:ml-20 md:ml-10  ">
            {({open})=>(
                <Fragment>

                
                <Menu.Button  className="focus:outline-none text-gray-300 text-sm font-bold  xl:mt-1 ">
                    <div className="flex items-center mb-[14px]">

                    <h1 className="text-sm mr-1 md:text-lg xl:text-xl ">Category</h1>
                     <ArrowDownIcon className="h-4 mt-[4px] text-whie"/>
                    </div>
                     </Menu.Button>
             
                    <Transition show={open}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-y-0"
                        leave="transition ease-in duration-200"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-y-0"
                        
                        
                        >
                    
                 <Menu.Items  className=" absolute bg-gray-50 focus:outline-none" static>

                         {data.map((category)=>(
                             
                             
                             
                             <Menu.Item >
                     {({ active, disabled})=>(
                         <div className={`w-[200px] ${active ? "bg-indigo-500 text-white":"text-gray-700"}`}
                         key={category.name} onClick={()=>router.push(`../category/${encodeURIComponent(category.slug)}`)}
                         >
                    <a  className="block  mx-1  text-xl lg:text-2xl font-semibold italic" >{category.name}</a>
                    </div>
                    )}
                    </Menu.Item>
                    
                    ))}
                    </Menu.Items>
            
                    </Transition>

                    </Fragment>
                    )}
                </Menu>
                <div className=" row-start-3 md:row-start-2  flex space-x-7  text-[15px]  text-gray-200 mt-[2px] md:ml-14 
                md:text-lg xl:text-xl xl:col-start-2 xl:space-x-36 xl:tracking-widest 2xl:-ml-10 xl:mt-1 font-semibold ">
                <div     
                 className="whitespace-nowrap  lg:hover:translate-y-3  hover:text-white hover:transition-transform lg:-ml-2">
                     
                    
                     {user||session?<h1 className="cursor-pointer" onClick={async()=>{
                    await firebase.auth().signOut()}}>
                        <p onClick={signOut}>
                        Sign Out
                            </p>
                    </h1>:<h1 onClick={signIn}>
                             Sign In
                        </h1>}</div>
                <h1 className="cursor-pointer lg:hover:translate-y-3  hover:text-white hover:transition-transform" >Trading</h1>
                <h1 className="cursor-pointer lg:hover:translate-y-3  hover:text-white hover:transition-transform ">Ofertas</h1>
                </div>
                </div>
                </div>
                    </header>
    )
}

export default Header
