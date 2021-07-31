import React,{useState} from 'react'
import {useRouter} from 'next/router'
import {useDispatch} from 'react-redux'
import {addToBasket} from '../slice/basketSlice'
import styles from "../styles/Product.module.css"
import Link from 'next/link'
import QuickView from './QuickView'
import { 
  EyeIcon,
} from '@heroicons/react/outline'
import {StarIcon} from '@heroicons/react/solid'
import Currency from 'react-currency-formatter'
import Fade from 'react-reveal/Fade';
import {useToast,Box} from '@chakra-ui/react'

const MAX_RATING=5;
const MIN_RATING=1;

function Prodcuts({slug,id, title,product_image,size,description,discount_price,setShowCart,colors,regular_price,products}) {
    const image=product_image
    const router=useRouter();
    const toast=useToast();
    const dispatch=useDispatch();
    const [rating] = useState(  
      Math.floor(Math.random()*(MAX_RATING - MIN_RATING  +1)) +MIN_RATING
    );
  const [showQuick, setShowQuick] = useState(false)
  const [added, setAdded] = useState(false)
  const addItemToBasket=()=>{
    const product={id, title,image,description,regular_price,quantity:1}
    dispatch(addToBasket(product))
    toast({
        position: "top-right",
        duration:2000,
        render: () => (
          <Box color="White" p={3} bg="blue.500">
              <div className=" bg-green-600 ml-10 md:ml-1 p-3 rounded-lg flex flex-col ">
                  <h2>Added!!</h2>
            {product.title}
            <img className="w-[80px] lg:w-[120px] h-[65px] lg:h-[100px]" src={product.image} alt="" />
              </div>
          </Box>
        ),
      })
}

  
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
                    <div className="mb-1 flex justify-between mx-6 items-center text-lg">
                       <Currency quantity={regular_price} />
                       {discount_price&&
                         <div className={`bg-red-400 ${discount_price&&'bg-red-500 text-white font-extrabold p-1 rounded-lg'}`}>{discount_price}%</div>
                      }
                       
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
             <QuickView setShowQuick={setShowQuick} id={id} key={id} products={products} 
             />}

          </>
    )
}

export default Prodcuts
