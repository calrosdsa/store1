import React,{useEffect,useState} from 'react'
import {useDispatch} from 'react-redux'
import {addToBasket} from "../slice/basketSlice"
import {useRouter} from 'next/router'
import {motion,AnimatePresence,AnimateSharedLayout} from 'framer-motion'

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
    return (
        <div >
            <AnimateSharedLayout>

   <div key={id} className="items-center" >

<div onClick={()=>router.push(`../product/${encodeURIComponent(slug)}`)} className="">
   <h1 className="text-base col-span-2 ml-16 my-2 font-bold">{title}</h1>
   <div className="grid grid-cols-2 relative ">
<div className=" w-250">

       <motion.img
       src={image}
       key={id}
       height={330}
       width={350}
       layoutId={image}
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
<button onClick={()=>setSelectedImage(image)}   className="bg-gray-900 w-[90px] ml-3 text-gray-500 col-start-2 -mt-7 min-w-[20px]  md:font-bold rounded-lg">
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
   <p className="text-xs mx-2 mt-2">{description}</p>
</div>
   </div>
            
       </AnimateSharedLayout>
        </div>
    )
}

export default Producto
