import React,{Fragment,useState}from 'react'
import {useRouter} from 'next/router'
import {Menu,Transition,Listbox} from '@headlessui/react'
import {ArrowDownIcon,MenuAlt1Icon,SearchIcon,ShoppingCartIcon,XIcon} from "@heroicons/react/solid"
import {useSelector} from "react-redux"
import {selectItems} from "../slice/basketSlice"
function Header({data,posts}) {
    const items=useSelector(selectItems)
    const [keyword,setKeyword]=useState([]);
    const router=useRouter();
    const handleFilter=(event)=>{
    const searchWord=event.target.value
    const newFilter=posts.filter((post)=>{
        return post.title.toLowerCase().includes(searchWord.toLowerCase())
    })
    if (searchWord==""){
        setKeyword([])
    }else{
        setKeyword(newFilter)
    }
    }
    return (
        <div className=" relative">
            <div  className="grid grid-rows-3  grid-cols-3 md:grid-rows-2 md:grid-cols-5  bg-gray-900 md:p-1">
                <div  className="row-start-1 flex justify-between " >
            <h1  className="text-xl text-gray-300 hover:text-gray-50 ml-2 font-bold italic sm:text-2xl xl:text-4xl">
                Ashop
                </h1>
                </div>
                <div className="relative flex m-1 space-x-3 col-start-3 justify-end md:col-start-5">
                <ShoppingCartIcon onClick={()=>router.push('../checkout/')} className="h-7 text-gray-400  hover:text-white  "/>
                {items ==0?<span className="absolute bg-gray-900 text-gray-100 right-8 -top-1"></span>:
                <span className="absolute bg-gray-900 text-gray-100 right-8 -top-1">{items.length}</span>
                
                }
                <MenuAlt1Icon className="h-7 text-gray-400 hover:text-white"/>
                </div>
            <div className="row-start-2  relative md:row-start-1 md:col-start-2 col-span-3 ">
            <div className="relative ">

                <input type="text" className="row-start-2 h-7 xl:h-9 mt-1 focus:outline-none min-w-full col-span-3 "  onChange={handleFilter} />
            {keyword ==0? 
                <SearchIcon className="h-6  absolute right-1 top-2 "/>:<XIcon className="h-6 absolute right-1 top-2"/>
                
            }
            </div>
                
                <div className="absolute  bg-white min-w-full ">
                {keyword.slice(0,5).map((post) => (
                    <div className="row-start-2 " onClick={()=>router.push(`../product/${encodeURIComponent(post.slug)}`)}>
                    <h1 className="row-start-2">{post.title}</h1>
                </div>
              ))}

                    
            </div>
              </div>
               <Menu as="div" className="row-start-3 md:row-start-2 ">
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
                         <div className={`${active ? "bg-indigo-500 text-white":"text-gray-700"}`}
                         key={category.name} onClick={()=>router.push(`../category/${encodeURIComponent(category.slug)}`)}
                         >
                    <a  className="block  mx-1  text-md " >{category.name}</a>
                    </div>
                    )}
                    </Menu.Item>
                    
                    ))}
                    </Menu.Items>
            
                    </Transition>

                    </Fragment>
                    )}
                </Menu>
                </div>
                </div>
    )
}

export default Header
