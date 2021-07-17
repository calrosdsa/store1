import Head from 'next/head'
import Header from '../components/Header'
import ProductsFeed from '../components/ProductsFeed'

export default function Home({posts,categories}) {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Header data={categories}/>
    <ProductsFeed posts={posts}/>      
    </div>
  )
}
export async function getStaticProps(){
  const res = await fetch("https://djangoapi3.herokuapp.com/api/");
  const posts= await res.json();
  const ress=await fetch("https://djangoapi3.herokuapp.com/api/category/")
  const categories=await ress.json();
  return{
    props:{
      posts,
      categories
    }
  }
}
