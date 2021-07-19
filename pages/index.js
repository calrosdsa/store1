import Head from 'next/head'
import Header from '../components/Header'
import ProductsFeed from '../components/ProductsFeed'
import { getSession } from 'next-auth/client';

export default function Home({posts, categories}) {
  return (
    <div className="relative">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header data={categories} posts={posts}/>
    <ProductsFeed posts={posts}/>  
      
    
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
