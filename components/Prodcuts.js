import React,{useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import {useDispatch} from 'react-redux'
import {addToBasket} from '../slice/basketSlice'
import {motion,AnimatePresence,AnimateSharedLayout} from 'framer-motion'
import {StarIcon} from '@heroicons/react/solid'

const MAX_RATING=5;
const MIN_RATING=1;

function Prodcuts({slug,id, title,image,description,specifications,regular_price,discount_price}) {
  const price=parseFloat(`${regular_price}`, 10)
  const router=useRouter();
  const [selectedImage,setSelectedImage]=useState(null)
  const dispatch=useDispatch();

  const addItemToBasket=()=>{
    const product={slug,id, title,image,description,specifications,price}
    dispatch(addToBasket(product))
  }
  const [rating] = useState(  
    Math.floor(Math.random()*(MAX_RATING - MIN_RATING  +1)) +MIN_RATING
);
useEffect(()=>{
  setTimeout(()=>setSelectedImage([]),2000);
},[selectedImage])
  return (
    <div className="">

    <AnimateSharedLayout type="crossfade">


        <div className="bg-gray-200 m-1 p-1 " key={id} onClick={()=>router.push(`../product/${encodeURIComponent(slug)}`)} >
            <h1 className="text-xs mx-1 line-clamp-1 md:text-sm font-bold">{title}</h1>
            <div className="m-1  w-[110px] sm:w-[135px] lg:w-[190px] 2xl:w-[300px]" >
            <motion.img
            key={id}
            layoutId={image}
          src={image}
          className=" cursor-pointer sm:shadow-xl  w-[110px] h-[110px] sm:w-[135px] sm:h-[135px] md:w-[150px] md:h-[150px] lg:w-[170px] lg:h-[170px] 2xl:w-[300px] 2xl:h-[300px] object-contain"
          
          />
            <p className="text-xs line-clamp-2 font-semibold">{description}</p>
            <div className="flex">
                {Array(rating)
                .fill()
                .map((_, i) => (
                  <StarIcon height={20} className="text-yellow-500"/>
                  ))
                }
               
            </div>
            <h1 className="font-bold ">${regular_price}</h1>
                {discount_price?
                <div   className="font-bold flex">Descuento <h2 className="bg-red-700 text-gray-200 sm:p-1 sm:ml-4 ml-1 -mt-3 rounded-full">
                  {discount_price}%
                  </h2>
                  </div>
                  :
                  <div></div>
                }
              </div>
        </div>
          <div className="mx-2">
        <button  className="bg-gray-800 text-white p-2 min-w-full rounded-md"  onClick={()=>setSelectedImage(image)}  >
         <h1 onClick={addItemToBasket}>
           Add to Basket
           </h1> 
          {selectedImage &&(
            
        <AnimatePresence>
            <div
              
              layoutId={selectedImage}
              
              className="fixed  top-10 right-1 md:top-16 md:right-0  lg:h-20 lg:w-[200px]">
            <motion.img
              initial={{ y: -300, opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -300, opacity: 1 }}
              className="w-[70px] object-contain md:w-[150px] 2xl:w-[200px] text-gray-300"   src={selectedImage} 
              />
          
            </div>
        </AnimatePresence>
          )}
          </button>
          </div>
          </AnimateSharedLayout>
          </div>
    )
}

export default Prodcuts
