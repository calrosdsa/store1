import React,{useState}from 'react'
import {useRouter} from 'next/router'
function Header({data}) {
    const router=useRouter();
    const [isOpen,setIsOpen]=useState(true)
    return (
        <div className=" relative">
            <div className="grid grid-rows-3 grid-cols-3 bg-gray-900"  >
            <h1 className="text-xl text-gray-300 hover:text-gray-50 ml-2 font-bold italic">
                Ashop
                </h1>
            <div className="row-start-2">
                <input type="text"  />
            </div>

                <div onClick={()=>setIsOpen(!isOpen)} className="row-start-3  text-gray-300 text-sm font-bold ">
                    Category
             {isOpen ||
                 <div className="absolute">

            {data.map((category)=>(
                
                <div className=" text-gray-900  bg-gray-100" id={category.name} onClick={()=>router.push(`category/${encodeURIComponent(category.slug)}`)}>
                <h1 className="mx-1 text-md row-start-3 top-10 ">{category.name}</h1>
                
                </div>
                ))}
            </div>
            }
                </div>
                </div>
                </div>
    )
}

export default Header
