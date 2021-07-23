import Head from 'next/head'
import Header from '../components/Header'
import ProductsFeed from '../components/ProductsFeed'
import { getSession } from 'next-auth/client';
import { useAuth } from '../auth'
import Link from "next/link"
import Sidebar from '../components/Sidebar';
export default function Home({posts, categories}) {
  const{user}=useAuth();
  
  return (
    <div className="relative">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header data={categories} posts={posts}/>

      <Sidebar/>

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
export async function getServerSideProps(context){
  const res = await fetch("https://djangoapi3.herokuapp.com/api/");
  const posts= await res.json();
  const session=await getSession(context)
  const ress=await fetch("https://djangoapi3.herokuapp.com/api/category/")
  const categories=await ress.json();
  
  return{
    props:{
      posts,
      categories,
      session,
    }
  }
}
