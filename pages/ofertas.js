import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ProductsFeed4 from '../components/ProductsFeed4'

function ofertas({categories,products}) {
    return (
        <div>
            <Header data={categories}/>
            <ProductsFeed4 products={products}/>  
            <Footer/>
        </div>
    )
}

export default ofertas
export async function getStaticProps(){
    const res= await fetch(`https://djangoapi3.herokuapp.com/api/`)
    const products= await res.json();
    const ress=await fetch(`https://djangoapi3.herokuapp.com/api/category/`)
  const categories=await ress.json();
    return{
        props:{
            products,
            categories,
        }
    }
}