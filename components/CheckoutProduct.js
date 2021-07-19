import React from 'react'
import {addToBasket} from '../slice/basketSlice'
import { useDispatch } from "react-redux"
import Image from 'next/image'
import {useRouter} from 'next/router'
function CheckoutProduct({title,slug,regular_price,image,description}) {
    const router=useRouter();
    const dispatch=useDispatch();
    const addItemToBasket=()=>{
        const products={title,slug,regular_price,image,description}
        dispatch(addToBasket(products))
    }
    return (
        <div>
            <h1 className="text-base font-bold">{title}</h1>
            <div className="grid grid-cols-2" onClick={()=>router.push(`../product/${encodeURIComponent(slug)}`)}>
            <Image
            src={image} 
            height={100}
            width={100}
            className="object-contain rounded-xl col-start-1"
            />
            <div className="text-sm font-semibold  col-start-2">
            <h1 className="text-sm font-semibold">Price:{regular_price}$</h1>
            <p className="text-xs line-clamp-3">{description}</p>
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
