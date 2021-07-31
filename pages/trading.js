import { useRouter } from "next/router";
import ProductsFeed from "../components/ProductsFeed";
import Header from "../components/Header"
import ProductsFeed3 from "../components/ProductFeed3";
import Footer from "../components/Footer";
export default function Trading({categories,products}){
    
const router=useRouter();
if(router.isFallback){
    return <div></div>
}
    return(
        <div className=" relative">
            <Header data={categories}/> 
            <ProductsFeed3 products={products}/>
            <Footer/>
        </div>
    )
}

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