import React,{useState} from 'react'
import {useRouter} from 'next/router'
import {useDispatch} from 'react-redux'
import {addToBasket} from '../slice/basketSlice'
import styles from "../styles/Product.module.css"
import Image from 'next/image'
import Link from 'next/link'
import QuickView from './QuickView'
import { 
  EyeIcon,
} from '@heroicons/react/outline'
import {StarIcon} from '@heroicons/react/solid'
import Currency from 'react-currency-formatter'
import Fade from 'react-reveal/Fade';
const MAX_RATING=5;
const MIN_RATING=1;

function Prodcuts({slug,id, title,product_image,size,description,setShowCart,colors,regular_price,products}) {
  const price=parseFloat(`${regular_price}`, 10)
  const image=product_image
  const router=useRouter();
  const dispatch=useDispatch();
  const [showQuick, setShowQuick] = useState(false)
  const [added, setAdded] = useState(false)
  const addItemToBasket=()=>{
    const product={id, title,image,description,price,quantity:0.5}
    dispatch(addToBasket(product))
    dispatch(addToBasket(product))
            setShowCart(true)
            setAdded(true)
            setTimeout(() => setAdded(false), 2000)
        }
  
  const [rating] = useState(  
    Math.floor(Math.random()*(MAX_RATING - MIN_RATING  +1)) +MIN_RATING
);




  return (
    <>

    <Fade  bottom>
    <>



    <div  className={"relative flex flex-col m-1 sm:m-2 z-40 bg-gray-100 p-1 sm:p-3 md:p-5 lg:p-7 rounded-xl " + styles.loop_product}>
                    <div className={`relative hover:filter  hover:brightness-75 mx-auto  w-11/12 h-10/12   ${styles.product_image_wrapper}`}>
                        <img className={"cursor-pointer object-contain rounded-2xl  h-[130px] sm:h-[150px] md:h-[200px]  overflow-hidden  " + styles.loop_product_image} 
                        loading="lazy" 
        src={product_image}  />
                        <div onClick={() => setShowQuick(true)} className={ `rounded-lg cursor-pointer ${styles.product_image_overly}`}>
                            <div className={`bg-gray-900 text-white rounded-lg ${styles.product_image_overly_button}`}>
                                <span>Quick View</span>
                                <EyeIcon className="h-6" />
                            </div>
                        </div>
                    </div>
                    <Link href={`../product/${slug}`}>
                        <h4 title={title} className="cursor-pointer my-3 font-bold">{title}</h4>
                    </Link>
                    
                    <div className="flex">
                        {Array(rating).fill().map((_, index) => (
                            <StarIcon key={index} className="h-5 text-yellow-500" />
                        ))}
                    </div>
                    <p className="text-xs my-2 line-clamp-2">{description}</p>
                    <div className="mb-1">
                       <h1>{regular_price}</h1>
                    </div>
                    <div>{size && size.map(talla=>talla).join(' ,')}
                </div>
                    <div className="flex items-center my-4">
                        {colors && colors.map(color => (
                            <div key={Math.random()} className={`w-7 h-7 border-gray-200 border-4 rounded-full mx-1`} style={{ background: color }}/>
                        ))}
                    </div>
                    <button title="Add to cart " onClick={addItemToBasket} className="mt-auto bg-gray-900 text-gray-300 p-1 sm:p-2 rounded-lg">{added ? 'Added' : 'Add to Basket'}</button>
                </div>
          </>
          </Fade>
        {showQuick && 
             <QuickView setShowQuick={setShowQuick} id={id} products={products} 
             />}

          </>
    )
}

export default Prodcuts
