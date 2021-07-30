import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import styles from "../styles/Product.module.css"
import {addToBasket} from "../slice/basketSlice"
import {useRouter} from 'next/router'
import Currency from 'react-currency-formatter'
import { StarIcon } from '@heroicons/react/solid'
import Image from "next/image"
import {useToast,Box} from '@chakra-ui/react'
import QuantityCount from "../utils/QuantityCount"
const MAX_RATING=5;
const MIN_RATING=1;
const MAX_RATE=376;
const MIN_RATE=43;
function Producto({title,id,description,regular_price,size,category_name,slug,colors,stock,product_image}) {
    const router=useRouter();
    const toast =useToast();
    const [showCart, setShowCart] = useState(false)
    const [activeImage, setActiveImage] = useState(product_image[0].product_image)
    const dispatch=useDispatch();
    const [quantity, setQuantity] = useState(1)
    const [added, setAdded] = useState(false)
    const image=product_image[0].product_image
    const addItemToBasket = () => {
        const product={title,description,image,id,regular_price,slug,quantity}
        dispatch(addToBasket(product))
        setShowCart(true)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
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
    const [rating] = useState(  
        Math.floor(Math.random()*(MAX_RATING - MIN_RATING  +1)) +MIN_RATING
        );
    const [reviews]=useState(
        Math.floor(Math.random(MAX_RATE-MIN_RATE  +10))+MIN_RATE
    )
        return (
            <div key={id}>

            <div className="md:flex relative mt-16 mb-32 xl:px-64">
                <h1 className="text-xl absolute -top-10 left-1/4 inset-x-0 mx-auto font-bold ">{title}</h1>
      <div className="px-5 mb-7 w-full md:w-6/12 ">
                        <div className="w-full mb-4 hover:filter hover:brightness-75">
                            <Image className={"w-full rounded-lg " + styles.product_image} width={500} height={350} objectFit="contain" src={activeImage} alt="" />
                        </div>
                        <div className="flex items-center">
                            {product_image && product_image.map(image => (
                                <div className="mr-3 mb-3 cursor-pointer" key={image.id} onClick={() => setActiveImage(image.product_image)}>
                                    <Image className="rounded-md" width={100} height={100} objectFit="contain" src={image.product_image} alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:w-6/12 my-1 xl:text-lg lg:flex-row sm:flex md:flex-col">
                        <div className="px-4">

                        <h1 className="font-bold text-xl underline my-1">{category_name}</h1>
                        <b>Price:</b> <Currency quantity={regular_price}/>
                        <div className="my-1">
                            <b>Size:</b> {size&&size.map(talla=>talla).join('-')}
                        </div>
            <p className="flex items-center">
                            <b className="mr-1"> Rating:</b>
                                {" "}{rating}<StarIcon className="h-5 text-yellow-500" />
                            <span> ({reviews})</span>
                        </p>
            <div className="flex my-5 ">
                {colors&&colors.map(color=>(
                    <div className="flex h-9 w-9 border-4 rounded-full " style={{background:color}}></div>
                    ))}
                    </div>
            </div>
            <div className=" ">
                       <b className="md:ml-12 ml-4 xl:ml-20 xl:text-lg underline">Product Description</b>
                <p className="text-xs lg:text-sm  lg:px-8 xl:text-lg xl:px-20 px-4 mt-2 font-semibold">{description}</p>
            </div>
                    </div>
    <div className="flex absolute space-x-6 right-1 -bottom-12 sm:right-1/4  lg:bottom-36 xl:right-1/4  md:right-24 ">
    <button  className="bg-gray-900 xl:w-[250px] xl:p-3 xl:text-xl w-[150px] ml-3 text-gray-200 col-start-2   min-w-[30px]  md:font-bold rounded-lg"
    onClick={addItemToBasket}>
        {added ? 'Added' : 'Add to Busket'}
        </button>
    <QuantityCount setQuantity={setQuantity} quantity={quantity} /> 
    </div>
        </div>
                <div className="flex" >
<div onClick={()=>router.push(`../product/${encodeURIComponent(slug)}`)} className="">
         
       </div>
</div>
    </div>
    )
}

export default Producto
