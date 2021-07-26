import React,{useEffect,useState} from 'react'
import {useDispatch} from 'react-redux'
import {addToBasket} from "../slice/basketSlice"
import {useRouter} from 'next/router'
import {motion,AnimatePresence,AnimateSharedLayout} from 'framer-motion'
import { StarIcon } from '@heroicons/react/solid'
import Image from "next/image"
const MAX_RATING=5;
const MIN_RATING=1;
function Producto({title,id,description,image,regular_price,specifications,slug}) {
    const price=parseFloat(`${regular_price}`, 10)
    const router=useRouter();
    const [selectedImage,setSelectedImage]=useState();
    const dispatch=useDispatch();
    const addItemToBasket=()=>{
        const product={title,description,image,id,price,slug}
        dispatch(addToBasket(product))
    }
    useEffect(()=>{
        setTimeout(()=>setSelectedImage([]),3000)
    },[selectedImage])
    const [rating] = useState(  
        Math.floor(Math.random()*(MAX_RATING - MIN_RATING  +1)) +MIN_RATING
    );
    return (
        <div className="">
            <AnimateSharedLayout>

   <div key={id} className="items-center" >

<div onClick={()=>router.push(`../product/${encodeURIComponent(slug)}`)} className="">
   <h1 className="text-base md:text-lg xl:text-2xl underline col-span-2 ml-16 my-2 font-bold">{title}</h1>
   <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 relative mt-3 ">
<div className=" w-250 md:w-[250] ml-2 xl:ml-10">

       <Image
       src={image}
       key={id}
       height={300}
       width={350}
       objectFit="contain"
       className="col-start-1 p-3 md:p-6 sm:ml-2 xl:ml-10"
       />
       </div>
        <div className=" ml-2 sm:text-lg font-semibold lg:text-xl ">

           Talla:
           <br />
           Color:
        </div>
       <h1 className="absolute sm:text-lg lg:text-xl left-16 col-start-2 text-base font-semibold">{specifications}</h1>
       
       <span className="col-start-2 text-sm sm:text-lg md:text-xl font-semibold absolute mt-16 ml-3">Price: {regular_price}$</span>
       <div className="flex col-start-2 absolute top-24 left-2">
                {Array(rating)
                .fill()
                .map((_, i) => (
                    <StarIcon height={20} className="text-yellow-500"/>
                ))
                }
               
            </div>
<p className="col-span-2 md:col-span-1 mt-14p md:col-start-2 md:-mt-16  lg:-mt-20 xl:-mt-32  md:text-sm font-medium text-xs mx-2 ">{description}</p>
<button onClick={()=>setSelectedImage(image)}   className="bg-gray-900 absolute top-32  w-[90px] ml-3 text-gray-500 col-start-2  min-w-[20px]  md:font-bold rounded-lg">
<h1 onClick={addItemToBasket}>Add to Cart</h1>
    {selectedImage&&(
        <AnimatePresence>
     <div
     layoutId={selectedImage}
    className="fixed top-16 right-5  lg:h-20 lg:w-[200px]">
     <motion.img
     initial={{ opacity: 0,}}
     animate={{ opacity: 0.8 }}
     exit={{ opacity: 0 }}
     translate={{y:50}}
    
     className="w-10 object-contain md:w-14 lg:w-20 2xl:w-[200px] text-gray-300"    src={selectedImage} 
   />
   
     </div>
 </AnimatePresence>
    )}
    </button>
       </div>
</div>
   </div>
            
       </AnimateSharedLayout>
        </div>
    )
}

export default Producto
