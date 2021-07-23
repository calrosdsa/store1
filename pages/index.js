import Head from 'next/head'
import Header from '../components/Header'
import ProductsFeed from '../components/ProductsFeed'
import { getSession } from 'next-auth/client';
import { useAuth } from '../auth'
import Link from "next/link"
import Sidebar from '../components/Sidebar';
import Slideshow from '../components/Slideshow';
import ProductsFeed3 from '../components/ProductFeed3';
export default function Home({posts, categories}) {
  const{user}=useAuth();
  
  return (
    <div className="relative">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header data={categories} posts={posts}/>
<img className="min-w-full h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px] mt-[100px]" src="https://c0.wallpaperflare.com/preview/447/552/983/ecommerce-online-shop-euro.jpg" alt="" />

    <ProductsFeed3  posts={posts}/> 
    <h1 className="text-xl font-bold italic ml-2 border-b-4 mt-5 border-gray-400">En Oferta</h1>
    <ProductsFeed  posts={posts}/> 
    <h1 className="text-xl font-bold italic ml-2 border-b-4 mt-5 border-gray-400">Lo mas vendido</h1>
    <ProductsFeed  posts={posts}/> 

    
    <div>

    {`User ID:${user ? user.uid : 'No user signed in'}`}
    <button className="p-3 text-lg bg-gray-400" disabled={!user} ><Link href="/authenticated">
    Go to the authenticate route
    </Link></button>
  </div>
    
    </div>
  )
}

export async function getStaticProps({params}){
  const res = await fetch("https://djangoapi3.herokuapp.com/api/");
  const posts= await res.json();
  const ress=await fetch("https://djangoapi3.herokuapp.com/api/category/")
  const categories=await ress.json();
 ;
  return{
    props:{
      posts,
      categories,
    }
  }
}
