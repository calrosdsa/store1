import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Filter from '../../components/Filter'
import Header from '../../components/Header'
import FiltredProducts from '../../components/FilterProducts'
import { addProducts } from '../../slice/basketSlice'

function Products({products,categories}) {
    const dispatch = useDispatch()
    const [showCart, setShowCart] = useState(false)

    useEffect(() => {
        dispatch(addProducts(products))
    }, [products])

    useEffect(() => {
        
    }, [])
    return (
        <>
            <Head>
                <title>All Products | Amazon</title>
            </Head>
            <Header products={products} data={categories} setShowCart={setShowCart} showCart={showCart} />

            <div className="bg-gray-200 p-10 mb-10">
                <div className="max-w-screen-xl mx-auto">
                    <span className="font-medium"><Link href='/'>Home</Link></span> / <span className="text-yellow-500">Products</span>
                </div>
            </div>

            <main className="max-w-screen-2xl mx-auto mt-5">
                <div className="flex flex-col md:flex-row">
                    <div className="md:fixed md:top-25 xl:top-24  lg:top-16 md:w-[260px] lg:w-3/12  xl:3/12 2xl:3/12 w-full mb-3 px-5">
                        <Filter />
                    </div>
                    <div className="md:ml-56 md:w-9/12 xl:ml-[500px]  w-full mb-5 px-5">
                        <FiltredProducts />
                    </div>
                </div>
            </main>
        </>
    )
}

export default Products


export async function getServerSideProps(){
    const res = await fetch("https://djangoapi3.herokuapp.com/api/");
    const products= await res.json();
    const ress=await fetch("https://djangoapi3.herokuapp.com/api/category/")
    const categories=await ress.json();
    
   ;
    return{
      props:{
        products,
        categories,
      }
    }
  }