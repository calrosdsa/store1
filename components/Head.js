import React,{Fragment,useState}from 'react'
import {useRouter} from 'next/router'
import {Menu,Transition} from '@headlessui/react'
import {ArrowDownIcon,MenuAlt1Icon,ShoppingCartIcon} from "@heroicons/react/solid"
import {useSelector} from 'react-redux'
import {selectItems} from '../slice/basketSlice'

function Header({data}) {
    const items=useSelector(selectItems)
const router=useRouter();  
    return (
        <div className=" relative">
            <div className="grid grid-rows-1  grid-cols-3 md:grid-rows-2 md:grid-cols-5  bg-gray-900 md:p-1">
                <div className="row-start-1 flex justify-between ">
            <h1 className="text-xl text-gray-300 hover:text-gray-50 ml-2 font-bold italic sm:text-2xl xl:text-4xl">
                Ashop
                </h1>
                </div>
                <div className="flex m-1 space-x-2 col-start-3 justify-end md:col-start-5">
                <ShoppingCartIcon onClick={()=>router.push('checkout/')} className="h-7 text-gray-400  hover:text-white  "/>
                {items==0? <span></span>
            :<span>{items.length}</span>    
            }
                <MenuAlt1Icon className="h-7 text-gray-400 hover:text-white"/>
                </div>
           
             
                </div>
                </div>
    )
}

export default Header
