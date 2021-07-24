import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ProductsFeed4 from '../components/ProductsFeed4'

function ofertas({categories,posts}) {
    return (
        <div>
            <Header data={categories}/>
            <ProductsFeed4 posts={posts}/>  
            <Footer/>
        </div>
    )
}

export default ofertas
export async function getStaticProps(){
    const res= await fetch(`https://djangoapi3.herokuapp.com/api/`)
    const posts= await res.json();
    const ress=await fetch(`https://djangoapi3.herokuapp.com/api/category/`)
  const categories=await ress.json();
    return{
        props:{
            posts,
            categories,
        }
    }
}