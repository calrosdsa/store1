import React,{useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import {useDispatch} from 'react-redux'
import {addToBasket} from '../slice/basketSlice'
import {motion,AnimatePresence,AnimateSharedLayout} from 'framer-motion'
import Image from 'next/image'

function Prodcuts({slug,id, title,image,description,specifications,regular_price}) {
  const router=useRouter();
  const [selectedImage,setSelectedImage]=useState()
  const dispatch=useDispatch();
  const addItemToBasket=()=>{
    const product={slug,id, title,image,description,specifications,regular_price}
    dispatch(addToBasket(product))
  }
  
useEffect(()=>{
  setTimeout(()=>setSelectedImage([]),2000);
},[selectedImage])
  return (
    <div>

    <AnimateSharedLayout type="crossfade">


        <div className="bg-gray-200 m-1 p-1 rounded-2xl" key={id} onClick={()=>router.push(`../product/${encodeURIComponent(slug)}`)} >
            <h1 className="text-xs mx-1 line-clamp-1">{title}</h1>
            <div className="m-1 w-[110px] sm:w-[135px] lg:w-[170px] 2xl:w-[270px]" >
            <motion.img
            key={id}
          src={image}
          height={270}
          width={270}
          className="cursor-pointer w-[110px] h-[110px] sm:w-[135px] sm:h-[135px] lg:w-[170px] lg:h-[170px] 2xl:w-[270px] 2xl:h-[270px] object-contain"
          
          />
              
            <p className="text-xs line-clamp-2">{description}</p>
            <h1>{regular_price}</h1>
              </div>
        </div>
          
        <button  className="bg-gray-800 text-white p-2 min-w-full space-x-2"  onClick={()=>setSelectedImage(image)}  >
         <h1 onClick={addItemToBasket}>
           Add to Basket
           </h1> 
          {selectedImage &&(

        <AnimatePresence>
            <motion.div
            layoutId={selectedImage}
            animate={{ x: 0, y: 25, opacity: 1 }}
            transition={{
              
              y: { type:"spring", stiffness: 100 },
              duration:2  
              }}
          
           className="fixed top-16 right-5  lg:h-20 lg:w-20">
            <motion.img
            initial={{ opacity: 0,}}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            
            className="w-10 object-contain md:w-14 lg:w-20 2xl:w-28 text-gray-300" layoutId={image}  src={selectedImage} 
          />
          
            </motion.div>
        </AnimatePresence>
          )}
          </button>
          </AnimateSharedLayout>
          </div>
    )
}

export default Prodcuts
