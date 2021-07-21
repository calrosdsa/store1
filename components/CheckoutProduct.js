import React from 'react'
import {addToBasket} from '../slice/basketSlice'
import { useDispatch } from "react-redux"
import Image from 'next/image'
import {useRouter} from 'next/router'
function CheckoutProduct({title,slug,regular_price,image,description,id}) {
    const router=useRouter();
    const dispatch=useDispatch();
    const addItemToBasket=()=>{
        const products={title,slug,regular_price,image,description,id}
        dispatch(addToBasket(products))
    }
    return (
        <div>
            <h1 className="text-base font-bold">{title}</h1>
            <div className="grid grid-cols-2 md:grid-cols-5" >
                <div onClick={()=>router.push(`../product/${encodeURIComponent(slug)}`)} 
                className="w-[120px] sm:w-[150px] md:w-[160px] lg:w-[200px]"
                >

            <img
            src={image} 
            height={200}
            width={200}
            className="h-[120px] sm:h-[150px] md:h-[160px] lg:h-[200px] object-contain rounded-xl col-start-1 md:col-start-1 md:col-span-2"
            />
            </div>
            <div className="text-sm font-semibold  col-start-2 md:col-start-3 md:col-span-3">
            <h1 className="text-sm font-semibold">Price:{regular_price}$</h1>
            <p className="text-xs line-clamp-3 md:line-clamp-6">{description}</p>
             <div className="my-1 space-y-2">

            <button className="bg-gray-900 text-gray-200 rounded-lg p-[1px]" onClick={addItemToBasket}>Add to Basket </button>
            <button className="bg-gray-900 text-gray-200 rounded-lg p-[1px]">Remove Item</button>
             </div>
            </div>
            </div>
        </div>
    )
}

export default CheckoutProduct
