import React,{useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import {useDispatch} from 'react-redux'
import {addToBasket} from '../slice/basketSlice'
import {motion,AnimatePresence,AnimateSharedLayout} from 'framer-motion'


function Prodcuts({slug,id, title,image,description,specifications,regular_price}) {
  const price=parseFloat(`${regular_price}`, 10)
  const router=useRouter();
  const [selectedImage,setSelectedImage]=useState(null)
  const dispatch=useDispatch();

  const addItemToBasket=()=>{
    const product={slug,id, title,image,description,specifications,price}
    dispatch(addToBasket(product))
  }

useEffect(()=>{
  setTimeout(()=>setSelectedImage([]),200000);
},[null])
  return (
    <div>

    <AnimateSharedLayout type="crossfade">


        <div className="bg-gray-200 m-1 p-1 rounded-2xl" key={id} onClick={()=>router.push(`../product/${encodeURIComponent(slug)}`)} >
            <h1 className="text-xs mx-1 line-clamp-1">{title}</h1>
            <div className="m-1 w-[110px] sm:w-[135px] lg:w-[170px] 2xl:w-[270px]" >
            <motion.img
            key={id}
          src={image}
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
              
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -300, opacity: 0 }}
          
           className="fixed  top-10 right-1 md:top-16 md:right-5  lg:h-20 lg:w-[200px]">
            <motion.img
              initial={{ y: -300, opacity: 1 }}
              animate={{ y: 0, opacity: 0 }}
              exit={{ y: -300, opacity: 1 }}
            className="w-[70px] object-contain md:w-[150px] 2xl:w-[200px] text-gray-300"   src={selectedImage} 
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
