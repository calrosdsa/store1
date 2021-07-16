import Head from 'next/head'
import Header from '../components/Header'
import ProductsFeed from '../components/ProductsFeed'

export default function Home({posts}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Header/>
    <ProductsFeed posts={posts}/>      
    </div>
  )
}
export async function getStaticProps(){
  const res = await fetch("https://djangoapi3.herokuapp.com/api/");
  const posts= await res.json();
  return{
    props:{
      posts
    }
  }
}