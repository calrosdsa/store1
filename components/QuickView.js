import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addToBasket } from "../slice/basketSlice"
import styles from "../styles/Product.module.css"
import { StarIcon } from "@heroicons/react/solid"
import Currency from 'react-currency-formatter';
import Image from 'next/image'
import QuantityCount from "../utils/QuantityCount"
import { useRouter } from 'next/router';

function QuickView({setShowQuick, id, products}) {
    const [product, setProduct] = useState({})
    const dispatch = useDispatch()
    const router = useRouter()
    const MAX_RATING = 5
    const MIN_RATING = 1
    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    )
    const addItemToBasket = () => {
        dispatch(addToBasket({...product, title: product.title, quantity}))
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }
    useEffect(() => {
        const found = products.filter(product => product.id == id)[0]
        setProduct(found)       
        console.log(found)
    }, [id])
//{ name, price, images, description, colors, company, stock, reviews, category, shipping }
    return (
        <>
      <div key={product?.id} className={"fixed sm:-mt-10  lg:w-[700px] xl:w-[1000px] 2xl:w-[1400px] w-full lg:inset-x-0 lg:mx-auto h-screen sm:h-auto top-0 left-0 flex justify-center items-start overflow-y-scroll " + styles.quickView} style={{ zIndex: '1200'}}>
            <div className={`relative sm:mx-16 md:mx-1 max-w-screen-xl my-40 mb-20 rounded-lg ${styles.quickView_wrapper}`} style={{ zIndex: '200'}}>
                <div className="flex  flex-wrap md:grid-rows-2  mt-5">
                        <div className="px-5  sm:px-5  2xl:px-10 xl:px-7 mb-2 w-full md:w-7/12">
                            <div className=" justify-center  mb-4 overflow-hidden rounded-lg h-auto">
                            <div className="grid grid-cols-2  items-center  ">
                            {product?.product_image && product?.product_image.map(image => (
                                <div className="  mb-3  cursor-pointer" key={image.id}>
                                    <Image  className="rounded-md" width={200} height={200}  objectFit="contain" src={image.product_image} alt="" />
                                </div>
                            ))}
                        </div>
                            </div>
                            <p className="text-gray-600 text-xs sm:text-sm md:text-base  mb-5">{product?.description}</p>
                        </div>
                        <div className="px-5 md:px-2  mb-5 w-full  md:w-5/12">
                            <p className="font-serif text-sm lg:text-xl font-bold text-black">{product?.title}</p>
                            <h1 className="my-2 text-5xl text-yellow-500 mb-7">{product?.name}</h1>
                            <p className="flex items-center">
                                <b className="mr-1">Rating:</b>
                                    {" "}
                                    {Array(rating).fill().map((_, index) => (
                                        <StarIcon key={index} className="h-5 text-yellow-500" />
                                        ))}
                                <span> (30)</span>
                            </p>
                            <p><b>Stock:</b> Available in stock</p>
                            
                            <div className="flex items-center my-4 cursor-pointer">
                                {product?.colors && product?.colors.map(color => (
                                    <div key={Math.random()} className={`w-7 h-7 border-gray-200 border-4 rounded-full mx-1`} style={{ background: color }}/>
                                    ))}
                            </div>
                                <div className="grid grid-rows-1 md:block lg:grid lg:grid-rows-1">
                            <p className="text-yellow-500 text-2xl mb-7 row-start-1">
                                <Currency
                                    quantity={product?.regular_price}
                                    />
                            </p>
                          
                            </div>
                            <button onClick={() => router.push('../product/' + product?.slug)} className="w-full p-1 xl:p-2 rounded-md  bg-gray-800 text-gray-300 button mt-4">View details</button>
                        </div>
                    </div>
                </div>
            <div onClick={() => setShowQuick(false)} className="w-full h-screen bg-gray-900 bg-opacity-10 fixed top-0 right-0 cursor-pointer" style={{ zIndex: '100'}}/>
        </div>
        </>
    )
}

export default QuickView
