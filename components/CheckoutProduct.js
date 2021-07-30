import React,{useState} from 'react'
import {addToBasket,removeFromBasket} from '../slice/basketSlice'
import {Currency} from 'react-currency-formatter'
import { useDispatch } from "react-redux"
import QuantityCount from '../utils/QuantityCount'
import {useRouter} from 'next/router'
import { StarIcon } from '@heroicons/react/solid'
function CheckoutProduct({title,slug,regular_price,image,description,quantity,id}) {
    const router=useRouter();
    const MAX_RATE=5;
    const MIN_RATE=1;
    const dispatch=useDispatch();
    const [quantityUp, setQuantityUp] = useState(quantity)
    const [rating]=useState(
        Math.floor(Math.random()*(MAX_RATE - MIN_RATE+1))+MIN_RATE
    )

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({id}));
    };
    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-5 items-center" >
                <div onClick={()=>router.push(`../product/${encodeURIComponent(slug)}`)} 
                className="col-span-1 col-start-1 w-[120px] lg:ml-3 sm:w-[170px]  md:w-[160px] lg:w-[200px] my- sm:mx-6" 
                >

            <img
            src={image} 
            height={200}
            width={200}
            className="h-[120px] sm:h-[150px]  md:h-[160px] lg:h-[200px] object-contain rounded-xl col-start-1 md:col-start-1 md:col-span-2"
            />
            </div>
            <div className="text-sm font-semibold  col-start-2 md:col-start-3 lg:col-start-2 lg:col-span-3 md:col-span-3 lg:px-16 xl:px-20">
            <h1 className="text-base font-bold">{title}</h1>
            <div className="flex">
                {Array(rating).fill().map((_,index)=>(
                    <StarIcon key={index} className="text-yellow-500 h-5 sm:h-7 "/>
                ))}
            </div>
            <div className="text-gray-400 flex my-2 truncate">

                        <p>{regular_price}{" * "} {quantity} {" = "}</p>
                        <p>{regular_price * quantity}</p>
                        
                        
                    </div>
                    <div className="hidden md:block">

            <p className=" text-xs line-clamp-3 md:line-clamp-6">{description}</p>
                    </div>
             </div>
            <div className=" col-start-2  md:flex  md:col-start-3 md:col-span-3  md:space-x-6 space-y-2 lg:col-start-5 lg:my-auto lg:flex lg:flex-col lg:items-center -mt-7 md:-mt-0 my-auto ">
                    {/* <button onClick={addItemToBasket} className="mt-auto button">Add to Busket</button> */}
                    <QuantityCount id={id} dispatch setQuantity={setQuantityUp} quantity={quantityUp}/>
                    <button onClick={removeItemFromBasket} className="max-w-[200px] text-xs md:text-base rounded-lg p-1  sm:p-2 bg-gray-900 focus:outline-none text-white">Remove from Busket</button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutProduct
