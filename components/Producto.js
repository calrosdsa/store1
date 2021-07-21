import React from 'react'
import {useDispatch} from 'react-redux'
import {addToBasket} from "../slice/basketSlice"
import Image from "next/image"
import {useRouter} from 'next/router'
import {motion,AnimatePresence,AnimateSharedLayout} from 'framer-motion'

function Producto({title,id,description,image,regular_price,specifications,slug}) {
    const router=useRouter();

    const dispatch=useDispatch();
    const addItemToBasket=()=>{
        const product={title,description,image,id,regular_price,slug}
        dispatch(addToBasket(product))
    }
    return (
        <div >
            <AnimateSharedLayout>

   <div key={id} className="items-center" >

<div onClick={()=>router.push(`../product/${encodeURIComponent(slug)}`)} className="">
   <h1 className="text-base col-span-2 ml-16 my-2 font-bold">{title}</h1>
   <div className="grid grid-cols-2 relative ">
<div className="">

       <Image
       as={motion.img}
       src={image}
       height={330}
       width={350}
       objectFit="contain"
       className="col-start-1"
       />
       </div>
        <div className=" ml-2">

           Talla:
           <br />
           Color:
        </div>
       <h1 className="absolute left-16 col-start-2 text-base font-semibold">{specifications}</h1>
       
       <span className="col-start-2 text-sm font-semibold absolute mt-16 ml-3">Price: {regular_price}$</span>
<button onClick={addItemToBasket}   className="bg-gray-900 w-[90px] ml-3 text-gray-500 col-start-2 -mt-7 min-w-[20px]  md:font-bold rounded-lg">Add to Cart</button>
       </div>
   <p className="text-xs mx-2 mt-2">{description}</p>
</div>
   </div>
            
       </AnimateSharedLayout>
        </div>
    )
}

export default Producto
