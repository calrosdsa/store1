import Head from 'next/head'
import Header from '../components/Header'
import ProductsFeed from '../components/ProductsFeed'
import { getSession } from 'next-auth/client';
import { useAuth } from '../auth'
import Link from "next/link"
import {addProducts} from '../slice/basketSlice'
import { useDispatch } from "react-redux";
import ProductsFeed3 from '../components/ProductFeed3';
import Footer from '../components/Footer';
import { useState,useEffect } from 'react';
export default function Home({products, categories}) {
  const{user}=useAuth();
  const dispatch=useDispatch();
  const [showCart,setShowCart]=useState(false);
  useEffect(()=>{
  dispatch(addProducts(products))
  },[products])
  return (
    <div className=" ">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header  data={categories} products={products} setShowCart={setShowCart} showCart={showCart}/>
<img className="min-w-full h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px] mt-[100px]" src="https://c0.wallpaperflare.com/preview/447/552/983/ecommerce-online-shop-euro.jpg" alt="" />

    <ProductsFeed3  products={products} setShowCart={setShowCart}/> 
    <h1 className="text-xl font-bold italic ml-2 border-b-4 mt-5 border-gray-400">En Oferta</h1>
    
    <div>

    {`User ID:${user ? user.uid : 'No user signed in'}`}
    <button className="p-3 text-lg bg-gray-400" disabled={!user} ><Link href="/authenticated">
    Go to the authenticate route
    </Link></button>
    <Footer/> 
  </div>
    
    </div>
  )
}

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
